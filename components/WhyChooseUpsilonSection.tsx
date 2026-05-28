'use client';

import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/motion/MotionComponents';
import { Clock, Database, Scale, ShieldCheck } from 'lucide-react';

const differentiators = [
  {
    id: 1,
    icon: ShieldCheck,
    title: 'Security-led engineering',
    description: 'Controls and response paths are designed into operations instead of bolted on after deployment.',
  },
  {
    id: 2,
    icon: Clock,
    title: 'Operational visibility',
    description: 'Live telemetry, ownership, and response status give security leaders a clear operating picture.',
  },
  {
    id: 3,
    icon: Database,
    title: 'Regulatory readiness',
    description: 'Delivery maps to SOC 2, ISO 27001, and control frameworks your auditors expect.',
  },
  {
    id: 4,
    icon: Scale,
    title: 'Accountability built in',
    description: 'Dedicated delivery ownership and documented outcomes keep security investments measurable.',
  },
  {
    id: 5,
    icon: ShieldCheck,
    title: 'Continuous improvement',
    description: 'Detection tuning, risk reduction, and hardening continue as your environment changes.',
  },
  {
    id: 6,
    icon: Clock,
    title: 'Rapid response assurance',
    description: 'Playbooks, escalation paths, and recovery steps are ready before incidents occur.',
  },
];

const stats = [
  ['120+', 'Enterprise engagements'],
  ['98%', 'SLA compliance'],
  ['30m', 'Average triage time'],
];

const WhyChooseUpsilonSection = () => {
  return (
    <section className="premium-section py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fadeInUp">
          <div className="mb-16 max-w-3xl">
            <p className="premium-eyebrow">Why enterprise teams choose us</p>
            <h2 className="premium-heading mt-4">Security discipline across every engagement.</h2>
            <p className="premium-copy mt-5">
              We combine engineering rigor, operational transparency, and compliance accountability for programs that hold up under pressure.
            </p>
          </div>
        </AnimateOnScroll>

        <StaggerContainer>
          <div className="grid gap-5 lg:grid-cols-3">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.id}>
                  <div className="premium-card h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-600">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
                      <Icon className="h-5 w-5 text-sky-300" aria-hidden="true" />
                    </div>
                    <h3 className="mb-3 font-display text-xl font-bold text-white">{item.title}</h3>
                    <p className="leading-7 text-slate-400">{item.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>

        <AnimateOnScroll animation="fadeInUp" delay={0.25}>
          <div className="mt-12 grid gap-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4 sm:grid-cols-3">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-lg border border-slate-800 bg-slate-900/60 p-5">
                <div className="font-display text-3xl font-bold text-white">{value}</div>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default WhyChooseUpsilonSection;
