'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cloud,
  Database,
  Fingerprint,
  GitBranch,
  Lock,
  Radar,
  Server,
  ShieldCheck,
  Siren,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

const ease = [0.22, 1, 0.36, 1] as const;

const sources = [
  { label: 'Identity', y: 38 },
  { label: 'Endpoint', y: 96 },
  { label: 'Cloud', y: 154 },
  { label: 'Network', y: 212 },
];

const intelligenceLayers = [
  'Telemetry ingestion',
  'Context enrichment',
  'Threat correlation',
  'Risk prioritization',
  'Response recommendation',
];

const cloudPostureItems: Array<{
  label: string;
  value: string;
  Icon: LucideIcon;
  tone: 'amber' | 'blue';
}> = [
  { label: 'IAM', value: 'High-risk permissions isolated', Icon: AlertTriangle, tone: 'amber' },
  { label: 'Workloads', value: 'Hardened services tracked', Icon: Server, tone: 'blue' },
  { label: 'Data stores', value: 'Encryption evidence verified', Icon: Database, tone: 'blue' },
  { label: 'Network edge', value: 'Exposed routes prioritized', Icon: GitBranch, tone: 'amber' },
  { label: 'Compliance', value: 'SOC 2 controls mapped', Icon: ShieldCheck, tone: 'blue' },
  { label: 'Secrets', value: 'Rotation policy active', Icon: Lock, tone: 'blue' },
];

