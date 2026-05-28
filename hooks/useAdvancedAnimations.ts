import { useRef, useEffect } from 'react';

/**
 * Lightweight no-GSAP implementations to preserve API while removing heavy deps
 */
export const useCompositeAnimation = (ref: React.RefObject<HTMLElement>, options: {
  fadeIn?: boolean;
  scaleUp?: boolean;
  rotateIn?: boolean;
  slideFromLeft?: boolean;
  slideFromRight?: boolean;
  duration?: number;
  delay?: number;
} = {}) => {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('composite-animated');
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options]);
};

export const useCounterAnimation = (
  ref: React.RefObject<HTMLElement>,
  targetNumber: number,
  duration: number = 2
) => {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let rafId: number | null = null;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const animate = (time: number) => {
            const t = Math.min(1, (time - start) / (duration * 1000));
            const value = Math.floor(t * targetNumber);
            el.textContent = value.toString();
            if (t < 1) rafId = requestAnimationFrame(animate);
          };
          rafId = requestAnimationFrame(animate);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    obs.observe(el);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      obs.disconnect();
    };
  }, [ref, targetNumber, duration]);
};

export const useProgressBar = (ref: React.RefObject<HTMLElement>, targetSection: HTMLElement | string) => {
  useEffect(() => {
    if (!ref.current || !targetSection) return;
    const bar = ref.current;
    const targetEl = typeof targetSection === 'string' ? document.querySelector(targetSection) : targetSection;
    if (!targetEl) return;

    const onScroll = () => {
      const rect = (targetEl as HTMLElement).getBoundingClientRect();
      const height = window.innerHeight + rect.height;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / height));
      bar.style.width = `${Math.round(progress * 100)}%`;
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, targetSection]);
};

export const useHoverScroll = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    const onEnter = () => el.classList.add('hovered');
    const onLeave = () => el.classList.remove('hovered');

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    obs.observe(el);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      obs.disconnect();
    };
  }, [ref]);
};

export const useWaveEffect = (ref: React.RefObject<HTMLElement>, selector: string = 'span') => {
  useEffect(() => {
    if (!ref.current) return;
    const els = Array.from(ref.current.querySelectorAll(selector));
    let idx = 0;
    const interval = setInterval(() => {
      els.forEach((el, i) => el.classList.toggle('wave', i === idx));
      idx = (idx + 1) % els.length;
    }, 150);

    return () => clearInterval(interval);
  }, [ref, selector]);
};

export const useFloating = (ref: React.RefObject<HTMLElement>, distance: number = 20, duration: number = 3) => {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let up = true;
    let rafId: number | null = null;
    const startY = 0;
    let last = performance.now();

    const animate = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      const offset = Math.sin(t / (duration * 1000) * Math.PI * 2) * distance * 0.5;
      el.style.transform = `translateY(${offset}px)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }, [ref, distance, duration]);
};
