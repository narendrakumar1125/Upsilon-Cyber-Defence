'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { ChevronLeft, X, Plus } from 'lucide-react';
import AdminSidebarClient from '@/components/admin/AdminSidebarClient';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, updateDoc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import FileUpload from '@/components/admin/FileUpload';

export default function ServiceForm({ id }: { id: string }) {
  const serviceId = id;
  const isNewService = serviceId === 'new';
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    overview: '',
    benefits: [] as string[],
    features: [] as { title: string; description: string }[],
    process: [] as { step: string; description: string }[],
    caseStudyTitle: '',
    caseStudyDescription: '',
    imageUrl: ''
  });
  
  // Dynamic form handling
  const [benefit, setBenefit] = useState('');
  const [newFeature, setNewFeature] = useState({ title: '', description: '' });
  const [newProcess, setNewProcess] = useState({ step: '', description: '' });
  
  // Files state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Authentication check
  const fetchService = useCallback(async () => {
    try {
      const serviceDoc = doc(db, 'services', serviceId);
      const serviceSnap = await getDoc(serviceDoc);

      if (serviceSnap.exists()) {
        const data = serviceSnap.data();
        setFormData({
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          overview: data.overview || '',
          benefits: data.benefits || [],
          features: data.features || [],
          process: data.process || [],
          caseStudyTitle: data.caseStudyTitle || '',
          caseStudyDescription: data.caseStudyDescription || '',
          imageUrl: data.imageUrl || ''
        });
      } else {
        alert('Service not found!');
        router.push('/client-admin/services');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching service:', error);
      setIsLoading(false);
    }
  }, [serviceId, router]);

  useEffect(() => {
    if (!loading && isClient) {
      if (!user || !isAdmin) {
        router.push('/login?callbackUrl=/client-admin/services');
      } else if (!isNewService) {
        fetchService();
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isAdmin, loading, router, isClient, isNewService, fetchService]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Handle benefits
  const addBenefit = () => {
    if (benefit && !formData.benefits.includes(benefit)) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, benefit]
      });
      setBenefit('');
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter(b => b !== benefitToRemove)
    });
  };

  // Handle features
  const addFeature = () => {
    if (newFeature.title && newFeature.description) {
      setFormData({
        ...formData,
        features: [...formData.features, { ...newFeature }]
      });
      setNewFeature({ title: '', description: '' });
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  // Handle process steps
  const addProcessStep = () => {
    if (newProcess.step && newProcess.description) {
      setFormData({
        ...formData,
        process: [...formData.process, { ...newProcess }]
      });
      setNewProcess({ step: '', description: '' });
    }
  };

  const removeProcessStep = (index: number) => {
    setFormData({
      ...formData,
      process: formData.process.filter((_, i) => i !== index)
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      alert('Please fill in all required fields: title, description, and category');
      return;
    }

    setIsSaving(true);
    try {
      // Upload image if selected
      let imageUrl = formData.imageUrl;
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      // Create or update service document
      const serviceData = {
        ...formData,
        imageUrl,
        authorId: user!.uid,
        updatedAt: serverTimestamp()
      };

      if (isNewService) {
        // Add createdAt for new services
        const newServiceRef = doc(collection(db, 'services'));
        await setDoc(newServiceRef, {
          ...serviceData,
          createdAt: serverTimestamp()
        });
      } else {
        // Update existing service
        const serviceRef = doc(db, 'services', serviceId);
        await updateDoc(serviceRef, serviceData);
      }

      // Redirect to services list
      router.push('/client-admin/services');
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error saving service. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `services/${uuidv4()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  // Show loading state while checking auth or fetching data
  if (loading || !isClient || !user || !isAdmin || isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-xl text-light">
          {loading || !isClient ? "Loading..." : isLoading ? "Loading service..." : "You need admin access"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="flex min-h-screen">
        <AdminSidebarClient />

        <main className="flex-1 p-6 overflow-y-auto ml-0 md:ml-64">
          <div className="mb-6">
            <Link 
              href="/client-admin/services"
              className="flex items-center text-gray-400 hover:text-light transition-colors"
            >
              <ChevronLeft size={16} />
              <span>Back to Services</span>
            </Link>
          </div>
          
          <div className="bg-dark-200 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-light mb-6">
              {isNewService ? 'Add New Service' : 'Edit Service'}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-light font-medium mb-2">
                    Service Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                    placeholder="Enter service title"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-light font-medium mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="consulting">Consulting</option>
                    <option value="managed-services">Managed Services</option>
                    <option value="security">Security Services</option>
                    <option value="integration">Integration Services</option>
                    <option value="training">Training</option>
                    <option value="implementation">Implementation</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-light font-medium mb-2">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                  placeholder="Enter a short description (1-2 sentences)"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="overview" className="block text-light font-medium mb-2">
                  Overview
                </label>
                <textarea
                  id="overview"
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                  placeholder="Enter a detailed overview of the service"
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-light font-medium mb-2">
                  Service Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageUpload}
                  className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                  accept="image/*"
                />
                {selectedImage && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">Selected: {selectedImage.name}</p>
                    {uploadProgress > 0 && (
                      <div className="w-full bg-dark-400 rounded-full h-2 mt-1">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                )}
                {formData.imageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-300 mb-1">Current image:</p>
                    <img 
                      src={formData.imageUrl} 
                      alt={formData.title} 
                      className="h-20 object-cover rounded" 
                    />
                  </div>
                )}
              </div>
              
              {/* Benefits Section */}
              <div>
                <h3 className="text-lg font-medium text-light mb-3">Benefits</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.benefits.map((benefit, index) => (
                    <span 
                      key={index} 
                      className="bg-primary/20 text-primary text-sm rounded-full px-3 py-1 flex items-center"
                    >
                      {benefit}
                      <button
                        type="button"
                        onClick={() => removeBenefit(benefit)}
                        className="ml-2 text-primary hover:text-light"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => setBenefit(e.target.value)}
                    placeholder="Add a benefit"
                    className="flex-1 bg-dark-300 border border-dark-400 rounded-l-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addBenefit();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="bg-primary/20 hover:bg-primary/30 text-primary px-4 rounded-r-md transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {/* Features Section */}
              <div>
                <h3 className="text-lg font-medium text-light mb-3">Features</h3>
                <div className="space-y-3 mb-4">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="bg-dark-300 p-3 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-primary">{feature.title}</h4>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{feature.description}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                  <input
                    type="text"
                    value={newFeature.title}
                    onChange={(e) => setNewFeature({...newFeature, title: e.target.value})}
                    placeholder="Feature title"
                    className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    value={newFeature.description}
                    onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                    placeholder="Feature description"
                    className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                  />
                </div>
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center gap-1 text-primary hover:text-primary/80"
                >
                  <Plus size={16} />
                  <span>Add Feature</span>
                </button>
              </div>
              
              {/* Process Steps Section */}
              <div>
                <h3 className="text-lg font-medium text-light mb-3">Process Steps</h3>
                <div className="space-y-3 mb-4">
                  {formData.process.map((step, index) => (
                    <div key={index} className="bg-dark-300 p-3 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-primary">{step.step}</h4>
                        <button
                          type="button"
                          onClick={() => removeProcessStep(index)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{step.description}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                  <input
                    type="text"
                    value={newProcess.step}
                    onChange={(e) => setNewProcess({...newProcess, step: e.target.value})}
                    placeholder="Step name"
                    className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    value={newProcess.description}
                    onChange={(e) => setNewProcess({...newProcess, description: e.target.value})}
                    placeholder="Step description"
                    className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                  />
                </div>
                <button
                  type="button"
                  onClick={addProcessStep}
                  className="flex items-center gap-1 text-primary hover:text-primary/80"
                >
                  <Plus size={16} />
                  <span>Add Step</span>
                </button>
              </div>
              
              {/* Case Study Section */}
              <div>
                <h3 className="text-lg font-medium text-light mb-3">Case Study (Optional)</h3>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="caseStudyTitle" className="block text-light font-medium mb-2">
                      Case Study Title
                    </label>
                    <input
                      type="text"
                      id="caseStudyTitle"
                      name="caseStudyTitle"
                      value={formData.caseStudyTitle}
                      onChange={handleChange}
                      className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                      placeholder="Enter case study title"
                    />
                  </div>
                  <div>
                    <label htmlFor="caseStudyDescription" className="block text-light font-medium mb-2">
                      Case Study Description
                    </label>
                    <textarea
                      id="caseStudyDescription"
                      name="caseStudyDescription"
                      value={formData.caseStudyDescription}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                      placeholder="Describe the case study"
                    />
                  </div>
                </div>
              </div>
              
              {!isNewService && (
                <div className="pt-6 border-t border-dark-300">
                  <h2 className="text-xl font-bold text-light mb-4">Service Resources</h2>
                  <FileUpload
                    entityId={serviceId}
                    entityType="service"
                    onUploadComplete={(url, name) => {
                      console.log('Uploaded resource:', name, url);
                    }}
                  />
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <Link
                  href="/client-admin/services"
                  className="bg-dark-300 text-light hover:bg-dark-400 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-2 px-4 rounded-md transition-all disabled:opacity-70"
                >
                  {isSaving ? 'Saving...' : isNewService ? 'Create Service' : 'Update Service'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}