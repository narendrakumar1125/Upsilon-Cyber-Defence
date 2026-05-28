'use client';

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

export default function AdminDashboard() {
  // Auth check is handled by the layout
  
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-light">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <Link 
            href="/admin/courses/new"
            className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-2 px-4 rounded-md transition-all"
          >
            Add New Course
          </Link>
          <Link 
            href="/admin/services/new"
            className="bg-dark-200 text-light hover:bg-dark-300 font-bold py-2 px-4 rounded-md transition-all"
          >
            Add New Service
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-light">Courses</h3>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-bold text-light">{courseCount}</p>
          <Link href="/admin/courses" className="text-primary text-sm hover:underline mt-2 inline-block">
            View all courses
          </Link>
        </div>
        
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-light">Services</h3>
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-secondary" />
            </div>
          </div>
          <p className="text-3xl font-bold text-light">{serviceCount}</p>
          <Link href="/admin/services" className="text-secondary text-sm hover:underline mt-2 inline-block">
            View all services
          </Link>
        </div>
        
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-light">Resources</h3>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-bold text-light">{resourceCount}</p>
          <Link href="/admin/resources" className="text-primary text-sm hover:underline mt-2 inline-block">
            View all resources
          </Link>
        </div>
        
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-light">Users</h3>
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-secondary" />
            </div>
          </div>
          <p className="text-3xl font-bold text-light">{userCount}</p>
          <Link href="/admin/users" className="text-secondary text-sm hover:underline mt-2 inline-block">
            Manage users
          </Link>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-light mb-6">Recent Courses</h3>
          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-3 bg-dark-300/50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-light">{course.title}</p>
                    <p className="text-xs text-gray-400">{course.category}</p>
                  </div>
                </div>
                <Link 
                  href={`/admin/courses/${course.id}`}
                  className="text-primary text-sm hover:underline"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-light mb-6">Recent Resources</h3>
          <div className="space-y-4">
            {recentResources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-3 bg-dark-300/50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-light">{resource.name}</p>
                    <p className="text-xs text-gray-400">{resource.entityType}</p>
                  </div>
                </div>
                <a 
                  href="#"
                  className="text-secondary text-sm hover:underline"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}