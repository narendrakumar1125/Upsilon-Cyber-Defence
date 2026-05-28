'use client';

import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function AuthButton() {
  const { user, signOut, isAdmin } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <Link href="/login" legacyBehavior passHref>
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          style={{ willChange: 'transform, opacity' }}
          className="rounded-md border border-sky-300/25 bg-slate-950/80 px-4 py-2 text-sm font-semibold text-sky-100 shadow-lg shadow-sky-950/20 transition-all duration-300 hover:border-sky-300/45 hover:bg-slate-900 hover:text-white"
        >
          Login
        </motion.a>
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 bg-dark-200 hover:bg-dark-300 py-2 px-3 rounded-md transition-colors"
      >
        <span className="text-sm font-medium text-light">{user.displayName || user.email?.split('@')[0]}</span>
        <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-dark-200 rounded-md shadow-lg overflow-hidden z-50 border border-dark-300">
          <div className="py-1">
            {isAdmin && (
              <Link
                href="/client-admin"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-dark-300 hover:text-light"
                onClick={() => setDropdownOpen(false)}
              >
                <Settings size={16} />
                <span>Admin Dashboard</span>
              </Link>
            )}
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-dark-300 hover:text-light"
              onClick={() => setDropdownOpen(false)}
            >
              <User size={16} />
              <span>Profile</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-300 hover:text-light"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
