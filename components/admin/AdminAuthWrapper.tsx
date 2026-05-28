'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface AdminAuthWrapperProps {
  children: React.ReactNode;
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check authentication after loading is complete
    if (!loading) {
      if (!user) {
        // Not logged in at all
        router.push('/login?callbackUrl=' + window.location.pathname);
      } else if (!isAdmin) {
        // Logged in but not an admin
        alert('Access Denied: Admin privileges required');
        router.push('/');
      } else {
        // Authorized admin user
        setIsAuthorized(true);
      }
    }
  }, [user, isAdmin, loading, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen bg-dark items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-light">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Don't render content until authorized
  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen bg-dark items-center justify-center">
        <div className="text-center">
          <p className="text-light">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Render admin content
  return <>{children}</>;
}