'use client';

import { AnimatedParagraph } from '@/components/motion/AnimatedText';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/motion/MotionComponents';
import { AlertTriangle, ArrowRight, Lock, Shield, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 1,
    title: 'Security Strategy & Risk Engineering',
    description: 'Unify fragmented controls into a security roadmap tied to infrastructure, threat exposure, and regulatory obligations.',
    icon: ShieldCheck,
    highlights: ['Roadmap alignment', 'Control prioritization', 'Threat modeling'],
  },
  {
    id: 2,
    title: 'Managed Detection & Response',
    description: 'Monitor critical systems with validated alerts, escalation workflows, and response context that reduces analyst noise.',
    icon: Shield,
    highlights: ['Continuous detection', 'Alert validation', 'Triage response'],
  },
  {
    id: 3,
    title: 'Incident Response Orchestration',
    description: 'Move from informal remediation to structured containment, investigation, recovery, and post-incident hardening.',
    icon: AlertTriangle,
    highlights: ['Rapid containment', 'Root cause analysis', 'Recovery planning'],
  },
  {
    id: 4,
    title: 'Cloud & Application Hardening',
    description: 'Reduce attack surface with secure architecture reviews, IAM discipline, and continuous configuration validation.',
    icon: Lock,
    highlights: ['Secure architecture', 'IAM enforcement', 'Policy validation'],
  },
];

const ServicesHighlightSection = () => {
  return (
    <section id="services" className="premium-section py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fadeInUp">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-end">
            <div>
              <p className="premium-eyebrow">Core capabilities</p>
              <h2 className="premium-heading mt-4">Security services designed around operational outcomes.</h2>
            </div>
            <AnimatedParagraph
              text="Each engagement maps to a concrete operating problem: alert fatigue, cloud drift, slow containment, weak controls, or missing security expertise."
              className="premium-copy max-w-2xl lg:justify-self-end"
            />
          </div>
        </AnimateOnScroll>

        <StaggerContainer>
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <StaggerItem key={service.id}>
                  <div className="premium-card group relative h-full overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:border-slate-600">
                    <div className="absolute right-6 top-6 font-display text-5xl font-bold text-slate-800/60">0{index + 1}</div>
                    <div className="relative z-10">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
                        <Icon className="h-6 w-6 text-sky-300" aria-hidden="true" />
                      </div>
                      <h3 className="mb-3 font-display text-2xl font-bold leading-tight text-white">{service.title}</h3>
                      <p className="mb-5 leading-7 text-slate-400">{service.description}</p>
                      <div className="mb-6 grid gap-3 sm:grid-cols-3">
                        {service.highlights.map((highlight) => (
                          <div key={highlight} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300">
                            {highlight}
                          </div>
                        ))}
                      </div>
                      <Link href="/services" className="group/link inline-flex items-center gap-2 text-sm font-bold text-sky-300 transition-all duration-300 hover:gap-3 hover:text-white">
                        Learn more
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>

        <AnimateOnScroll animation="fadeInUp" delay={0.25}>
          <div className="mt-12 flex flex-col gap-5 border-t border-slate-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-slate-400">Disciplined security execution across operations, cloud, identity, and compliance.</p>
            <Link href="/contact" className="premium-button premium-button-primary">
              Schedule consultation
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default ServicesHighlightSection;
