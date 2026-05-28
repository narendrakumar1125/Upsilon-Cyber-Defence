'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SlidingTextProps {
  text?: string;
  items?: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  itemClassName?: string;
}

export const SlidingText = ({
  text,
  items,
  direction = 'left',
  speed = 50,
  className = '',
  itemClassName = ''
}: SlidingTextProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // Handle both text and items props
  const itemArray = items || (text ? text.split(' • ') : []);

  // Duplicate items for seamless loop
  const duplicatedItems = [...itemArray, ...itemArray];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === 'left' ? '-50%' : '50%'
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity
        }}
        onAnimationComplete={() => setIsVisible(true)}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className={`inline-block mx-8 ${itemClassName}`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const SlidingLogos = ({
  logos,
  speed = 30,
  className = ''
}: {
  logos: string[];
  speed?: number;
  className?: string;
}) => {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{
          x: '-50%'
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-8 opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            {logo}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
