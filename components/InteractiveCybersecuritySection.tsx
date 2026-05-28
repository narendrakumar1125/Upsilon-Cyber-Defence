'use client';

import { motion } from 'framer-motion';

const securityNodes = [
  { left: '14%', top: '18%', size: 18, delay: 0 },
  { left: '70%', top: '14%', size: 20, delay: 0.3 },
  { left: '62%', top: '62%', size: 16, delay: 0.6 },
  { left: '26%', top: '68%', size: 22, delay: 0.45 },
  { left: '48%', top: '46%', size: 24, delay: 0.2 },
];

// Main Component
const InteractiveCybersecuritySection = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-[#030712] text-white overflow-hidden">
      {/* Subtle animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.3) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center min-h-[600px]">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Glassmorphism container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-white/3 rounded-3xl backdrop-blur-sm border border-white/10" />
              <div className="relative p-8 lg:p-10">
                <motion.div
                  className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/8 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-300 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Interactive Security
                </motion.div>

                <motion.h2
                  className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Advanced threat detection in real-time
                </motion.h2>

                <motion.p
                  className="text-lg leading-8 text-slate-300 mb-8 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Experience our cutting-edge cybersecurity platform with interactive 3D visualization. Monitor threats, analyze patterns, and respond instantly with AI-powered intelligence.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 px-8 py-4 text-sm font-semibold text-slate-900 transition-all duration-300 hover:from-cyan-400 hover:to-cyan-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Security Assessment
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Scene */}
          <motion.div
            className="relative w-full h-full min-h-[500px] lg:min-h-[600px] rounded-3xl overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* Scene container with subtle border */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-cyan-400/3 rounded-3xl border border-cyan-500/20" />

            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {securityNodes.map((node, index) => (
                <motion.div
                  key={index}
                  className="absolute rounded-full bg-cyan-400/20"
                  style={{ left: node.left, top: node.top, width: node.size, height: node.size, boxShadow: `0 0 ${node.size / 2}px rgba(56, 189, 248, 0.35)` }}
                  animate={{ y: [0, -10, 0], opacity: [0.45, 0.85, 0.45] }}
                  transition={{ delay: node.delay, duration: 7 + index * 0.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="interactiveLines" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.15" />
                  </linearGradient>
                </defs>
                <line x1="80" y1="72" x2="140" y2="96" stroke="url(#interactiveLines)" strokeWidth="1" opacity="0.6" />
                <line x1="140" y1="96" x2="310" y2="100" stroke="url(#interactiveLines)" strokeWidth="1" opacity="0.5" />
                <line x1="290" y1="130" x2="330" y2="180" stroke="url(#interactiveLines)" strokeWidth="1" opacity="0.45" />
                <line x1="70" y1="250" x2="220" y2="230" stroke="url(#interactiveLines)" strokeWidth="1" opacity="0.4" />
                <circle cx="85" cy="70" r="3" fill="#38bdf8" />
                <circle cx="280" cy="120" r="3" fill="#0ea5e9" />
                <circle cx="330" cy="180" r="3" fill="#38bdf8" />
                <circle cx="220" cy="230" r="3" fill="#0ea5e9" />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-24 h-24 rounded-full border border-cyan-400/30 bg-cyan-500/10 shadow-[0_0_100px_rgba(56,189,248,0.18)]">
                  <div className="absolute inset-0 rounded-full border border-cyan-400/20" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCybersecuritySection;