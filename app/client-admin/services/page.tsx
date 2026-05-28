'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Shield, Plus, Pencil, Trash, Eye } from 'lucide-react';
import AdminSidebarClient from '@/components/admin/AdminSidebarClient';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

export default function AdminServicesPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Wait for loading to complete and then check auth
    if (!loading && isClient) {
      if (!user || !isAdmin) {
        router.push('/login?callbackUrl=/client-admin/services');
      } else {
        // Fetch services
        fetchServices();
      }
    }
  }, [user, isAdmin, loading, router, isClient]);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const servicesQuery = query(collection(db, 'services'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(servicesQuery);
      const servicesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(servicesData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'services', id));
        fetchServices(); // Refresh the list
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service. Please try again.');
      }
    }
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
            <h1 className="text-2xl font-bold text-light">Services</h1>
            <div className="flex gap-3">
              <Link 
                href="/admin/services/bulk-upload"
                className="bg-dark-300 hover:bg-dark-400 text-light font-bold py-2 px-4 rounded-md transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                Bulk Upload
              </Link>
              <Link 
                href="/client-admin/services/edit?id=new"
                className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-2 px-4 rounded-md transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                Add New Service
              </Link>
            </div>
          </div>
          
          <div className="bg-dark-200 p-6 rounded-lg shadow-md overflow-hidden">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-gray-300">Loading services...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-300">No services found. Create your first service by clicking the "Add New Service" button.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-dark-300">
                      <th className="text-left py-3 px-4 text-light">Title</th>
                      <th className="text-left py-3 px-4 text-light">Category</th>
                      <th className="text-left py-3 px-4 text-light">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id} className="border-t border-dark-300 hover:bg-dark-300/50">
                        <td className="py-3 px-4 text-light">{service.title}</td>
                        <td className="py-3 px-4 text-gray-300">{service.category}</td>
                        <td className="py-3 px-4 flex space-x-2">
                          <Link 
                            href={`/client-admin/services/edit?id=${service.id}`}
                            className="p-1 bg-dark-300 text-blue-400 rounded hover:bg-dark-400"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </Link>
                          <Link 
                            href={`/client-admin/services/preview?id=${service.id}`}
                            className="p-1 bg-dark-300 text-gray-400 rounded hover:bg-dark-400"
                            title="View"
                          >
                            <Eye size={16} />
                          </Link>
                          <button 
                            onClick={() => handleDeleteService(service.id)}
                            className="p-1 bg-dark-300 text-red-400 rounded hover:bg-dark-400"
                            title="Delete"
                          >
                            <Trash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}