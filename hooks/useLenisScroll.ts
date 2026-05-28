import { useEffect } from 'react';

// No-op Lenis/GSAP fallback implementations to avoid heavy dependencies
export const useLenisScroll = (_enabled: boolean = true) => {
  useEffect(() => {
    // intentionally no-op; keeps API compatibility
    return () => {};
  }, [_enabled]);
};

export const useScrollTo = () => {
  const scrollTo = (target: HTMLElement | string) => {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (target && typeof (target as HTMLElement).scrollIntoView === 'function') {
      (target as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { scrollTo };
};

export const initializeLenis = () => {
  // no-op: return null to indicate not initialized
  return null;
};

export default null;