export function ThreatOperationsGraphic() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="premium-card relative overflow-hidden p-4 shadow-2xl shadow-black/40">
      <div className="premium-grid-bg absolute inset-0 opacity-70" />
      <div className="relative rounded-xl border border-slate-800 bg-slate-950/72 p-4">
        <div className="mb-5 flex flex-col gap-3 border-b border-slate-800 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Upsilon Cyber Defence SOC</div>
            <div className="mt-1 text-sm font-semibold text-white">Threat correlation pipeline</div>
          </div>
          <div className="w-max rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-200">
            Live posture
          </div>
        </div>

        <svg viewBox="0 0 620 300" className="h-auto w-full" role="img" aria-label="Threat telemetry flowing into detection and response stages">
          <defs>
            <linearGradient id="flow" x1="0" x2="1">
              <stop stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="0.55" stopColor="#7dd3fc" stopOpacity="0.9" />
              <stop offset="1" stopColor="#818cf8" stopOpacity="0.55" />
            </linearGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {sources.map((source, index) => (
            <g key={source.label}>
              <rect x="18" y={source.y - 18} width="112" height="36" rx="8" fill="#101722" stroke="#334155" strokeOpacity="0.65" />
              <text x="48" y={source.y + 5} fill="#cbd5e1" fontSize="12" fontWeight="600">{source.label}</text>
              <motion.path
                d={`M130 ${source.y} C205 ${source.y}, 220 150, 290 150`}
                fill="none"
                stroke="url(#flow)"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
                whileInView={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 1.2, delay: index * 0.12, ease }}
              />
              <motion.circle
                cx={250 + index * 8}
                cy={150 + (index - 1.5) * 8}
                r="4"
                fill={index === 1 ? '#f59e0b' : '#38bdf8'}
                filter="url(#softGlow)"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.6 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: [0, 1, 0.45], scale: [0.6, 1.25, 1] }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.9, delay: 0.5 + index * 0.16, ease }}
              />
            </g>
          ))}

          <rect x="290" y="88" width="128" height="124" rx="16" fill="#111827" stroke="#7dd3fc" strokeOpacity="0.45" />
          <text x="324" y="132" fill="#f8fafc" fontSize="13" fontWeight="700">Detection</text>
          <text x="318" y="154" fill="#94a3b8" fontSize="11">Normalize</text>
          <text x="318" y="174" fill="#94a3b8" fontSize="11">Enrich</text>
          <text x="318" y="194" fill="#94a3b8" fontSize="11">Prioritize</text>
          <motion.circle
            cx="354"
            cy="104"
            r="6"
            fill="#7dd3fc"
            initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0.45 }}
            animate={shouldReduceMotion ? undefined : { scale: [0.8, 1.2, 0.8], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {[
            { d: 'M418 150 C460 150, 472 94, 514 94', stroke: '#7dd3fc', delay: 0.75 },
            { d: 'M418 150 C460 150, 472 206, 514 206', stroke: '#38bdf8', delay: 0.9 },
          ].map(({ d, stroke, delay }) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke={stroke}
              strokeWidth="1.5"
              initial={shouldReduceMotion ? false : { pathLength: 0 }}
              whileInView={shouldReduceMotion ? undefined : { pathLength: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 1, delay, ease }}
            />
          ))}

          <rect x="514" y="64" width="88" height="60" rx="12" fill="#151c29" stroke="#f59e0b" strokeOpacity="0.5" />
          <text x="534" y="90" fill="#fbbf24" fontSize="11" fontWeight="700">Triage</text>
          <text x="532" y="110" fill="#94a3b8" fontSize="10">P1 alert</text>

          <rect x="514" y="176" width="88" height="60" rx="12" fill="#101827" stroke="#818cf8" strokeOpacity="0.55" />
          <text x="527" y="202" fill="#bfdbfe" fontSize="11" fontWeight="700">Contain</text>
          <text x="532" y="222" fill="#94a3b8" fontSize="10">Actioned</text>
        </svg>

        <div className="grid gap-2 border-t border-slate-800 pt-4 sm:grid-cols-3">
          {[
            ['Signal confidence', '94%'],
            ['Mean triage', '30m'],
            ['Control coverage', '87%'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{label}</div>
              <div className="mt-1 font-display text-lg font-bold text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SecurityMonitoringSection() {
  const cards = [
    { label: 'Monitored assets', value: '4,892', status: 'Healthy', icon: Server },
    { label: 'Validated alerts', value: '128', status: 'Prioritized', icon: Radar },
    { label: 'Open incidents', value: '07', status: 'Contained', icon: Siren },
    { label: 'Policy drift', value: '2.1%', status: 'Tracked', icon: ShieldCheck },
  ];

  return (
    <section className="premium-section py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="max-w-xl">
          <p className="premium-eyebrow">Security monitoring</p>
          <h2 className="premium-heading mt-4">Operational visibility without alert theater.</h2>
          <p className="premium-copy mt-5">
            Upsilon Cyber Defence filters raw telemetry into validated security work: affected assets, risk context, accountable owners, and response status in one operating view.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                className="premium-card p-5 transition duration-300 hover:-translate-y-1 hover:border-slate-600"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
                    <Icon className="h-5 w-5 text-sky-300" aria-hidden="true" />
                  </div>
                  <span className="rounded-full border border-sky-300/25 bg-sky-400/10 px-2.5 py-1 text-xs text-sky-200">{card.status}</span>
                </div>
                <div className="mt-8 font-display text-3xl font-bold tracking-tight text-white">{card.value}</div>
                <div className="mt-2 text-sm text-slate-400">{card.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ThreatCorrelationSection() {
  const nodes = [
    ['Identity anomaly', 16, 48, 'blue'],
    ['Impossible travel', 22, 170, 'amber'],
    ['Cloud API spike', 245, 42, 'blue'],
    ['Privileged action', 280, 175, 'red'],
    ['Endpoint beacon', 470, 72, 'amber'],
    ['Incident bundle', 494, 185, 'blue'],
  ] as const;

  return (
    <section className="premium-section-alt py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="premium-eyebrow">Threat correlation</p>
          <h2 className="premium-heading mt-4">Connect weak signals before they become major incidents.</h2>
          <p className="premium-copy mt-5">
            Isolated events rarely tell the whole story. Upsilon Cyber Defence links identity behavior, cloud activity, endpoint signals, and exposed paths into a clear incident narrative.
          </p>
        </div>
        <div className="premium-card overflow-hidden p-4 sm:p-6">
          <svg viewBox="0 0 650 280" className="h-auto w-full" role="img" aria-label="Threat correlation graph">
            <defs>
              <linearGradient id="correlationLine" x1="0" x2="1">
                <stop stopColor="#38bdf8" stopOpacity="0.25" />
                <stop offset="0.55" stopColor="#818cf8" stopOpacity="0.8" />
                <stop offset="1" stopColor="#7dd3fc" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            {[
              'M112 64 C190 62, 198 54, 245 58',
              'M118 185 C205 170, 218 188, 280 190',
              'M365 58 C430 60, 430 84, 470 88',
              'M385 190 C438 190, 460 198, 494 202',
              'M333 72 C352 105, 356 142, 338 176',
              'M540 88 C565 118, 570 160, 538 185',
            ].map((d, index) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="url(#correlationLine)"
                strokeWidth="1.5"
                strokeDasharray="4 7"
                initial={{ pathLength: 0, opacity: 0.2 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 1, delay: index * 0.08, ease }}
              />
            ))}
            {nodes.map(([label, x, y, tone], index) => (
              <motion.g
                key={label}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, delay: 0.2 + index * 0.08, ease }}
              >
                <rect x={x} y={y} width="132" height="48" rx="10" fill="#101722" stroke={tone === 'red' ? '#ef4444' : tone === 'amber' ? '#f59e0b' : '#38bdf8'} strokeOpacity="0.45" />
                <circle cx={x + 18} cy={y + 24} r="5" fill={tone === 'red' ? '#ef4444' : tone === 'amber' ? '#f59e0b' : '#38bdf8'} />
                <text x={x + 32} y={y + 29} fill="#e2e8f0" fontSize="11" fontWeight="600">{label}</text>
              </motion.g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}

export function IncidentResponseSection() {
  const steps = ['Detect', 'Triage', 'Contain', 'Investigate', 'Recover', 'Harden'];
  return (
    <section className="premium-section py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="premium-eyebrow">Incident response</p>
            <h2 className="premium-heading mt-4">A response model executives can trust under pressure.</h2>
            <p className="premium-copy mt-5">
              High-stakes incidents require clear stages, owners, and business communication. Upsilon Cyber Defence brings containment, investigation, recovery, and hardening into a disciplined response loop.
            </p>
            <Link href="/contact" className="premium-button premium-button-primary mt-8">
              Plan incident readiness <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="premium-card p-6">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  className="grid grid-cols-[32px_1fr_auto] items-center gap-4 rounded-lg border border-slate-800 bg-slate-950/70 p-4"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.07, ease }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-sky-300">{index + 1}</div>
                  <div>
                    <div className="font-semibold text-white">{step}</div>
                    <div className="text-sm text-slate-500">{index < 2 ? 'Decision support' : index < 4 ? 'Technical action' : 'Business recovery'}</div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-sky-200" aria-hidden="true" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CloudSecuritySection() {
  return (
    <section className="premium-section-alt py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="premium-card overflow-hidden p-6">
          <div className="mb-5 flex items-center gap-3">
            <Cloud className="h-5 w-5 text-sky-300" aria-hidden="true" />
            <span className="text-sm font-semibold text-white">Cloud posture map</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {cloudPostureItems.map(({ label, value, Icon, tone }) => (
              <div key={label} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 transition duration-300 hover:border-slate-600">
                <div className="flex items-center justify-between">
                  <Icon className={tone === 'amber' ? 'h-5 w-5 text-amber-300' : 'h-5 w-5 text-sky-200'} aria-hidden="true" />
                  <span className={tone === 'amber' ? 'h-2 w-2 rounded-full bg-amber-300' : 'h-2 w-2 rounded-full bg-indigo-300'} />
                </div>
                <div className="mt-5 font-semibold text-white">{label}</div>
                <div className="mt-1 text-sm text-slate-500">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="premium-eyebrow">Cloud security</p>
          <h2 className="premium-heading mt-4">Cloud risk needs posture, identity, and workload context.</h2>
          <p className="premium-copy mt-5">
            Upsilon Cyber Defence makes cloud exposure tangible by connecting account configuration, IAM drift, vulnerable workloads, secrets posture, and compliance evidence in one view.
          </p>
        </div>
      </div>
    </section>
  );
}

export function SecurityIntelligenceSection() {
  return (
    <section className="premium-section py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="premium-eyebrow">Security intelligence</p>
          <h2 className="premium-heading mt-4">From raw telemetry to recommended action.</h2>
          <p className="premium-copy mt-5">
            The operating model is simple: ingest the right data, enrich it with business context, correlate risk, prioritize what matters, and recommend the next response.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-5">
          {intelligenceLayers.map((layer, index) => (
            <motion.div
              key={layer}
              className="premium-card p-5 transition duration-300 hover:-translate-y-1 hover:border-slate-600"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Workflow className="h-5 w-5 text-sky-300" aria-hidden="true" />
                <span className="text-xs text-slate-600">0{index + 1}</span>
              </div>
              <div className="text-base font-semibold text-white">{layer}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
