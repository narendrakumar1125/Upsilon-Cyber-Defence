import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';

// Lightweight, dependency-free scroll animation hooks (no GSAP)

interface ScrollAnimationOptions {
  trigger?: string | HTMLElement | RefObject<HTMLElement>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  duration?: number;
  delay?: number;
}

/**
 * Hook for scroll-triggered animations using GSAP ScrollTrigger
 */
export const useScrollAnimation = (
  callback: (progress: number) => void,
  options: ScrollAnimationOptions = {}
) => {
  const {
    trigger,
    start = 'top center',
    end = 'bottom center',
    scrub = 1,
    markers = false,
    duration = 1,
    delay = 0,
  } = options;

  const resolveTriggerElement = () => {
    if (!trigger) return null;
    if (typeof trigger === 'string') {
      return document.querySelector(trigger) as HTMLElement | null;
    }

    if ('current' in trigger) {
      return trigger.current;
    }

    return trigger;
  };

  const callbackRef = useRef(callback);
  const thresholds = useMemo(() => [0, 0.25, 0.5, 0.75, 1], []);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const element = resolveTriggerElement();
    if (!element) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const progress = entry.intersectionRatio || 0;
        callbackRef.current(progress);
      });
    }, { threshold: thresholds });

    obs.observe(element);
    return () => obs.disconnect();
  }, [trigger, thresholds]);
};

/**
 * Hook for fade-in animations on scroll
 */
export const useFadeInOnScroll = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px) scale(0.98)';
    el.style.transition = 'opacity 0.75s ease, transform 0.75s ease';

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('fade-in-visible');
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
};

/**
 * Hook for staggered animations on scroll
 */
export const useStaggerAnimation = (
  ref: RefObject<HTMLElement>,
  selector: string = '.animate-item'
) => {
  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    const items = Array.from(container.querySelectorAll(selector)) as HTMLElement[];
    if (items.length === 0) return;

    items.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(24px) scale(0.98)';
      item.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
    });

    const timeoutIds: number[] = [];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          items.forEach((item, i) => {
            timeoutIds.push(
              window.setTimeout(() => item.classList.add('stagger-visible'), i * 100)
            );
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });

    obs.observe(container);
    return () => {
      obs.disconnect();
      timeoutIds.forEach(clearTimeout);
    };
  }, [ref, selector]);
};

/**
 * Hook for parallax scroll effect
 */
export const useParallax = (ref: RefObject<HTMLElement>, speed = 0.5) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.style.willChange = 'transform';
    element.style.transition = 'transform 0.3s ease-out';

    return () => {
      element.style.willChange = '';
      element.style.transition = '';
      element.style.transform = '';
    };
  }, [ref, speed]);
};

/**
 * Hook for text reveal animation
 */
export const useTextReveal = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px) scale(0.98)';
    el.style.transition = 'opacity 0.75s ease, transform 0.75s ease';

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('text-reveal-visible');
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
};
