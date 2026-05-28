'use client';

import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  type?: 'words' | 'lines' | 'chars';
  staggerDelay?: number;
  duration?: number;
  className?: string;
  highlight?: boolean;
  parallax?: boolean;
  [key: string]: any;
}

type SplitTextInstance = {
  words?: HTMLElement[];
  lines?: HTMLElement[];
  chars?: HTMLElement[];
  revert: () => void;
};

type SplitTypeConstructor = new (
  target: HTMLElement,
  options: { types: string; tagName: string }
) => SplitTextInstance;

export const AnimatedText = ({
  text,
  type = 'words',
  staggerDelay = 0.05,
  duration = 0.6,
  className = '',
  highlight = false,
  parallax = false,
  ...props
}: AnimatedTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const controls = useAnimation();
  const isInView = useInView(textRef, { once: true, margin: '-100px' });
  const [splitText, setSplitText] = useState<SplitTextInstance | null>(null);
  const splitTextRef = useRef<SplitTextInstance | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -20]);

  useEffect(() => {
    if (!textRef.current || splitTextRef.current || prefersReducedMotion) return;

    let isMounted = true;

    import('split-type').then((SplitTypeModule) => {
      if (!isMounted || !textRef.current) return;
      const SplitType = (SplitTypeModule.default || SplitTypeModule) as SplitTypeConstructor;
      const split = new SplitType(textRef.current, {
        types: type === 'words' ? 'words' : type === 'lines' ? 'lines' : 'chars',
        tagName: 'span'
      });
      splitTextRef.current = split;
      setSplitText(split);
    }).catch(() => {
      // Silent fail for unsupported environments or import issues
    });

    return () => {
      isMounted = false;
      if (splitTextRef.current) {
        splitTextRef.current.revert();
        splitTextRef.current = null;
      }
    };
  }, [text, type, prefersReducedMotion]);

  useEffect(() => {
    if (isInView && splitText && !prefersReducedMotion) {
      controls.start('visible');
    }
  }, [isInView, controls, splitText, prefersReducedMotion]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 20,
      scale: prefersReducedMotion ? 1 : 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // If reduced motion is preferred, render static text
  if (prefersReducedMotion) {
    return (
      <span className={`inline-block ${className}`} {...props}>
        {text}
      </span>
    );
  }

  return (
    <motion.span
      ref={textRef}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      style={{
        willChange: 'transform, opacity',
        ...(parallax && { y })
      }}
      {...props}
    >
      {splitText ? (
        splitText[type]?.map((item: HTMLElement, index: number) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className={`inline-block ${highlight ? 'relative' : ''}`}
          >
            {item.textContent}
            {highlight && index === 0 && (
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-sm -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
              />
            )}
          </motion.span>
        ))
      ) : (
        text
      )}
    </motion.span>
  );
};

export const AnimatedParagraph = ({
  text,
  className = '',
  ...props
}: {
  text: string;
  className?: string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
        }
      }}
      style={{ willChange: 'transform, opacity' }}
      {...props}
    >
      {text}
    </motion.p>
  );
};
