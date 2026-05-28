// Animation variants for Framer Motion components

const smooth = {
  duration: 0.68,
  ease: [0.25, 0.1, 0.25, 1]
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { ...smooth }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...smooth }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...smooth }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...smooth }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...smooth }
  }
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...smooth }
  }
};

// Staggered children animation (parent)
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Child animation for staggered container
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Flip card animation
export const flipCard = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const cardHover = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const buttonTap = {
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.12, ease: 'easeOut' }
  }
};

// Pulse animation for attention
export const pulse = {
  hidden: { opacity: 0, scale: 1 },
  visible: {
    opacity: 1,
    scale: [1, 1.02, 1],
    transition: {
      duration: 3.5,
      ease: 'easeInOut',
      times: [0, 0.5, 1],
      repeat: Infinity,
      repeatDelay: 1.2
    }
  }
};

// Text wave animation for characters
export const textWave = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      delay,
      staggerChildren: 0.032,
      delayChildren: 0.12 + delay,
    },
  }),
};

// Character animation for text wave
export const characterAnimation = {
  hidden: {
    opacity: 0,
    y: 18,
    rotateX: 90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.42,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Container animation for scroll view
export const scrollViewContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
      when: "beforeChildren",
    }
  }
};

// Scroll view variants for intersection observer
export const scrollView = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.68,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.28, ease: 'easeInOut' }
  }
};

// Sliding from left with smooth motion
export const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.72, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// Sliding from right with smooth motion
export const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.72, ease: [0.25, 0.1, 0.25, 1] }
  }
};