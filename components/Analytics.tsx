'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// This is a placeholder analytics component
// In a production environment, replace with your actual analytics service
// such as Google Analytics, Fathom, Plausible, etc.

// Create a separate component that uses the client-side hooks
const AnalyticsContent: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Track page views when pathname or search params change
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Example tracking function - replace with your analytics service
    trackPageView(url);
  }, [pathname, searchParams]);
  
  return null; // This component doesn't render anything
};

// Main Analytics component with Suspense boundary
export const Analytics: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
};

// Placeholder tracking functions - replace with your actual analytics service
const trackPageView = (url: string) => {
  // Replace with your analytics implementation
  if (process.env.NODE_ENV === 'production') {
    console.log(`Tracking page view: ${url}`);
    
    // Example Google Analytics tracking code
    // window.gtag && window.gtag('config', 'YOUR-GA-ID', {
    //   page_path: url,
    // });
    
    // Example for custom analytics
    // sendAnalyticsEvent('page_view', {
    //   page_path: url,
    //   page_title: document.title,
    // });
  }
};

export const sendAnalyticsEvent = (
  eventName: string, 
  eventParams: Record<string, string | number | boolean> = {}
) => {
  // Replace with your analytics implementation
  if (process.env.NODE_ENV === 'production') {
    console.log(`Tracking event: ${eventName}`, eventParams);
    
    // Example Google Analytics tracking code
    // window.gtag && window.gtag('event', eventName, eventParams);
    
    // Example for other analytics services
    // window._analytics && window._analytics.track(eventName, eventParams);
  }
};