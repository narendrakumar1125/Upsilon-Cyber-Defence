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
});

type CourseFormData = z.infer<typeof courseSchema>;

export default function NewCoursePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
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
    setValue('tags', currentTags.filter((t) => t !== tag));
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
        <h1 className="text-2xl font-bold text-light mb-6">Create New Course</h1>
        
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
            <label htmlFor="syllabusLink" className="block text-light font-medium mb-2">Syllabus Link (Optional)</label>
            <input
              {...register('syllabusLink')}
              id="syllabusLink"
              className="w-full bg-dark-200 border border-dark-300 rounded-md py-2 px-4 text-light focus:outline-none focus:border-primary"
              placeholder="e.g., /syllabus/cloud-security"
            />
          </div>
          
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
              {submitting ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}