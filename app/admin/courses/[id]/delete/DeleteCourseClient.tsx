'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ChevronLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function DeleteCoursePage({ id }: { id: string }) {
  const courseId = id;
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (!user) {
      setError('Unauthorized');
      return;
    }
    
    setDeleting(true);
    setError(null);
    
    try {
      // First, delete all resources associated with the course
      const resourcesQuery = query(
        collection(db, 'resources'),
        where('entityId', '==', courseId),
        where('entityType', '==', 'course')
      );
      
      const resourcesSnapshot = await getDocs(resourcesQuery);
      const deletePromises = resourcesSnapshot.docs.map(doc => deleteDoc(doc.ref));
      
      await Promise.all(deletePromises);
      
      // Then delete the course
      await deleteDoc(doc(db, 'courses', courseId));
      
      router.push('/admin/courses');
    } catch (error) {
      console.error('Error deleting course:', error);
      setError('Failed to delete course');
      setDeleting(false);
    }
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
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle size={24} className="text-red-500" />
          <h1 className="text-2xl font-bold text-light">Delete Course</h1>
        </div>
        
        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <div className="bg-dark-200/50 p-4 rounded-md mb-6">
          <p className="text-gray-300">
            Are you sure you want to delete this course? This action cannot be undone. All resources associated with this course will also be deleted.
          </p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/courses"
            className="bg-dark-200 text-light hover:bg-dark-300 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            {deleting ? 'Deleting...' : 'Delete Course'}
          </button>
        </div>
      </div>
    </div>
  );
}