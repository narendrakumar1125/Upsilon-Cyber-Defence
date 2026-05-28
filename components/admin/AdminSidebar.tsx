'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Home, 
  BookOpen, 
  Shield, 
  FileText, 
  Users, 
  Settings, 
  Menu, 
  X, 
  LogOut 
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: Home,
      exact: true
    },
    { 
      name: 'Courses', 
      href: '/admin/courses', 
      icon: BookOpen 
    },
    { 
      name: 'Services', 
      href: '/admin/services', 
      icon: Shield 
    },
    { 
      name: 'Resources', 
      href: '/admin/resources', 
      icon: FileText 
    },
    { 
      name: 'Users', 
      href: '/admin/users', 
      icon: Users 
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: Settings 
    },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-dark-200 rounded-md text-gray-400 hover:text-light hover:bg-dark-300 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - desktop always visible, mobile as overlay */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-dark-200 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-dark-300">
            <Link href="/" className="flex items-center">
              <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-lg border border-sky-300/30 bg-[radial-gradient(circle_at_30%_20%,rgba(59,232,176,0.24),transparent_38%),linear-gradient(135deg,#0f172a,#0b1220)] text-sky-100 shadow-lg shadow-sky-950/30">
                <span className="font-display text-lg font-bold">U</span>
              </div>
              <span className="text-xl font-bold text-light">Admin</span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 py-6 px-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                      isActive(item.href, item.exact)
                        ? 'bg-primary/20 text-primary'
                        : 'text-gray-400 hover:bg-dark-300 hover:text-light'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-dark-300">
            <button
              onClick={() => {
                signOut();
                window.location.href = '/';
              }}
              className="flex items-center w-full px-4 py-3 rounded-md text-gray-400 hover:bg-dark-300 hover:text-light transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-dark/70 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
