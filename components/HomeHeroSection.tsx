'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { ThreatOperationsGraphic } from './SecurityStorySections';

const proofPoints = [
  'Validated alerts before escalation',
  'Cloud, identity, and endpoint context',
  'Incident playbooks with executive reporting',
  'Compliance evidence tied to controls',
];

const metrics = [
  ['30m', 'average triage window'],
  ['24/7', 'monitoring coverage'],
  ['87%', 'control coverage mapped'],
];

const HomeHeroSection = () => {
  return (
    <section className="premium-section-alt relative pt-28 sm:pt-32 lg:min-h-screen lg:pt-24">
      <div className="premium-grid-bg absolute inset-0 opacity-80" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#080b12] to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 sm:px-6 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-slate-300 shadow-xl shadow-black/20">
            <ShieldAlert className="h-3.5 w-3.5 text-sky-200" aria-hidden="true" />
            Managed cyber resilience for cloud-first teams
          </div>

          <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Security operations that turn threat noise into action.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Upsilon Cyber Defence helps enterprise teams detect real threats, correlate telemetry, contain incidents, and strengthen cloud posture without adding another noisy dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="premium-button premium-button-primary">
              Book a security consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/services" className="premium-button premium-button-secondary">
              Explore services
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {proofPoints.map((point) => (
              <div key={point} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-sky-200" aria-hidden="true" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {metrics.map(([value, label]) => (
              <div key={label} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                <div className="font-display text-2xl font-bold text-white">{value}</div>
                <div className="mt-1 text-xs leading-5 text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pt-20"
        >
          <ThreatOperationsGraphic />
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
