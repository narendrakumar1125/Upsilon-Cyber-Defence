'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FileText, UploadCloud, Download, Trash, File, RefreshCw } from 'lucide-react';
import AdminSidebarClient from '@/components/admin/AdminSidebarClient';
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy, where, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export default function ResourcesManagementPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [filter, setFilter] = useState('all');
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: string]: { progress: number, name: string } }>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchResources = useCallback(async () => {
    try {
      setIsLoading(true);
      let resourcesQuery;
      
      if (filter === 'all') {
        resourcesQuery = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
      } else {
        resourcesQuery = query(
          collection(db, 'resources'), 
          where('entityType', '==', filter),
          orderBy('createdAt', 'desc')
        );
      }
      
      const snapshot = await getDocs(resourcesQuery);
      const resourcesData = snapshot.docs.map(doc => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          name: data.name || '',
          type: data.type || '',
          url: data.url || '',
          entityId: data.entityId || '',
          entityType: data.entityType || '',
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null
        };
      });
      
      setResources(resourcesData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    // Wait for loading to complete and then check auth
    if (!loading && isClient) {
      if (!user || !isAdmin) {
        router.push('/login?callbackUrl=/client-admin/resources');
      } else {
        // Fetch resources
        fetchResources();
      }
    }
  }, [user, isAdmin, loading, router, isClient, fetchResources]);

  const handleDeleteResource = async (resource: any) => {
    if (window.confirm('Are you sure you want to delete this resource? This action cannot be undone.')) {
      try {
        // First delete from Storage if there's a URL
        if (resource.url) {
          try {
            // Extract the storage path from the URL
            const url = new URL(resource.url);
            const storagePath = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
            const storageRef = ref(storage, storagePath);
            await deleteObject(storageRef);
          } catch (error) {
            console.error('Error deleting file from storage:', error);
            // Continue even if storage deletion fails
          }
        }
        
        // Then delete from Firestore
        await deleteDoc(doc(db, 'resources', resource.id));
        
        // Refresh the list
        fetchResources();
      } catch (error) {
        console.error('Error deleting resource:', error);
        alert('Failed to delete resource. Please try again.');
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, entityType: 'course' | 'service') => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      
      // Process each file
      for (const file of files) {
        const fileId = uuidv4();
        
        // Add to uploading state
        setUploadingFiles(prev => ({
          ...prev,
          [fileId]: {
            progress: 0,
            name: file.name
          }
        }));
        
        try {
          // Upload to Storage
          const storageRef = ref(storage, `resources/${entityType}/${fileId}_${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          
          // Monitor upload progress
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setUploadingFiles(prev => ({
                ...prev,
                [fileId]: {
                  ...prev[fileId],
                  progress
                }
              }));
            },
            (error) => {
              console.error('Upload error:', error);
              setUploadingFiles(prev => {
                const newState = { ...prev };
                delete newState[fileId];
                return newState;
              });
            },
            async () => {
              // Upload completed
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              
              // Save metadata to Firestore
              const resourceData = {
                name: file.name,
                type: file.type,
                url: downloadURL,
                entityId: 'general', // This is a general resource not tied to a specific entity
                entityType,
                createdAt: new Date(),
                updatedAt: new Date()
              };
              
              await addDoc(collection(db, 'resources'), resourceData);
              
              // Remove from uploading state
              setUploadingFiles(prev => {
                const newState = { ...prev };
                delete newState[fileId];
                return newState;
              });
              
              // Refresh the resources list
              fetchResources();
            }
          );
        } catch (error) {
          console.error('Error handling file upload:', error);
          
          // Remove from uploading state
          setUploadingFiles(prev => {
            const newState = { ...prev };
            delete newState[fileId];
            return newState;
          });
        }
      }
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('presentation') || type.includes('powerpoint')) return '📑';
    if (type.includes('image')) return '🖼️';
    if (type.includes('zip') || type.includes('compressed')) return '🗜️';
    return '📁';
  };

  // Show loading state while checking auth
  if (loading || !isClient || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-xl text-light">
          {loading || !isClient ? "Loading..." : "You need admin access"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="flex min-h-screen">
        <AdminSidebarClient />

        <main className="flex-1 p-6 overflow-y-auto ml-0 md:ml-64">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-light">Resources</h1>
            <button 
              onClick={fetchResources}
              className="flex items-center gap-1 text-primary hover:text-primary/80"
              title="Refresh resources"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>
          
          <div className="bg-dark-200 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-light mb-4">Upload Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-light mb-3">Course Resources</h3>
                <div className="border-2 border-dashed border-dark-400 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-dark-300/30 transition-colors">
                  <input
                    type="file"
                    id="course-files"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'course')}
                    className="hidden"
                  />
                  <label htmlFor="course-files" className="cursor-pointer">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-300">
                      Click to upload course files
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOCX, PPTX, ZIP, JPG, PNG
                    </p>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-light mb-3">Service Resources</h3>
                <div className="border-2 border-dashed border-dark-400 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-dark-300/30 transition-colors">
                  <input
                    type="file"
                    id="service-files"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'service')}
                    className="hidden"
                  />
                  <label htmlFor="service-files" className="cursor-pointer">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-300">
                      Click to upload service files
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOCX, PPTX, ZIP, JPG, PNG
                    </p>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Upload progress */}
            {Object.keys(uploadingFiles).length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-light mb-3">Upload Progress</h3>
                <div className="space-y-3">
                  {Object.entries(uploadingFiles).map(([id, { name, progress }]) => (
                    <div key={id}>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 truncate max-w-md">{name}</span>
                        <span className="text-gray-300">{progress}%</span>
                      </div>
                      <div className="w-full bg-dark-400 rounded-full h-2 mt-1">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-light">All Resources</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === 'all' 
                    ? 'bg-primary text-dark font-medium' 
                    : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('course')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === 'course' 
                    ? 'bg-primary text-dark font-medium' 
                    : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                }`}
              >
                Course Files
              </button>
              <button
                onClick={() => setFilter('service')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === 'service' 
                    ? 'bg-primary text-dark font-medium' 
                    : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                }`}
              >
                Service Files
              </button>
            </div>
          </div>
          
          <div className="bg-dark-200 p-6 rounded-lg shadow-md">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-gray-300">Loading resources...</p>
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-300">
                  No resources found. Upload some resources using the upload section above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.map((resource) => (
                  <div 
                    key={resource.id} 
                    className="bg-dark-300 p-4 rounded-lg hover:bg-dark-400 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{getFileIcon(resource.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-light font-medium truncate">{resource.name}</p>
                          <p className="text-xs text-gray-400 truncate mt-1">
                            {resource.entityType === 'course' ? 'Course Resource' : 'Service Resource'}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(resource.createdAt?.seconds * 1000).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex ml-2">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-blue-400 hover:text-blue-300"
                          title="Download"
                        >
                          <Download size={16} />
                        </a>
                        <button
                          onClick={() => handleDeleteResource(resource)}
                          className="p-1 text-red-400 hover:text-red-300 ml-1"
                          title="Delete"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}