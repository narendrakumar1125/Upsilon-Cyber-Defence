'use client';

import { useCallback, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function CoursePreviewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchCourse = useCallback(async () => {
    try {
      const courseDoc = await getDoc(doc(db, 'courses', id!));
      if (courseDoc.exists()) {
        setCourse({ id: courseDoc.id, ...courseDoc.data() });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching course:', error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [fetchCourse, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-xl text-light">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-light mb-4">Course not found</h1>
          <Link href="/client-admin/courses" className="text-primary hover:underline">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-4xl mx-auto p-6">
        <Link 
          href="/client-admin/courses" 
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to courses
        </Link>

        <div className="bg-dark-200 rounded-lg p-8">
          <div className="mb-6">
            <span className="text-sm text-gray-400">Preview Mode</span>
            <h1 className="text-3xl font-bold text-light mt-2">{course.title}</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-gray-400">Category:</span>
              <p className="text-light">{course.category}</p>
            </div>
            <div>
              <span className="text-gray-400">Level:</span>
              <p className="text-light">{course.level}</p>
            </div>
            <div>
              <span className="text-gray-400">Duration:</span>
              <p className="text-light">{course.duration}</p>
            </div>
            <div>
              <span className="text-gray-400">Price:</span>
              <p className="text-light">{course.price}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-light mb-3">Description</h2>
            <p className="text-gray-300 whitespace-pre-wrap">{course.description}</p>
          </div>

          {course.tags && course.tags.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-light mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-dark-300 text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 mb-4">
            {course.featured && (
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                Featured
              </span>
            )}
            {course.popular && (
              <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">
                Popular
              </span>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-dark-300">
            <Link 
              href={`/client-admin/courses/edit?id=${course.id}`}
              className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-2 px-6 rounded-md transition-all inline-block"
            >
              Edit Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoursePreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-xl text-light">Loading...</div>
      </div>
    }>
      <CoursePreviewContent />
    </Suspense>
  );
}