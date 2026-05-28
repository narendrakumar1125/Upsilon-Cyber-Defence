'use client';

import { useRef } from 'react';
import { useStaggerAnimation, useFadeInOnScroll } from '@/hooks';

/**
 * Enhanced Services Section with scroll animations
 * Wrap your existing ServicesSection with this component
 */
export function EnhancedServicesSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Stagger animation for service cards
  useStaggerAnimation(containerRef, '.glass-card');

  // Fade in for the heading
  useFadeInOnScroll(headingRef);

  return (
    <>
      <div ref={headingRef}>{/* Heading will fade in */}</div>
      <div ref={containerRef}>{/* Service cards will stagger */}</div>
      {children}
    </>
  );
}
