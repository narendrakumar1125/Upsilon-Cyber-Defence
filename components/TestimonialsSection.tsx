'use client';

import { AnimatedParagraph } from '@/components/motion/AnimatedText';
import { AnimateOnScroll, SoftHoverCard } from '@/components/motion/MotionComponents';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'Upsilon Cyber Defence gave our leadership team a clearer operating model for detection, escalation, and cloud risk ownership.',
    author: 'Security Operations Director',
    role: 'Global technology enterprise',
    company: 'Enterprise security team',
  },
  {
    quote: 'Their MDR workflow reduced repeated alert review and helped our team focus on validated incidents with business context.',
    author: 'Head of Security',
    role: 'B2B SaaS platform',
    company: 'Cloud operations team',
  },
  {
    quote: 'The combination of control mapping, response readiness, and cloud posture reviews made audit preparation materially easier.',
    author: 'VP of IT Security',
    role: 'Financial services organization',
    company: 'Risk and compliance team',
  },
];

const outcomes = [
  ['Reduced noise', 'Validated alert queues replace raw alert volume.'],
  ['Faster ownership', 'Clear incident stages and responsible teams.'],
  ['Stronger controls', 'Cloud, identity, and compliance posture tracked together.'],
];

const TestimonialsSection = () => {
  return (
    <section className="premium-section-alt py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fadeInUp">
          <div className="mb-14 max-w-3xl">
            <p className="premium-eyebrow">Enterprise outcomes</p>
            <h2 className="premium-heading mt-4">Proof should read like operational impact.</h2>
            <AnimatedParagraph
              text="Security buyers do not need vague praise. They need evidence that response quality, control maturity, and visibility improve."
              className="premium-copy mt-5 max-w-2xl"
            />
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimateOnScroll key={testimonial.author} animation="fadeInUp" delay={index * 0.12}>
              <SoftHoverCard className="premium-card h-full p-7 transition duration-300 hover:-translate-y-1 hover:border-slate-600">
                <div className="flex h-full flex-col">
                  <Quote className="mb-6 h-8 w-8 text-sky-400/60" aria-hidden="true" />
                  <blockquote className="mb-7 flex-1 text-base leading-8 text-slate-300">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="border-t border-slate-800/70 pt-5">
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-sky-300">{testimonial.role}</div>
                    <div className="text-sm text-slate-500">{testimonial.company}</div>
                  </div>
                </div>
              </SoftHoverCard>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll animation="fadeInUp" delay={0.35}>
          <div className="mt-12 grid gap-4 border-t border-slate-800 pt-8 sm:grid-cols-3">
            {outcomes.map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-slate-800 bg-slate-950/60 p-5">
                <div className="font-display text-2xl font-bold text-white">{title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">{copy}</div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default TestimonialsSection;
