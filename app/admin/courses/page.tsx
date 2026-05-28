'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash, FilePlus, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  price: string;
  [key: string]: any;
}

export default function CoursesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCourses = async () => {
      if (authLoading) return;
      
      if (!user) {
        router.push('/login?callbackUrl=/admin/courses');
        return;
      }
      
      try {
        const coursesQuery = query(
          collection(db, 'courses'), 
          orderBy('createdAt', 'desc')
        );
        
        const coursesSnapshot = await getDocs(coursesQuery);
        const coursesData = coursesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Course[];
        
        setCourses(coursesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, [user, authLoading, router]);
  
  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-light">Loading...</div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-light">Courses</h1>
        <div className="flex gap-2">
          <Link 
            href="/admin/courses/bulk-upload"
            className="bg-dark-300 hover:bg-dark-400 text-light font-bold py-2 px-4 rounded-md transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            Bulk Upload
          </Link>
          <Link 
            href="/admin/courses/new"
            className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-2 px-4 rounded-md transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Course
          </Link>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-500/20 text-red-400 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-dark-200">
                <th className="text-left py-3 px-4 text-light">Title</th>
                <th className="text-left py-3 px-4 text-light">Category</th>
                <th className="text-left py-3 px-4 text-light">Level</th>
                <th className="text-left py-3 px-4 text-light">Price</th>
                <th className="text-left py-3 px-4 text-light">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course.id} className="border-t border-dark-300 hover:bg-dark-200/50">
                    <td className="py-3 px-4 text-light">{course.title}</td>
                    <td className="py-3 px-4 text-gray-300">{course.category}</td>
                    <td className="py-3 px-4 text-gray-300">{course.level}</td>
                    <td className="py-3 px-4 text-gray-300">{course.price}</td>
                    <td className="py-3 px-4 flex space-x-2">
                      <Link 
                        href={`/admin/courses/${course.id}`}
                        className="p-1 bg-dark-200 text-blue-400 rounded hover:bg-dark-300"
                        title="Edit course"
                      >
                        <Pencil size={16} />
                      </Link>
                      <Link 
                        href={`/admin/courses/${course.id}/resources`}
                        className="p-1 bg-dark-200 text-sky-300 rounded hover:bg-dark-300"
                        title="Manage resources"
                      >
                        <FilePlus size={16} />
                      </Link>
                      <Link 
                        href={`/courses/${course.id}`}
                        className="p-1 bg-dark-200 text-gray-400 rounded hover:bg-dark-300"
                        title="View course"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link 
                        href={`/admin/courses/${course.id}/delete`}
                        className="p-1 bg-dark-200 text-red-400 rounded hover:bg-dark-300"
                        title="Delete course"
                      >
                        <Trash size={16} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 px-4 text-center text-gray-400">
                    No courses found. Create your first course by clicking the "Add New Course" button.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}