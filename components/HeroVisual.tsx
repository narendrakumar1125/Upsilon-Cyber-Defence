'use client';

import { motion } from 'framer-motion';

const visualNodes = [
  { left: '15%', top: '24%', size: 22, color: 'rgba(56,189,248,0.9)', delay: 0 },
  { left: '72%', top: '18%', size: 18, color: 'rgba(14,165,233,0.8)', delay: 0.4 },
  { left: '64%', top: '64%', size: 16, color: 'rgba(56,189,248,0.75)', delay: 0.2 },
  { left: '28%', top: '72%', size: 20, color: 'rgba(56,189,248,0.7)', delay: 0.6 },
];

const HeroVisual = () => {
  return (
    <div className="hidden lg:block relative h-[560px] w-full rounded-[36px] border border-slate-800/50 bg-slate-950/90 shadow-[0_36px_90px_rgba(15,23,42,0.35)] overflow-hidden">
      <div className="absolute inset-0 bg-[#02060f]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.14),transparent 14%),radial-gradient(circle_at_80%_25%,rgba(14,165,233,0.12),transparent 18%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-1/2 w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10 shadow-[0_0_120px_rgba(56,189,248,0.18)]"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />

        {visualNodes.map((node, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{ left: node.left, top: node.top, width: node.size, height: node.size, backgroundColor: node.color, boxShadow: `0 0 ${node.size / 2}px ${node.color}` }}
            initial={{ opacity: 0.2, y: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -16, 0] }}
            transition={{ delay: node.delay, duration: 6 + index * 0.7, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 560" preserveAspectRatio="none">
          <defs>
            <linearGradient id="heroLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <line x1="12%" y1="18%" x2="32%" y2="28%" stroke="url(#heroLine)" strokeWidth="1" opacity="0.7" />
          <line x1="30%" y1="25%" x2="50%" y2="20%" stroke="url(#heroLine)" strokeWidth="1" opacity="0.5" />
          <line x1="58%" y1="20%" x2="70%" y2="32%" stroke="url(#heroLine)" strokeWidth="1" opacity="0.55" />
          <line x1="62%" y1="58%" x2="78%" y2="64%" stroke="url(#heroLine)" strokeWidth="1" opacity="0.4" />
          <line x1="18%" y1="72%" x2="38%" y2="64%" stroke="url(#heroLine)" strokeWidth="1" opacity="0.35" />
          <circle cx="50%" cy="50%" r="192" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.08" />
          <circle cx="50%" cy="50%" r="126" stroke="#38bdf8" strokeWidth="1" fill="none" opacity="0.06" />
          <circle cx="50%" cy="50%" r="76" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.08" />
        </svg>
      </div>

      <div className="absolute top-6 left-6 text-sky-400 font-mono text-sm opacity-70">
        <div className="animate-pulse">SECURE • MONITOR • DEFEND</div>
      </div>

      <div className="absolute bottom-6 left-6 space-y-2">
        <div className="flex items-center space-x-2 text-xs text-sky-400 font-mono">
          <div className="w-2 h-2 bg-sky-300 rounded-full animate-pulse"></div>
          <span>SYSTEMS ONLINE</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-sky-400 font-mono">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <span>THREAT DETECTION ACTIVE</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-sky-400 font-mono">
          <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <span>NETWORK SECURE</span>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
