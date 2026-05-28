'use client';

import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const ring2Ref = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || !hasFinePointer) {
      return;
    }

    const updateCursor = () => {
      const { x, y } = pointerRef.current;
      const dotX = x - 4;
      const dotY = y - 4;
      const ringX = x - 16;
      const ringY = y - 16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      if (ring2Ref.current) {
        ring2Ref.current.style.transform = `translate(${x - 24}px, ${y - 24}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${x - 2}px, ${y - 2}px)`;
      }

      frameRef.current = null;
    };

    const onMouseMove = (event: MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(updateCursor);
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div className="hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-sky-400 rounded-full pointer-events-none z-50"
        style={{ willChange: 'transform' }}
      />

      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 rounded-full pointer-events-none z-40 transition-transform duration-300 ease-out border-sky-400/50"
        style={{ willChange: 'transform' }}
      />

      <div
        ref={ring2Ref}
        className="fixed top-0 left-0 w-12 h-12 border border-sky-400/20 rounded-full pointer-events-none z-30 transition-transform duration-500 ease-out opacity-30"
        style={{ willChange: 'transform' }}
      />

      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-1 h-1 bg-sky-400/40 rounded-full pointer-events-none z-20 opacity-70"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default CustomCursor;
