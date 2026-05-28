'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { ChevronLeft, X } from 'lucide-react';
import AdminSidebarClient from '@/components/admin/AdminSidebarClient';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, updateDoc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import FileUpload from '@/components/admin/FileUpload';

export default function CourseForm({ id }: { id: string }) {
  const courseId = id;
  const isNewCourse = courseId === 'new';
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
    level: '',
    duration: '',
    price: '',
    popular: false,
    featured: false,
    tags: [] as string[],
    syllabusLink: '',
    syllabusFile: '',
    syllabus: [] as Array<{ title: string; topics: string[] }>,
    imageUrl: ''
  });
  
  // Files state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [tag, setTag] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Authentication check
  const fetchCourse = useCallback(async () => {
    try {
      const courseDoc = doc(db, 'courses', courseId);
      const courseSnap = await getDoc(courseDoc);

      if (courseSnap.exists()) {
        const data = courseSnap.data();
        setFormData({
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          level: data.level || '',
          duration: data.duration || '',
          price: data.price || '',
          popular: data.popular || false,
          featured: data.featured || false,
          tags: data.tags || [],
          syllabusLink: data.syllabusLink || '',
          syllabusFile: data.syllabusFile || '',
          syllabus: data.syllabus || [],
          imageUrl: data.imageUrl || ''
        });
      } else {
        alert('Course not found!');
        router.push('/client-admin/courses');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching course:', error);
      setIsLoading(false);
    }
  }, [courseId, router]);

  useEffect(() => {
    if (!loading && isClient) {
      if (!user || !isAdmin) {
        router.push('/login?callbackUrl=/client-admin/courses');
      } else if (!isNewCourse) {
        fetchCourse();
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isAdmin, loading, router, isClient, isNewCourse, fetchCourse]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Handle adding tags
  const addTag = () => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
      setTag('');
    }
  };

  // Handle removing tags
  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tagToRemove)
    });
  };
  
  // Add a syllabus module
  const addModule = () => {
    setFormData({
      ...formData,
      syllabus: [...formData.syllabus, { title: '', topics: [] }]
    });
  };
  
  // Remove a syllabus module
  const removeModule = (index: number) => {
    setFormData({
      ...formData,
      syllabus: formData.syllabus.filter((_, i) => i !== index)
    });
  };
  
  // Update module title
  const updateModuleTitle = (index: number, title: string) => {
    const updated = [...formData.syllabus];
    updated[index] = { ...updated[index], title };
    setFormData({ ...formData, syllabus: updated });
  };
  
  // Add topic to module
  const addTopic = (moduleIndex: number, topic: string) => {
    const updated = [...formData.syllabus];
    updated[moduleIndex] = {
      ...updated[moduleIndex],
      topics: [...updated[moduleIndex].topics, topic]
    };
    setFormData({ ...formData, syllabus: updated });
  };
  
  // Remove topic from module
  const removeTopic = (moduleIndex: number, topicIndex: number) => {
    const updated = [...formData.syllabus];
    updated[moduleIndex] = {
      ...updated[moduleIndex],
      topics: updated[moduleIndex].topics.filter((_, i) => i !== topicIndex)
    };
    setFormData({ ...formData, syllabus: updated });
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

      // Create or update course document
      const courseData = {
        ...formData,
        imageUrl,
        authorId: user!.uid,
        updatedAt: serverTimestamp()
      };

      if (isNewCourse) {
        // Add createdAt for new courses
        const newCourseRef = doc(collection(db, 'courses'));
        await setDoc(newCourseRef, {
          ...courseData,
          createdAt: serverTimestamp()
        });
      } else {
        // Update existing course
        const courseRef = doc(db, 'courses', courseId);
        await updateDoc(courseRef, courseData);
      }

      // Redirect to courses list
      router.push('/client-admin/courses');
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Error saving course. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `courses/${uuidv4()}_${file.name}`);
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
          {loading || !isClient ? "Loading..." : isLoading ? "Loading course..." : "You need admin access"}
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
              href="/client-admin/courses"
              className="flex items-center text-gray-400 hover:text-light transition-colors"
            >
              <ChevronLeft size={16} />
              <span>Back to Courses</span>
            </Link>
          </div>
          
          <div className="bg-dark-200 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-light mb-6">
              {isNewCourse ? 'Add New Course' : 'Edit Course'}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-light font-medium mb-2">
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                    placeholder="Enter course title"
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
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="devops">DevOps</option>
                    <option value="cloud">Cloud Computing</option>
                    <option value="development">Software Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="networking">Networking</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-light font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                  placeholder="Enter course description"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="level" className="block text-light font-medium mb-2">
                    Level
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                  >
                    <option value="">Select a level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-light font-medium mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                    placeholder="e.g., 6 weeks"
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-light font-medium mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                    placeholder="e.g., ₹30,000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="image" className="block text-light font-medium mb-2">
                    Course Image
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
                
                <div>
                  <label htmlFor="syllabusLink" className="block text-light font-medium mb-2">
                    External Syllabus Link (Optional)
                  </label>
                  <input
                    type="text"
                    id="syllabusLink"
                    name="syllabusLink"
                    value={formData.syllabusLink}
                    onChange={handleChange}
                    className="w-full bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                    placeholder="e.g., https://docs.google.com/document/..."
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="popular"
                    name="popular"
                    checked={formData.popular}
                    onChange={handleChange}
                    className="w-4 h-4 bg-dark-300 border border-dark-400 rounded focus:outline-none focus:ring-primary text-primary"
                  />
                  <label htmlFor="popular" className="text-light font-medium ml-2">
                    Mark as popular
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 bg-dark-300 border border-dark-400 rounded focus:outline-none focus:ring-primary text-primary"
                  />
                  <label htmlFor="featured" className="text-light font-medium ml-2">
                    Feature on homepage
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-light font-medium mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-primary/20 text-primary text-sm rounded-full px-3 py-1 flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
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
                    id="tag-input"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Add a tag and press Enter"
                    className="flex-1 bg-dark-300 border border-dark-400 rounded-l-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="bg-primary/20 hover:bg-primary/30 text-primary px-4 rounded-r-md transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-light mb-4">Course Syllabus Modules</h3>
                <p className="text-gray-400 text-sm mb-4">Add modules and topics for your course syllabus</p>
                
                <div className="space-y-4">
                  {formData.syllabus.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="bg-dark-400 p-4 rounded-md">
                      <div className="flex items-start gap-4 mb-3">
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => updateModuleTitle(moduleIndex, e.target.value)}
                          placeholder={`Module ${moduleIndex + 1} Title`}
                          className="flex-1 bg-dark-300 border border-dark-400 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => removeModule(moduleIndex)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="pl-4">
                        <div className="mb-2">
                          <label className="text-sm text-gray-400">Topics:</label>
                        </div>
                        <div className="space-y-2 mb-3">
                          {module.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="flex-1 text-gray-300">{topic}</span>
                              <button
                                type="button"
                                onClick={() => removeTopic(moduleIndex, topicIndex)}
                                className="text-gray-400 hover:text-red-400 text-xl"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add a topic"
                            className="flex-1 bg-dark-300 border border-dark-400 rounded-md py-1 px-3 text-light text-sm focus:outline-none focus:border-primary"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const input = e.currentTarget;
                                if (input.value.trim()) {
                                  addTopic(moduleIndex, input.value.trim());
                                  input.value = '';
                                }
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1 rounded-md text-sm"
                            onClick={(e) => {
                              const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                              if (input && input.value.trim()) {
                                addTopic(moduleIndex, input.value.trim());
                                input.value = '';
                              }
                            }}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addModule}
                    className="w-full border-2 border-dashed border-dark-400 rounded-md py-3 text-gray-400 hover:text-light hover:border-primary transition-colors"
                  >
                    + Add Module
                  </button>
                </div>
              </div>
              
              {!isNewCourse && (
                <div className="pt-6 border-t border-dark-300">
                  <h2 className="text-xl font-bold text-light mb-4">Course Resources</h2>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-semibold text-light mb-2">Upload Syllabus PDF</h4>
                      <FileUpload
                        entityId={courseId}
                        entityType="course-syllabus"
                        onUploadComplete={(url, name) => {
                          setFormData({ ...formData, syllabusFile: url });
                          console.log('Uploaded syllabus:', name, url);
                        }}
                      />
                      {formData.syllabusFile && (
                        <p className="text-sm text-gray-400 mt-2">
                          Current file: <a href={formData.syllabusFile} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Syllabus</a>
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-md font-semibold text-light mb-2">Other Course Materials</h4>
                      <FileUpload
                        entityId={courseId}
                        entityType="course"
                        onUploadComplete={(url, name) => {
                          console.log('Uploaded resource:', name, url);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <Link
                  href="/client-admin/courses"
                  className="bg-dark-300 text-light hover:bg-dark-400 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-2 px-4 rounded-md transition-all disabled:opacity-70"
                >
                  {isSaving ? 'Saving...' : isNewCourse ? 'Create Course' : 'Update Course'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}