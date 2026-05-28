'use client';

import { useRef } from 'react';
import {
  useFadeInOnScroll,
  useStaggerAnimation,
  useParallax,
  useScrollAnimation,
} from '@/hooks';
import { motion } from 'framer-motion';

/**
 * Animation Showcase Component
 * Demonstrates all available GSAP animation utilities
 */
export function AnimationShowcase() {
  // Refs for different animation types
  const fadeRef = useRef<HTMLDivElement>(null);
  const staggerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const scrollAnimRef = useRef<HTMLDivElement>(null);

  // Apply animations
  useFadeInOnScroll(fadeRef);
  useStaggerAnimation(staggerRef, '.animate-item');
  useParallax(parallaxRef, 0.5);

  // Scroll-triggered progress animation
  useScrollAnimation(
    (progress) => {
      if (scrollAnimRef.current) {
        // Update based on scroll progress
      }
    },
    {
      trigger: scrollAnimRef,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
    }
  );

  return (
    <div className="space-y-20 py-20">
      {/* Fade In Example */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Fade In on Scroll</h2>
        <div
          ref={fadeRef}
          className="fade-in bg-gradient-to-r from-blue-500 to-purple-600 p-12 rounded-lg text-white text-center text-xl"
        >
          This content fades in when you scroll to it
        </div>
      </section>

      {/* Stagger Example */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Staggered Animation</h2>
        <div ref={staggerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="animate-item bg-slate-800 p-6 rounded-lg text-center hover:bg-slate-700 transition-colors"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">{item}</div>
              <p className="text-gray-300">Stagger Item</p>
            </div>
          ))}
        </div>
      </section>

      {/* Parallax Example */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Parallax Effect</h2>
        <div
          ref={parallaxRef}
          className="bg-gradient-to-b from-pink-500 to-rose-600 p-12 rounded-lg text-white text-center min-h-64 flex items-center justify-center"
        >
          <div className="text-2xl">
            This moves parallax with your scroll
          </div>
        </div>
      </section>

      {/* Scroll Progress Example */}
      <section ref={scrollAnimRef}>
        <h2 className="text-3xl font-bold mb-8">Scroll Progress Bar</h2>
        <div className="space-y-4">
          <div className="bg-slate-700 h-3 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-300 to-blue-500"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <p className="text-gray-300">
            The bar fills as you scroll through this section
          </p>
        </div>
      </section>

      {/* Multiple fade items */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Multiple Fade Items</h2>
        <div className="space-y-4">
          {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((item, index) => (
            <FadeInItem key={index} delay={index * 0.2}>
              <div className="bg-slate-700 p-6 rounded-lg text-white">
                {item}
              </div>
            </FadeInItem>
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * Helper component for fade-in with custom delay
 */
function FadeInItem({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFadeInOnScroll(ref);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      {children}
    </motion.div>
  );
}
