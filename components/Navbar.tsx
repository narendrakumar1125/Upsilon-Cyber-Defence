'use client';

import { motion } from 'framer-motion';
import { Menu, ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import AuthButton from './AuthButton';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Courses' },
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

const NavbarContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const updateScrollStyles = () => {
      const scrolled = window.scrollY > 36;
      nav.style.backgroundColor = scrolled ? 'rgba(5, 7, 13, 0.86)' : 'transparent';
      nav.style.backdropFilter = scrolled ? 'blur(20px)' : '';
      nav.style.borderBottom = scrolled ? '1px solid rgba(148, 163, 184, 0.12)' : '1px solid transparent';
      nav.style.boxShadow = scrolled ? '0 18px 40px rgba(0, 0, 0, 0.24)' : 'none';
      frameRef.current = null;
    };

    const handleScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(updateScrollStyles);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollStyles();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const prefetchRoutes = () => {
      navLinks.forEach(({ href }) => {
        if (href !== pathname) {
          router.prefetch(href);
        }
      });
    };

    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(prefetchRoutes, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(prefetchRoutes, 1200);
    return () => window.clearTimeout(timeoutId);
  }, [pathname, router]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 z-50 w-full border-b border-transparent transition-all duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Upsilon Cyber Defence home">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-300/25 bg-slate-950 text-sky-200 shadow-lg shadow-sky-950/30">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-white">Upsilon Cyber Defence</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-semibold transition duration-200 ${
                    isActive ? 'text-sky-200' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px w-full origin-left rounded-full bg-gradient-to-r from-sky-300 to-indigo-300 transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              );
            })}
            <AuthButton />
            <Link href="/contact" className="premium-button premium-button-primary min-h-10 px-4 py-2">
              Book demo
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-md border border-slate-700 bg-slate-950/80 p-2 text-slate-200 hover:border-sky-300/40 hover:text-white md:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070d]/96 px-6 backdrop-blur-md md:hidden"
        >
          <button
            onClick={closeMenu}
            className="absolute right-4 top-4 rounded-md border border-slate-700 p-2 text-slate-300 hover:text-white"
            aria-label="Close menu"
          >
            <X size={24} aria-hidden="true" />
          </button>

          <div className="flex w-full max-w-sm flex-col items-center gap-6 py-8">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    className={`font-display text-2xl font-bold transition-colors ${
                      isActive ? 'text-sky-200' : 'text-slate-300 hover:text-white'
                    }`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <div className="mt-2">
              <AuthButton />
            </div>
            <Link href="/contact" className="premium-button premium-button-primary mt-2 px-8" onClick={closeMenu}>
              Book demo
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NavbarContent;
