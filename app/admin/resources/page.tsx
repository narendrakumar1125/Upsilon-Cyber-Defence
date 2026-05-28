'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FileText, Download, Trash, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface Resource {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  entityId: string;
  entityType: 'course' | 'service';
  entityName?: string;
  createdAt?: any;
}

export default function ResourcesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchResources = async () => {
      if (authLoading) return;
      
      if (!user) {
        router.push('/login?callbackUrl=/admin/resources');
        return;
      }
      
      try {
        const resourcesQuery = query(
          collection(db, 'resources'), 
          orderBy('createdAt', 'desc')
        );
        
        const resourcesSnapshot = await getDocs(resourcesQuery);
        const resourcesData = await Promise.all(
          resourcesSnapshot.docs.map(async (docSnapshot) => {
            const data = docSnapshot.data();
            let entityName = '';

            // Get related entity name
            if (data.entityType === 'course' && data.entityId) {
              try {
                const courseRef = doc(db, 'courses', data.entityId);
                const courseSnap = await getDoc(courseRef);
                if (courseSnap.exists()) {
                  entityName = courseSnap.data()?.title || '';
                }
              } catch (error) {
                console.error('Error fetching course:', error);
              }
            } else if (data.entityType === 'service' && data.entityId) {
              try {
                const serviceRef = doc(db, 'services', data.entityId);
                const serviceSnap = await getDoc(serviceRef);
                if (serviceSnap.exists()) {
                  entityName = serviceSnap.data()?.title || '';
                }
              } catch (error) {
                console.error('Error fetching service:', error);
              }
            }

            return {
              id: docSnapshot.id,
              ...data,
              entityName,
            } as Resource;
          })
        );
        
        setResources(resourcesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError('Failed to load resources');
        setLoading(false);
      }
    };
    
    fetchResources();
  }, [user, authLoading, router]);
  
  // Group resources by entity type
  const courseResources = resources.filter((resource) => resource.entityType === 'course');
  const serviceResources = resources.filter((resource) => resource.entityType === 'service');
  
  const handleDeleteResource = async (resourceId: string) => {
    if (!user) return;
    
    try {
      await deleteDoc(doc(db, 'resources', resourceId));
      
      // Update local state
      setResources(resources.filter(resource => resource.id !== resourceId));
    } catch (error) {
      console.error('Error deleting resource:', error);
      alert('Failed to delete resource');
    }
  };
  
  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-light">Loading...</div>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-light mb-6">Resources</h1>
      
      {error && (
        <div className="bg-red-500/20 text-red-400 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {/* Course Resources */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-light mb-4">Course Resources</h2>
        
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-200">
                  <th className="text-left py-3 px-4 text-light">Name</th>
                  <th className="text-left py-3 px-4 text-light">Type</th>
                  <th className="text-left py-3 px-4 text-light">Course</th>
                  <th className="text-left py-3 px-4 text-light">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courseResources.length > 0 ? (
                  courseResources.map((resource) => (
                    <tr key={resource.id} className="border-t border-dark-300 hover:bg-dark-200/50">
                      <td className="py-3 px-4 text-light">{resource.name}</td>
                      <td className="py-3 px-4 text-gray-300">{resource.type}</td>
                      <td className="py-3 px-4 text-gray-300">
                        {resource.entityName || '-'}
                      </td>
                      <td className="py-3 px-4 flex space-x-2">
                        <a 
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 bg-dark-200 text-blue-400 rounded hover:bg-dark-300"
                          title="View file"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <button
                          onClick={() => handleDeleteResource(resource.id)}
                          className="p-1 bg-dark-200 text-red-400 rounded hover:bg-dark-300"
                          title="Delete resource"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 px-4 text-center text-gray-400">
                      No course resources found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Service Resources */}
      <div>
        <h2 className="text-xl font-bold text-light mb-4">Service Resources</h2>
        
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-200">
                  <th className="text-left py-3 px-4 text-light">Name</th>
                  <th className="text-left py-3 px-4 text-light">Type</th>
                  <th className="text-left py-3 px-4 text-light">Service</th>
                  <th className="text-left py-3 px-4 text-light">Actions</th>
                </tr>
              </thead>
              <tbody>
                {serviceResources.length > 0 ? (
                  serviceResources.map((resource) => (
                    <tr key={resource.id} className="border-t border-dark-300 hover:bg-dark-200/50">
                      <td className="py-3 px-4 text-light">{resource.name}</td>
                      <td className="py-3 px-4 text-gray-300">{resource.type}</td>
                      <td className="py-3 px-4 text-gray-300">
                        {resource.entityName || '-'}
                      </td>
                      <td className="py-3 px-4 flex space-x-2">
                        <a 
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 bg-dark-200 text-blue-400 rounded hover:bg-dark-300"
                          title="View file"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <button
                          onClick={() => handleDeleteResource(resource.id)}
                          className="p-1 bg-dark-200 text-red-400 rounded hover:bg-dark-300"
                          title="Delete resource"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 px-4 text-center text-gray-400">
                      No service resources found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}