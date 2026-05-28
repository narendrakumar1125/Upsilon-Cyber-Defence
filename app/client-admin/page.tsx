'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { BookOpen, Shield, FileText, Users } from 'lucide-react';

// This will be replaced with actual data once Firestore is set up
const mockData = {
  courseCount: 12,
  serviceCount: 8,
  resourceCount: 35,
  userCount: 85,
  recentCourses: [
    { id: '1', title: 'Cloud Security', category: 'Cybersecurity' },
    { id: '2', title: 'Ethical Hacking', category: 'Cybersecurity' },
    { id: '3', title: 'Network Defense', category: 'Cybersecurity' },
    { id: '4', title: 'Incident Response', category: 'Cybersecurity' },
  ],
  recentResources: [
    { id: '1', name: 'Cloud Security Syllabus.pdf', entityType: 'course' },
    { id: '2', name: 'Ethical Hacking Guide.pdf', entityType: 'course' },
    { id: '3', name: 'Network Defense Tools.zip', entityType: 'course' },
    { id: '4', name: 'Incident Response Template.docx', entityType: 'service' },
  ]
};

export default function ClientAdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Wait for loading to complete and then check auth
    if (!loading && isClient) {
      if (!user || !isAdmin) {
        router.push('/login?callbackUrl=/client-admin');
      }
    }
  }, [user, isAdmin, loading, router, isClient]);

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

  // In a real implementation, we would fetch actual data from Firestore here
  const { 
    courseCount, 
    serviceCount, 
    resourceCount, 
    userCount,
    recentCourses,
    recentResources
  } = mockData;
  
  return (
    <div className="min-h-screen bg-dark">
      <div className="flex min-h-screen">
        {/* Admin Sidebar - Client Side Version */}
        <aside className="fixed inset-y-0 left-0 z-30 w-64 bg-dark-200 hidden md:block">
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 border-b border-dark-300">
              <Link href="/" className="flex items-center">
                <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-lg border border-sky-300/30 bg-[radial-gradient(circle_at_30%_20%,rgba(59,232,176,0.24),transparent_38%),linear-gradient(135deg,#0f172a,#0b1220)] text-sky-100 shadow-lg shadow-sky-950/30">
                  <span className="font-display text-lg font-bold">U</span>
                </div>
                <span className="text-xl font-bold text-light">Admin</span>
              </Link>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 py-6 px-4 overflow-y-auto">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/client-admin"
                    className="flex items-center px-4 py-3 rounded-md transition-colors bg-primary/20 text-primary"
                  >
                    <BookOpen className="h-5 w-5 mr-3" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/client-admin/courses"
                    className="flex items-center px-4 py-3 rounded-md transition-colors text-gray-400 hover:bg-dark-300 hover:text-light"
                  >
                    <BookOpen className="h-5 w-5 mr-3" />
                    <span>Courses</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/client-admin/services"
                    className="flex items-center px-4 py-3 rounded-md transition-colors text-gray-400 hover:bg-dark-300 hover:text-light"
                  >
                    <Shield className="h-5 w-5 mr-3" />
                    <span>Services</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/client-admin/resources"
                    className="flex items-center px-4 py-3 rounded-md transition-colors text-gray-400 hover:bg-dark-300 hover:text-light"
                  >
                    <FileText className="h-5 w-5 mr-3" />
                    <span>Resources</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-dark-300">
              <button
                onClick={() => {
                  signOut();
                  window.location.href = '/';
                }}
                className="flex items-center w-full px-4 py-3 rounded-md text-gray-400 hover:bg-dark-300 hover:text-light transition-colors"
              >
                <FileText className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto ml-0 md:ml-64">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-light">Admin Dashboard</h1>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/client-admin/courses" className="bg-dark-200 p-6 rounded-lg shadow-md hover:bg-dark-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-light">Courses</h3>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-light">{courseCount}</p>
              </Link>

              <Link href="/client-admin/services" className="bg-dark-200 p-6 rounded-lg shadow-md hover:bg-dark-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-light">Services</h3>
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-secondary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-light">{serviceCount}</p>
              </Link>

              <Link href="/client-admin/resources" className="bg-dark-200 p-6 rounded-lg shadow-md hover:bg-dark-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-light">Resources</h3>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-light">{resourceCount}</p>
              </Link>

              <div className="bg-dark-200 p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-light">Users</h3>
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-light">{userCount}</p>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-dark-200 p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-light">Recent Courses</h3>
                  <Link href="/client-admin/courses" className="text-primary hover:text-primary/80 text-sm">View all</Link>
                </div>
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <Link href={`/client-admin/courses/${course.id}`} key={course.id}>
                      <div className="flex items-center justify-between p-3 bg-dark-300/50 rounded-lg hover:bg-dark-300 transition-colors">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-light">{course.title}</p>
                            <p className="text-xs text-gray-400">{course.category}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link
                    href="/client-admin/courses/new"
                    className="inline-flex items-center text-primary hover:text-primary/80"
                  >
                    <span className="mr-1">+</span> Add new course
                  </Link>
                </div>
              </div>
              
              <div className="bg-dark-200 p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-light">Recent Resources</h3>
                  <Link href="/client-admin/resources" className="text-primary hover:text-primary/80 text-sm">View all</Link>
                </div>
                <div className="space-y-4">
                  {recentResources.map((resource) => (
                    <Link href="/client-admin/resources" key={resource.id}>
                      <div className="flex items-center justify-between p-3 bg-dark-300/50 rounded-lg hover:bg-dark-300 transition-colors">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <p className="font-medium text-light">{resource.name}</p>
                            <p className="text-xs text-gray-400">{resource.entityType}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link
                    href="/client-admin/resources"
                    className="inline-flex items-center text-primary hover:text-primary/80"
                  >
                    <span className="mr-1">+</span> Upload resources
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
