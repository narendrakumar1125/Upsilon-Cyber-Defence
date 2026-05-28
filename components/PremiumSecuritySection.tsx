'use client';

import { motion } from 'framer-motion';

const SecurityVisualization = () => (
  <div className="relative aspect-[4/3] min-h-[520px] rounded-[32px] border border-cyan-500/15 bg-slate-950/90 overflow-hidden shadow-[0_30px_90px_rgba(7,22,39,0.45)]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent 22%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent 24%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(255,255,255,0.08),transparent 20%),radial-gradient(circle_at_70%_60%,rgba(56,189,248,0.08),transparent 18%)]" />

    <motion.div
      className="absolute left-10 top-16 w-24 h-24 rounded-full bg-cyan-500/20 blur-3xl"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute right-10 bottom-20 w-28 h-28 rounded-full bg-cyan-400/20 blur-3xl"
      animate={{ scale: [1, 0.95, 1] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    />

    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400" preserveAspectRatio="none">
      <defs>
        <linearGradient id="premiumGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <circle cx="90" cy="80" r="48" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.22" />
      <circle cx="380" cy="110" r="40" stroke="#0ea5e9" strokeWidth="1.5" fill="none" opacity="0.18" />
      <circle cx="250" cy="280" r="60" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.16" />
      <path d="M 70 200 C 120 180 200 240 270 220" stroke="url(#premiumGlow)" strokeWidth="1.2" fill="none" opacity="0.55" />
      <path d="M 150 90 L 220 130 L 310 100" stroke="url(#premiumGlow)" strokeWidth="1.2" fill="none" opacity="0.4" />
      <circle cx="140" cy="58" r="4" fill="#38bdf8" />
      <circle cx="320" cy="182" r="4" fill="#0ea5e9" />
      <circle cx="215" cy="310" r="4" fill="#38bdf8" />
      <circle cx="72" cy="260" r="3" fill="#38bdf8" opacity="0.8" />
      <circle cx="450" cy="320" r="3" fill="#0ea5e9" opacity="0.7" />
    </svg>

    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative flex items-center justify-center w-28 h-28 rounded-full border border-cyan-400/40 bg-cyan-500/10 shadow-[0_0_100px_rgba(56,189,248,0.18)]">
        <div className="absolute inset-0 rounded-full border border-cyan-400/30" />
      </div>
    </div>
  </div>
);

const PremiumSecuritySection = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-[#030712] text-white overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
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
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/2 rounded-3xl backdrop-blur-sm border border-white/10" />
              <div className="relative p-8 lg:p-10">
                <motion.div
                  className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-300 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Enterprise Security
                </motion.div>

                <motion.h2
                  className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Advanced threat protection for modern enterprises
                </motion.h2>

                <motion.p
                  className="text-lg leading-8 text-slate-300 mb-8 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Comprehensive cybersecurity solutions that protect your critical infrastructure with AI-powered detection, automated response, and expert oversight.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 px-8 py-4 text-sm font-semibold text-slate-900 transition-all duration-300 hover:from-cyan-400 hover:to-cyan-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
                  >
                    Schedule Security Assessment
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <SecurityVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSecuritySection;