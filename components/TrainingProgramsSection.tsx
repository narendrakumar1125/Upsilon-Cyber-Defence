'use client';

import { AnimatedParagraph } from '@/components/motion/AnimatedText';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/motion/MotionComponents';
import { ArrowRight, BarChart3, ClipboardCheck, Settings, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const operations = [
  {
    id: 1,
    title: 'Continuous Detection & Response',
    description: 'Consolidated threat telemetry, validated alerts, and disciplined escalation for environments that cannot afford blind spots.',
    icon: BarChart3,
    highlights: ['24/7 monitoring', 'Alert validation', 'Triage automation'],
    progress: '82%',
  },
  {
    id: 2,
    title: 'Cloud & Application Assurance',
    description: 'Secure architecture reviews, identity controls, and configuration validation across the workloads that run the business.',
    icon: ShieldCheck,
    highlights: ['Secure design reviews', 'IAM enforcement', 'Threat surface reduction'],
    progress: '76%',
  },
  {
    id: 3,
    title: 'Governance & Compliance Enablement',
    description: 'Control mapping and evidence workflows aligned with SOC 2, ISO 27001, and regulatory expectations.',
    icon: ClipboardCheck,
    highlights: ['Control mapping', 'Policy validation', 'Evidence automation'],
    progress: '88%',
  },
  {
    id: 4,
    title: 'Resilience Engineering',
    description: 'Incident playbooks, recovery planning, and proactive vulnerability reduction for durable security operations.',
    icon: Settings,
    highlights: ['Incident playbooks', 'Post-breach hardening', 'Resilience metrics'],
    progress: '71%',
  },
];

const TrainingProgramsSection = () => {
  return (
    <section className="premium-section-alt py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fadeInUp">
          <div className="mb-14 max-w-3xl">
            <p className="premium-eyebrow">Security operating model</p>
            <h2 className="premium-heading mt-4">Engagements built for measurable security discipline.</h2>
            <AnimatedParagraph
              text="Upsilon Cyber Defence pairs advisory, engineering, and managed operations so improvements are visible, accountable, and sustainable."
              className="premium-copy mt-5 max-w-2xl"
            />
          </div>
        </AnimateOnScroll>

        <StaggerContainer>
          <div className="grid gap-6 xl:grid-cols-2">
            {operations.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.id}>
                  <div className="premium-card group h-full p-7 transition duration-300 hover:-translate-y-1 hover:border-slate-600">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
                        <Icon className="h-6 w-6 text-sky-300" aria-hidden="true" />
                      </div>
                      <span className="rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Operational
                      </span>
                    </div>
                    <h3 className="mb-4 font-display text-2xl font-bold leading-tight text-white">{item.title}</h3>
                    <p className="mb-6 leading-7 text-slate-400">{item.description}</p>
                    <div className="mb-6">
                      <div className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        <span>Delivery maturity</span>
                        <span>{item.progress}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-gradient-to-r from-sky-300 to-indigo-300" style={{ width: item.progress }} />
                      </div>
                    </div>
                    <div className="mb-6 grid gap-3 sm:grid-cols-3">
                      {item.highlights.map((highlight) => (
                        <div key={highlight} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300">
                          {highlight}
                        </div>
                      ))}
                    </div>
                    <Link href="/services" className="group/link inline-flex items-center gap-2 text-sm font-bold text-sky-300 transition-all duration-300 hover:gap-3 hover:text-white">
                      Learn how we deliver
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default TrainingProgramsSection;
