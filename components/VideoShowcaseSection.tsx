'use client';

import { motion } from 'framer-motion';
import { AnimatedParagraph, AnimatedText } from './motion/AnimatedText';
import { AnimateOnScroll, SoftHoverCard, StaggerContainer, StaggerItem } from './motion/MotionComponents';

const VideoShowcaseSection = () => {
  return (
    <section className="py-20 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-slate-200/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimateOnScroll animation="fadeInUp" delay={0.05}>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300 mb-3">How It Works</p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
              {/* <AnimatedText
                text="From raw events to intelligence"
                type="words"
                staggerDelay={0.08}
                duration={0.5}
                highlight={true}
              /> */}
              From raw events to intelligence
            </h2>
            <AnimatedParagraph
              text="Intelligent correlation and filtering that turns security noise into actionable insights"
              className="mt-4 text-lg leading-8 text-slate-400 mx-auto max-w-3xl"
            />
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature visualization */}
          <AnimateOnScroll animation="fadeInLeft" delay={0.2}>
            <SoftHoverCard className="relative rounded-[28px] border border-slate-800/50 bg-slate-950/90 p-6 overflow-hidden shadow-[0_28px_80px_rgba(15,23,42,0.4)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),transparent_24%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(15,118,255,0.12),transparent_26%)]" />
              <div className="absolute top-8 left-8 h-24 w-24 rounded-full bg-sky-400/10 blur-3xl" />
              <div className="absolute bottom-8 right-10 h-24 w-24 rounded-full bg-slate-100/5 blur-3xl" />

              <div className="relative overflow-hidden rounded-[24px] border border-slate-800/70 bg-slate-900/95 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.25)]">
                <div className="relative h-[340px] overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-950/95 to-slate-900/90">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),transparent_30%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),transparent_30%)]" />
                  <div className="absolute left-6 top-8 h-2 w-24 rounded-full bg-gradient-to-r from-primary via-sky-400 to-secondary shadow-[0_0_24px_rgba(14,165,233,0.35)]" />
                  <div className="absolute left-6 top-20 h-2 rounded-full w-28 bg-slate-700/80" />
                  <div className="absolute left-6 top-32 h-2 rounded-full w-20 bg-slate-700/60" />
                  <div className="absolute right-8 top-24 h-2 w-16 rounded-full bg-slate-700/70" />
                  <motion.div
                    className="absolute left-6 top-12 h-1.5 w-28 rounded-full bg-gradient-to-r from-primary via-sky-400 to-secondary opacity-80 blur-xl"
                    animate={{ opacity: [0.65, 1, 0.65], x: [0, 6, 0] }}
                    transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
                  />
                  <div className="relative z-10 flex h-full flex-col justify-between p-6">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/60 bg-slate-950/90 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                        Raw events to intelligence
                      </div>
                      <div className="text-white">
                        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Streamlined flow</p>
                        <p className="mt-3 text-3xl font-semibold leading-tight">
                          <AnimatedText
                            text="Data correlation with confidence"
                            type="words"
                            staggerDelay={0.06}
                            duration={0.6}
                          />
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 text-slate-300">
                      {['Sensor ingestion', 'Context enrichment', 'Actionable alerts'].map((step, idx) => (
                        <div key={step} className="rounded-2xl border border-slate-800/60 bg-slate-950/85 px-4 py-3 text-sm">
                          <div className="font-semibold text-white">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SoftHoverCard>
          </AnimateOnScroll>

          {/* Feature list */}
          <AnimateOnScroll animation="fadeInRight" delay={0.2}>
            <StaggerContainer staggerDelay={0.1}>
              <div className="space-y-4">
                {[
                  {
                    title: 'Real-time Processing',
                    description: 'Analyze security events as they occur with sub-second latency',
                    icon: '⚡'
                  },
                  {
                    title: 'Intelligent Filtering',
                    description: 'ML-powered algorithms reduce noise by 85%, surfacing real threats',
                    icon: '🎯'
                  },
                  {
                    title: 'Contextual Analysis',
                    description: 'Correlate events across your infrastructure for complete visibility',
                    icon: '🔍'
                  }
                ].map((item, idx) => (
                  <StaggerItem key={idx}>
                    <SoftHoverCard className="group rounded-[20px] border border-slate-800/40 bg-slate-900/50 backdrop-blur-sm p-6 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl flex-shrink-0">{item.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1 group-hover:text-sky-100 transition-colors">{item.title}</h3>
                          <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{item.description}</p>
                        </div>
                      </div>
                    </SoftHoverCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </AnimateOnScroll>
        </div>

        {/* Key metrics - subtle animation */}
        <AnimateOnScroll animation="fadeInUp" delay={0.4}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: '85%', label: 'Alert Reduction' },
              { value: '2m', label: 'Detection Time' },
              { value: '99.9%', label: 'Uptime' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="rounded-[20px] border border-slate-800/40 bg-slate-900/50 backdrop-blur-sm p-8 text-center hover:border-sky-400/20 hover:bg-slate-900/70 transition-all duration-300"
              >
                <div className="text-3xl font-bold text-sky-300 mb-2">{stat.value}</div>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;
