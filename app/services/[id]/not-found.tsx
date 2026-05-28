'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen bg-dark text-light">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            The service you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105"
            >
              View All Services
            </Link>
            <Link
              href="/"
              className="bg-transparent border border-primary text-primary hover:bg-primary/10 font-bold py-3 px-6 rounded-md transition-all"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

