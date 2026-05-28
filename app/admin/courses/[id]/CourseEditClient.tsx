'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import FileUpload from '@/components/FileUpload';

// Form schema
const courseSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().min(1, { message: "Category is required" }),
  level: z.string().min(1, { message: "Level is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  popular: z.boolean().default(false),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  syllabusLink: z.string().optional(),
  syllabusFile: z.string().optional(),
  syllabus: z.array(z.object({
    title: z.string(),
    topics: z.array(z.string())
  })).default([]),
});

// Define the type explicitly
type CourseFormData = {
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  price: string;
  popular: boolean;
  featured: boolean;
  tags: string[];
  syllabusLink?: string;
  syllabusFile?: string;
  syllabus: Array<{
    title: string;
    topics: string[];
  }>;
};

export default function CourseEditPage({ id }: { id: string }) {
  const courseId = id;
  const isNewCourse = courseId === 'new';
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm<CourseFormData>({
    // Temporarily removing resolver to fix build issues
    // resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      level: '',
      duration: '',
      price: '',
      popular: false,
      featured: false,
      tags: [],
      syllabusLink: '',
      syllabusFile: '',
      syllabus: [],
    }
  });
  
  // Submit handler
  const onSubmit = async (data: CourseFormData) => {
    if (!user || !user.email) {
      setError('Unauthorized');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Add course to Firestore
      const courseRef = await addDoc(collection(db, 'courses'), {
        ...data,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      router.push(`/admin/courses/${courseRef.id}`);
    } catch (error) {
      console.error('Error creating course:', error);
      setError('Failed to create course');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Add a tag
  const addTag = (tag: string) => {
    const currentTags = control._formValues.tags || [];
    
    if (tag && !currentTags.includes(tag)) {
      setValue('tags', [...currentTags, tag.toLowerCase()]);
    }
  };
  
  // Remove a tag
  const removeTag = (tag: string) => {
    const currentTags = control._formValues.tags || [];
    setValue('tags', currentTags.filter((t: string) => t !== tag));
  };
  
  // Add a syllabus module
  const addModule = () => {
    const currentSyllabus = control._formValues.syllabus || [];
    setValue('syllabus', [...currentSyllabus, { title: '', topics: [] }]);
  };
  
  // Remove a syllabus module
  const removeModule = (index: number) => {
    const currentSyllabus = control._formValues.syllabus || [];
    setValue('syllabus', currentSyllabus.filter((_, i) => i !== index));
  };
  
  // Update module title
  const updateModuleTitle = (index: number, title: string) => {
    const currentSyllabus = control._formValues.syllabus || [];
    const updated = [...currentSyllabus];
    updated[index] = { ...updated[index], title };
    setValue('syllabus', updated);
  };
  
  // Add topic to module
  const addTopic = (moduleIndex: number, topic: string) => {
    const currentSyllabus = control._formValues.syllabus || [];
    const updated = [...currentSyllabus];
    updated[moduleIndex] = {
      ...updated[moduleIndex],
      topics: [...(updated[moduleIndex].topics || []), topic]
    };
    setValue('syllabus', updated);
  };
  
  // Remove topic from module
  const removeTopic = (moduleIndex: number, topicIndex: number) => {
    const currentSyllabus = control._formValues.syllabus || [];
    const updated = [...currentSyllabus];
    updated[moduleIndex] = {
      ...updated[moduleIndex],
      topics: updated[moduleIndex].topics.filter((_, i) => i !== topicIndex)
    };
    setValue('syllabus', updated);
  };
  
  return (
    <div>
      <div className="mb-6">
        <Link 
          href="/admin/courses"
          className="flex items-center text-gray-400 hover:text-light transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Back to Courses</span>
        </Link>
      </div>
      
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold text-light mb-6">{isNewCourse ? "Create New Course" : "Edit Course"}</h1>
        
        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-light font-medium mb-2">Course Title</label>
              <input
                {...register('title')}
                id="title"
                className="w-full bg-dark-200 border border-dark-300 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                placeholder="Enter course title"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="category" className="block text-light font-medium mb-2">Category</label>
              <select
                {...register('category')}
                id="category"
                className="w-full bg-dark-200 border border-dark-300 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
              >
                <option value="">Select a category</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="devops">DevOps</option>
                <option value="cloud">Cloud Computing</option>
                <option value="development">Software Development</option>
                <option value="data-science">Data Science</option>
              </select>
              {errors.category && (
                <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-light font-medium mb-2">Description</label>
            <textarea
              {...register('description')}
              id="description"
              rows={5}
              className="w-full bg-dark-200 border border-dark-300 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
              placeholder="Enter course description"
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="level" className="block text-light font-medium mb-2">Level</label>
              <select
                {...register('level')}
                id="level"
                className="w-full bg-dark-200 border border-dark-300 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
              >
                <option value="">Select a level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
              {errors.level && (
                <p className="text-red-400 text-sm mt-1">{errors.level.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-light font-medium mb-2">Duration</label>
              <input
                {...register('duration')}
                id="duration"
                className="w-full bg-dark-200 border border-dark-300 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                placeholder="e.g., 6 weeks"
              />
              {errors.duration && (
                <p className="text-red-400 text-sm mt-1">{errors.duration.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="price" className="block text-light font-medium mb-2">Price</label>
              <input
                {...register('price')}
                id="price"
                className="w-full bg-dark-200 border border-dark-300 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                placeholder="e.g., ₹30,000"
              />
              {errors.price && (
                <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <Controller
                name="popular"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    id="popular"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-4 h-4 bg-dark-200 border border-dark-300 rounded focus:outline-none focus:ring-primary text-primary"
                  />
                )}
              />
              <label htmlFor="popular" className="text-light font-medium ml-2">
                Mark as popular
              </label>
            </div>
            
            <div className="flex items-center">
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    id="featured"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-4 h-4 bg-dark-200 border border-dark-300 rounded focus:outline-none focus:ring-primary text-primary"
                  />
                )}
              />
              <label htmlFor="featured" className="text-light font-medium ml-2">
                Feature on homepage
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-light font-medium mb-2">Tags</label>
            <div className="mb-2">
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {field.value?.map((tag) => (
                        <span 
                          key={tag} 
                          className="bg-primary/20 text-primary text-sm rounded-full px-3 py-1 flex items-center"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-primary hover:text-light"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex">
                      <input
                        type="text"
                        id="tag-input"
                        placeholder="Add a tag and press Enter"
                        className="flex-1 bg-dark-200 border border-dark-300 rounded-l-md py-2 px-4 text-light focus:outline-none focus:border-primary"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.currentTarget;
                            if (input.value.trim()) {
                              addTag(input.value.trim());
                              input.value = '';
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="bg-primary/20 hover:bg-primary/30 text-primary px-4 rounded-r-md transition-colors"
                        onClick={() => {
                          const input = document.getElementById('tag-input') as HTMLInputElement;
                          if (input && input.value.trim()) {
                            addTag(input.value.trim());
                            input.value = '';
                          }
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="syllabusLink" className="block text-light font-medium mb-2">External Syllabus Link (Optional)</label>
            <input
              {...register('syllabusLink')}
              id="syllabusLink"
              className="w-full bg-dark-200 border border-dark-300 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
              placeholder="e.g., https://docs.google.com/document/..."
            />
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-light mb-4">Course Syllabus Modules</h3>
            <p className="text-gray-400 text-sm mb-4">Add modules and topics for your course syllabus</p>
            
            <Controller
              name="syllabus"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  {field.value?.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="glass-card p-4">
                      <div className="flex items-start gap-4 mb-3">
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => updateModuleTitle(moduleIndex, e.target.value)}
                          placeholder={`Module ${moduleIndex + 1} Title`}
                          className="flex-1 bg-dark-200 border border-dark-300 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
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
                          {module.topics?.map((topic, topicIndex) => (
                            <div key={topicIndex} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="flex-1 text-gray-300">{topic}</span>
                              <button
                                type="button"
                                onClick={() => removeTopic(moduleIndex, topicIndex)}
                                className="text-gray-400 hover:text-red-400"
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
                            className="flex-1 bg-dark-200 border border-dark-300 rounded-md py-1 px-3 text-light text-sm focus:outline-none focus:border-primary"
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
                    className="w-full border-2 border-dashed border-dark-300 rounded-md py-3 text-gray-400 hover:text-light hover:border-primary transition-colors"
                  >
                    + Add Module
                  </button>
                </div>
              )}
            />
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
                      setValue('syllabusFile', url);
                      console.log('Uploaded syllabus:', name, url);
                    }}
                  />
                  {control._formValues.syllabusFile && (
                    <p className="text-sm text-gray-400 mt-2">
                      Current file: <a href={control._formValues.syllabusFile} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Syllabus</a>
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
              href="/admin/courses"
              className="bg-dark-200 text-light hover:bg-dark-300 font-medium py-2 px-4 rounded-md transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-2 px-4 rounded-md transition-all"
            >
              {submitting ? 'Creating...' : isNewCourse ? 'Create Course' : 'Update Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}