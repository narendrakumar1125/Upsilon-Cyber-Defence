'use client';

import {
  AlertTriangle,
  Bug,
  Cloud,
  Crosshair,
  Eye,
  FileSearch,
  Radar,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

type ShowcaseItem = {
  title: string;
  description: string;
  metric: string;
  Icon: LucideIcon;
};

const showcaseItems: ShowcaseItem[] = [
  {
    title: 'Penetration Testing',
    description: 'Manual exploitation paths, business-impact validation, and remediation clarity.',
    metric: 'Exploit-led',
    Icon: Crosshair,
  },
  {
    title: 'SOC Monitoring',
    description: 'Validated alerts, escalation workflows, and monitored asset visibility.',
    metric: '24/7',
    Icon: Radar,
  },
  {
    title: 'Cloud Security',
    description: 'Posture reviews across IAM, workloads, network exposure, and data controls.',
    metric: 'Cloud-first',
    Icon: Cloud,
  },
  {
    title: 'Vulnerability Assessment',
    description: 'Risk-ranked findings with ownership, exploitability, and remediation sequencing.',
    metric: 'Prioritized',
    Icon: Bug,
  },
  {
    title: 'Incident Response',
    description: 'Containment, investigation, recovery, and post-incident hardening support.',
    metric: 'Response-ready',
    Icon: AlertTriangle,
  },
  {
    title: 'Security Auditing',
    description: 'Control evidence, policy validation, and audit-aligned security reporting.',
    metric: 'Evidence-backed',
    Icon: FileSearch,
  },
  {
    title: 'Red Teaming',
    description: 'Adversary simulation that tests detection, response, and executive readiness.',
    metric: 'Adversarial',
    Icon: ShieldCheck,
  },
  {
    title: 'Threat Intelligence',
    description: 'Context-rich intelligence to connect signals, threat actors, and likely targets.',
    metric: 'Actionable',
    Icon: Eye,
  },
];

const scrollingItems = [...showcaseItems, ...showcaseItems];

const AutoScrollingShowcaseSection = () => {
  return (
    <section className="premium-section-alt py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="premium-eyebrow">Security capability showcase</p>
          <h2 className="premium-heading mt-4">Specialized services for the threats that matter most.</h2>
          <p className="premium-copy mt-5">
            A continuous view of the workstreams Upsilon Cyber Defence can run across offensive testing, monitoring, response, cloud posture, and executive risk assurance.
          </p>
        </div>
      </div>

      <div className="showcase-viewport relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#05070d] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#05070d] to-transparent sm:w-32" />

        <div
          className="showcase-marquee flex w-max gap-5 px-4 pb-2 sm:px-6 lg:px-8"
          aria-label="Cybersecurity services carousel"
        >
          {scrollingItems.map(({ title, description, metric, Icon }, index) => (
            <article
              key={`${title}-${index}`}
              className="premium-card group h-[260px] w-[280px] flex-none p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-300/40 focus-within:-translate-y-1 focus-within:border-sky-300/40 sm:w-[340px]"
            >
              <button
                type="button"
                className="flex h-full w-full cursor-default flex-col text-left focus:outline-none"
                aria-label={`${title}: ${description}`}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 transition duration-300 group-hover:border-sky-300/40">
                    <Icon className="h-5 w-5 text-sky-300" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {metric}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold leading-tight text-white">{title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-400">{description}</p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-sky-300/0 via-sky-300/35 to-indigo-300/0 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutoScrollingShowcaseSection;
