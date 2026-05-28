'use client';

import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/motion/MotionComponents';
import { AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const engagements = [
  {
    id: 1,
    title: 'Strategic Security Reviews',
    description: 'Executive-level security reviews that uncover control gaps and align your program with current threat and regulatory demands.',
    icon: <ShieldCheck className="h-12 w-12 text-sky-300" />,
    details: ['Program maturity assessment', 'Executive advisory', 'Actionable remediation plan'],
    gradient: 'from-sky-500/10 to-sky-400/10'
  },
  {
    id: 2,
    title: 'Response & Recovery Operations',
    description: 'Rapid incident orchestration with forensic investigation, containment, and post-incident control hardening.',
    icon: <AlertTriangle className="h-12 w-12 text-sky-300" />,
    details: ['Playbook-driven response', 'Forensic analysis', 'Root cause mitigation'],
    gradient: 'from-sky-500/10 to-sky-400/10'
  }
];

const upcomingCapabilities = [
  'Zero Trust Architecture',
  'Supply Chain Security',
  'Identity & Access Governance',
  'Cloud Threat Detection',
  'Incident Playbook Design',
  'Data Protection Controls'
];

const WorkshopsAndSeminarsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-slate-200/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimateOnScroll animation="fadeInUp">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300 mb-3">Specialist engagements</p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              Focused security engagements for critical decision points
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400 mx-auto max-w-2xl">
              Designed to provide clarity, control, and confidence during architecture reviews, incidents, and compliance transitions.
            </p>
          </div>
        </AnimateOnScroll>

        <StaggerContainer>
          <div className="grid gap-6 lg:grid-cols-2 mb-16">
            {engagements.map((engagement, index) => (
              <StaggerItem key={engagement.id}>
                <div className="group relative rounded-[32px] border border-slate-800/50 bg-slate-950/90 backdrop-blur-sm p-8 shadow-[0_18px_50px_rgba(15,23,42,0.25)] hover:shadow-[0_28px_70px_rgba(15,23,42,0.35)] hover:border-slate-600/40 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-slate-900/95 to-slate-900/60 group-hover:from-sky-500/6 group-hover:to-sky-400/6 transition-all duration-300" />

                  <div className="relative z-10">
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${engagement.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      {engagement.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-sky-100 transition-colors duration-300">{engagement.title}</h3>
                    <p className="text-slate-400 leading-7 mb-6 group-hover:text-slate-300 transition-colors duration-300">{engagement.description}</p>
                    <div className="space-y-3 mb-6">
                      {engagement.details.map((detail, idx) => (
                        <AnimateOnScroll key={detail} animation="fadeInRight" delay={idx * 0.1}>
                          <div className="flex items-start gap-3 text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                            <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-400" />
                            <span>{detail}</span>
                          </div>
                        </AnimateOnScroll>
                      ))}
                    </div>
                    <Link href="/contact" className="group/link inline-flex items-center gap-2 text-sky-300 font-semibold transition-all duration-300 hover:text-white hover:gap-3">
                      Request engagement scope
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <AnimateOnScroll animation="fadeInUp" delay={0.3}>
          <div className="rounded-[32px] border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm p-10 shadow-[0_20px_60px_rgba(15,23,42,0.3)]">
            <h3 className="text-3xl font-semibold text-white mb-4">Capability focus areas</h3>
            <StaggerContainer delay={0.1}>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingCapabilities.map((capability, index) => (
                  <StaggerItem key={capability}>
                    <div className="group rounded-3xl border border-slate-800/50 bg-gradient-to-r from-slate-950/80 to-slate-900/55 backdrop-blur-sm p-6 min-h-[110px] text-slate-300 hover:border-slate-600/40 hover:text-white hover:shadow-lg hover:shadow-sky-400/10 transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:-translate-y-1">
                      <span className="group-hover:text-sky-100 text-base font-medium transition-colors duration-300">{capability}</span>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default WorkshopsAndSeminarsSection;
