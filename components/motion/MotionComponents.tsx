"use client";

import Link from 'next/link';
import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

interface MotionComponentProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  [x: string]: any;
}

interface AnimateOnScrollProps extends MotionComponentProps {
  threshold?: number;
  animation?: string;
  delay?: number;
}

interface AnimatedSectionProps extends MotionComponentProps {
  threshold?: number;
}

const observerMap = new Map<string, IntersectionObserver>();
const callbackMap = new WeakMap<Element, (entry: IntersectionObserverEntry) => void>();

const getObserver = (threshold: number, rootMargin = '0px') => {
  const key = JSON.stringify({ threshold, rootMargin });
  if (!observerMap.has(key)) {
    observerMap.set(
      key,
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const callback = callbackMap.get(entry.target);
          if (callback) {
            callback(entry);
          }
        });
      }, { threshold, rootMargin })
    );
  }

  return observerMap.get(key)!;
};

export const AnimateOnScroll = ({
  children,
  threshold = 0.1,
  className = "",
  animation = "",
  delay = 0,
  style,
  ...props
}: AnimateOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = getObserver(threshold, '0px');
    const handleIntersection = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && entry.target === element) {
        element.classList.add('aos-visible');
        observer.unobserve(element);
      }
    };

    callbackMap.set(element, handleIntersection);
    observer.observe(element);

    return () => {
      callbackMap.delete(element);
      observer.unobserve(element);
    };
  }, [threshold]);

  const combinedStyle: CSSProperties = {
    ...style,
    ...(delay ? { transitionDelay: `${delay}s` } : {}),
  };

  return (
    <div
      ref={ref}
      className={`${className} ${animation ? animation : ''} aos-hidden`}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
};

// Staggered container for multiple animated children
export const StaggerContainer = ({ children, className = "", ...props }: MotionComponentProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

// Staggered item to be used inside a StaggerContainer
export const StaggerItem = ({ children, className = "", ...props }: MotionComponentProps) => {
  return (
    <div className={className} {...props}>{children}</div>
  );
};

export const MotionLink = ({ href, className = "", children, ...props }: { href: string; className?: string; children: ReactNode; [x: string]: any }) => {
  return (
    <Link href={href} legacyBehavior passHref>
      <a className={className} {...props}>{children}</a>
    </Link>
  );
};

export const SoftHoverCard = ({ children, className = "", ...props }: MotionComponentProps) => {
  return <div className={className} {...props}>{children}</div>;
};

// Section that animates when scrolled into view
export const AnimatedSection = ({
  children,
  threshold = 0.1,
  className = "",
  style,
  ...props
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = getObserver(threshold, '0px');
    const handleIntersection = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && entry.target === element) {
        element.classList.add('animated-visible');
        observer.unobserve(element);
      }
    };

    callbackMap.set(element, handleIntersection);
    observer.observe(element);

    return () => {
      callbackMap.delete(element);
      observer.unobserve(element);
    };
  }, [threshold]);

  return (
    <section ref={ref as any} className={`${className} animated-hidden`} style={style} {...props}>
      {children}
    </section>
  );
};

// Text that animates character by character
export const AnimatedText = ({ text, className = "", ...props }: { text: string; className?: string; [x: string]: any }) => {
  return <span className={className} {...props}>{text}</span>;
};

// Element that reveals its content from left to right
export const RevealText = ({ children, className = "", ...props }: MotionComponentProps) => {
  return <div className={className} {...props}>{children}</div>;
};

// Element that fades in and blurs into view
export const FadeBlurIn = ({ children, className = "", ...props }: MotionComponentProps) => {
  return <div className={className} {...props}>{children}</div>;
};

// Animated gradient text that changes colors
export const AnimatedGradientText = ({ text, className = "", ...props }: { text: string; className?: string; [x: string]: any }) => {
  return <span className={className} {...props}>{text}</span>;
};