'use client';

import { AnimateOnScroll } from '@/components/motion/MotionComponents';
import { motion } from 'framer-motion';

const stats = [
  {
    value: '99.9%',
    label: 'Uptime SLA',
    description: 'Guaranteed availability'
  },
  {
    value: '2.3s',
    label: 'Average Response Time',
    description: 'From alert to action'
  },
  {
    value: '85%',
    label: 'Alert Reduction',
    description: 'Noise eliminated'
  },
  {
    value: '24/7',
    label: 'Monitoring',
    description: 'Round-the-clock coverage'
  }
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-slate-200/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimateOnScroll animation="fadeInUp">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300 mb-3">Performance Metrics</p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              {/* <AnimatedText
                text="Upsilon Cyber Defence by the Numbers"
                type="words"
                staggerDelay={0.08}
                duration={0.7}
              /> */}
              Upsilon Cyber Defence by the Numbers
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400 mx-auto max-w-3xl">
              Last 90 days performance demonstrating our commitment to excellence.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimateOnScroll key={index} animation="scaleUp" delay={index * 0.1}>
              <motion.div
                className="text-center p-8 rounded-[24px] border border-slate-800/50 bg-slate-900/50 backdrop-blur-sm hover:border-sky-400/20 transition-all duration-300"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-4xl sm:text-5xl font-bold text-sky-300 mb-2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-slate-400">{stat.description}</div>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Additional metrics */}
        <AnimateOnScroll animation="fadeInUp" delay={0.8}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-[20px] border border-slate-800/40 bg-slate-900/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-sky-300 mb-2">45.6K</div>
              <div className="text-sm text-slate-400">Cases Investigated</div>
              <div className="text-xs text-slate-500 mt-1">90% in under 5 minutes</div>
            </div>
            <div className="p-6 rounded-[20px] border border-slate-800/40 bg-slate-900/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-sky-400 mb-2">97.8%</div>
              <div className="text-sm text-slate-400">Handled by AI</div>
              <div className="text-xs text-slate-500 mt-1">Quality-assured automation</div>
            </div>
            <div className="p-6 rounded-[20px] border border-slate-800/40 bg-slate-900/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-400 mb-2">14.9K</div>
              <div className="text-sm text-slate-400">Hours Saved</div>
              <div className="text-xs text-slate-500 mt-1">Focus on critical threats</div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default StatsSection;