/**
 * Premium Motion Variants Library
 * SaaS-inspired animation system (Linear, Vercel, Stripe, Framer inspired)
 * GPU-optimized: transform & opacity only
 */

// Professional easing curves (cubic bezier)
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1],      // smooth easeInOutQuad
  enter: [0.16, 1, 0.3, 1],          // spring-like entry
  exit: [0.7, 0, 0.84, 0],           // eased exit
  micro: [0.4, 0, 0.2, 1],           // quick microinteraction
  bounce: [0.68, -0.55, 0.265, 1.55], // bounce back
};

// Timing configurations
export const timing = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
  verySlow: 1,
};

/**
 * ENTRANCE ANIMATIONS
 * Professional reveal effects for page load and scroll
 */
export const entrance = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: timing.normal, ease: easing.smooth } 
    },
  },

  fadeInUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: timing.normal, ease: easing.smooth } 
    },
  },

  fadeInDown: {
    hidden: { opacity: 0, y: -24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: timing.normal, ease: easing.smooth } 
    },
  },

  fadeInLeft: {
    hidden: { opacity: 0, x: -32 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: timing.normal, ease: easing.smooth } 
    },
  },

  fadeInRight: {
    hidden: { opacity: 0, x: 32 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: timing.normal, ease: easing.smooth } 
    },
  },

  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: timing.normal, ease: easing.smooth } 
    },
  },

  blurIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: timing.slow, ease: easing.smooth } 
    },
  },
};

/**
 * STAGGER ANIMATIONS
 * For lists, grids, and sequential reveals
 */
export const stagger = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  },

  item: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: timing.normal, ease: easing.smooth },
    },
  },

  itemScale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: timing.normal, ease: easing.smooth },
    },
  },
};

/**
 * HOVER INTERACTIONS
 * Smooth microinteractions for premium feel
 */
export const hover = {
  lift: {
    whileHover: { y: -4, transition: { duration: timing.fast, ease: easing.micro } },
    whileTap: { y: -2, transition: { duration: timing.fast } },
  },

  glow: {
    whileHover: { 
      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)',
      transition: { duration: timing.fast, ease: easing.micro } 
    },
  },

  scale: {
    whileHover: { scale: 1.02, transition: { duration: timing.fast, ease: easing.micro } },
    whileTap: { scale: 0.98, transition: { duration: timing.fast } },
  },

  rotate: {
    whileHover: { rotate: 2, transition: { duration: timing.fast, ease: easing.micro } },
  },
};

/**
 * SCROLL-TRIGGERED ANIMATIONS
 * For reveal-on-scroll effects (use with IntersectionObserver)
 */
export const scrollReveal = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: timing.normal, ease: easing.smooth } 
    },
  },

  fadeUpSlow: {
    hidden: { opacity: 0, y: 48 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: timing.slow, ease: easing.smooth } 
    },
  },

  fadeLeft: {
    hidden: { opacity: 0, x: -48 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: timing.normal, ease: easing.smooth } 
    },
  },

  fadeRight: {
    hidden: { opacity: 0, x: 48 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: timing.normal, ease: easing.smooth } 
    },
  },
};

/**
 * PAGE TRANSITIONS
 * For Next.js route changes
 */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { duration: timing.normal, ease: easing.smooth } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: timing.fast, ease: easing.exit } 
  },
};

/**
 * TEXT ANIMATIONS
 * For hero titles and headlines
 */
export const textAnimation = {
  // Heading reveal with staggered words/chars
  revealLine: {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: timing.slow, ease: easing.smooth } 
    },
  },

  // Gradient text animation
  gradientShift: {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%'],
      transition: { duration: 3, ease: 'linear', repeat: Infinity, repeatType: 'reverse' as const },
    },
  },
};

/**
 * CONTAINER ANIMATIONS
 * Background, borders, and container effects
 */
export const container = {
  glassHover: {
    whileHover: { 
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      transition: { duration: timing.fast, ease: easing.micro } 
    },
  },

  borderGlow: {
    whileHover: {
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)',
      transition: { duration: timing.fast, ease: easing.micro },
    },
  },
};

/**
 * BUTTON ANIMATIONS
 * CTA and action button states
 */
export const button = {
  primary: {
    whileHover: { 
      scale: 1.04,
      boxShadow: '0 12px 40px rgba(59, 130, 246, 0.25)',
      transition: { duration: timing.fast, ease: easing.micro } 
    },
    whileTap: { 
      scale: 0.96, 
      transition: { duration: timing.fast } 
    },
  },

  secondary: {
    whileHover: { 
      borderColor: 'rgba(59, 130, 246, 0.6)',
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
      transition: { duration: timing.fast, ease: easing.micro } 
    },
    whileTap: { scale: 0.98 },
  },

  ghost: {
    whileHover: { 
      color: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      transition: { duration: timing.fast, ease: easing.micro } 
    },
  },
};

/**
 * COMPLEX SEQUENCES
 * Multi-step animations for advanced interactions
 */
export const sequence = {
  // Hero section main sequence
  heroSequence: (delayOffset = 0) => ({
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12,
          delayChildren: delayOffset,
        },
      },
    },
    badge: {
      hidden: { opacity: 0, scale: 0.8, y: 12 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        transition: { duration: timing.normal, ease: easing.enter } 
      },
    },
    heading: {
      hidden: { opacity: 0, y: 32 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: timing.slow, ease: easing.smooth } 
      },
    },
    description: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: timing.normal, ease: easing.smooth } 
      },
    },
    cta: {
      hidden: { opacity: 0, y: 24 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: timing.normal, ease: easing.smooth } 
      },
    },
  }),

  // Stats counter animation
  statCounter: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: timing.normal, ease: easing.bounce } 
    },
  },
};

export default {
  easing,
  timing,
  entrance,
  stagger,
  hover,
  scrollReveal,
  pageTransition,
  textAnimation,
  container,
  button,
  sequence,
};
