'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/ContactAndFooter';

// Static NavLink component that doesn't use any hooks
const StaticNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <Link href={href} className="font-medium text-gray-300 hover:text-primary transition-colors">
      {children}
    </Link>
  );
};

// Static navbar that doesn't rely on hooks
const StaticNavbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-dark/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-lg border border-sky-300/30 bg-[radial-gradient(circle_at_30%_20%,rgba(59,232,176,0.24),transparent_38%),linear-gradient(135deg,#0f172a,#0b1220)] text-sky-100 shadow-lg shadow-sky-950/30">
              <span className="font-display text-lg font-bold">U</span>
            </div>
            <span className="text-xl font-bold text-light tracking-tight">Upsilon Cyber Defence</span>
          </Link>
          
          {/* Simplified Navigation without hooks */}
          <div className="hidden md:flex items-center space-x-8">
            <StaticNavLink href="/">Home</StaticNavLink>
            <StaticNavLink href="/about">About Us</StaticNavLink>
            <StaticNavLink href="/courses">Courses</StaticNavLink>
            <StaticNavLink href="/services">Services</StaticNavLink>
            <StaticNavLink href="/contact">Contact</StaticNavLink>
            
            <Link
              href="/contact"
              className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-medium py-2 px-4 rounded-md transition-all shadow-lg"
            >
              Free Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Not found content
const NotFoundContent = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-5xl md:text-6xl font-bold mb-6">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">Page Not Found</h2>
      <p className="text-gray-300 text-lg mb-8 max-w-md text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-8 rounded-md transition-all transform hover:scale-105 inline-block"
      >
        Return to Home
      </Link>
    </div>
  );
};

// Main content component
function NotFoundPageContent() {
  return (
    <div className="min-h-screen bg-dark text-light">
      {/* Use a static navbar that doesn't rely on useSearchParams */}
      <StaticNavbar />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-dark to-dark-100 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cyber-grid opacity-10" style={{
            transform: 'perspective(1000px) rotateX(60deg)',
            transformOrigin: 'top',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <NotFoundContent />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

// Main 404 page with suspense boundary
export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark text-center py-20">Loading...</div>}>
      <NotFoundPageContent />
    </Suspense>
  );
}
