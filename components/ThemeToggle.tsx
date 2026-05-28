'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

const ThemeToggle = ({ className = '', size = 18 }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <button
      onClick={toggleTheme}
      className={`relative overflow-hidden p-2 rounded-full focus:outline-none transition-colors ${
        theme === 'dark'
          ? 'bg-primary/20 text-primary hover:bg-primary/30'
          : 'bg-primary/10 text-primary hover:bg-primary/20'
      } ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        animate={{ rotate: theme === 'dark' ? 0 : 360 }}
        transition={{ duration: 0.7, ease: 'anticipate' }}
        className={`${size > 18 ? 'w-6 h-6' : 'w-5 h-5'} flex items-center justify-center`}
      >
        {theme === 'dark' ? <Sun size={size} /> : <Moon size={size} />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;