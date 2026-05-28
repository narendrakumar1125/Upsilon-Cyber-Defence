'use client';

import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/motion/MotionComponents';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

// Stats data type
type Stat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  color: 'primary' | 'secondary';
};

// Testimonial data type
type Testimonial = {
  id: number;
  content: string;
  author: string;
  position: string;
  rating: number;
  image?: string;
};

// Component props
interface StatsAndTestimonialsProps {
  className?: string;
}

const stats: Stat[] = [
  { value: 120, suffix: '+', label: 'Enterprise engagements', color: 'primary' },
  { value: 98, suffix: '%', label: 'SLA compliance', color: 'secondary' },
  { value: 30, suffix: 'm', label: 'Average threat triage', color: 'primary' },
  { value: 75, suffix: '%', label: 'Control gap reduction', color: 'secondary' },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: 'Upsilon Cyber Defence gave us visibility into the gaps we did not know existed and reduced our investigation time from days to hours.',
    author: 'Head of Security Operations',
    position: 'Fortune 500 enterprise',
    rating: 5,
  },
  {
    id: 2,
    content: 'The response team operates with discipline and clarity, enabling our organization to recover quickly and strengthen controls after every incident.',
    author: 'CISO',
    position: 'Global financial services provider',
    rating: 5,
  },
  {
    id: 3,
    content: 'Their security delivery is precise, transparent, and aligned with our compliance objectives. We now have a partner we can trust under pressure.',
    author: 'VP of IT Risk',
    position: 'Manufacturing conglomerate',
    rating: 5,
  },
];

const StatsAndTestimonials: React.FC<StatsAndTestimonialsProps> = ({ className = '' }) => {
  // State for animated counters
  const [counters, setCounters] = useState<number[]>(stats.map(() => 0));
  const counterTimersRef = useRef<number[]>([]);
  const counterStartedRef = useRef(false);

  // State for testimonials slider
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate counter function
  const animateCounters = useCallback(() => {
    if (counterStartedRef.current) return;
    counterStartedRef.current = true;

    stats.forEach((stat, index) => {
      const target = stat.value;
      const duration = 2000; // 2 seconds
      const step = Math.ceil(target / (duration / 20)); // Update every 20ms
      let current = 0;

      const timer = window.setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = current;
          return newCounters;
        });
      }, 20);

      counterTimersRef.current.push(timer);
    });
  }, []);

  // Counter animation effect
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        animateCounters();
      }
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    const target = document.querySelector('#stats-section');
    
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
      counterTimersRef.current.forEach(clearInterval);
      counterTimersRef.current = [];
    };
  }, [animateCounters]);

  // Navigate through testimonials
  const navigateTestimonial = useCallback((direction: 'prev' | 'next') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveTestimonial((current) => {
      return direction === 'next'
        ? (current + 1) % testimonials.length
        : (current - 1 + testimonials.length) % testimonials.length;
    });
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      navigateTestimonial('next');
    }, 8000);
    
    return () => clearInterval(interval);
  }, [navigateTestimonial]);

  return (
    <div className={`${className}`}>
      {/* Stats Section */}
      <section id="stats-section" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-slate-200/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-4">
                Our measurable impact
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-8">
                Enterprise security outcomes that demonstrate our commitment to measurable risk reduction
              </p>
            </div>
          </AnimateOnScroll>

          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StaggerItem key={index}>
                  <div className="group relative rounded-[28px] border border-slate-800/50 bg-gradient-to-br from-slate-900/95 to-slate-800/55 backdrop-blur-xl p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.35)] hover:shadow-[0_30px_85px_rgba(15,23,42,0.55)] hover:border-sky-400/30 transition-all duration-500 hover:-translate-y-1">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-sky-500/0 to-sky-400/0 group-hover:from-sky-500/10 group-hover:to-sky-400/10 transition-all duration-500" />

                    <div className="relative z-10">
                      <div className={`text-4xl md:text-5xl font-bold text-sky-300 mb-3 group-hover:text-sky-200 transition-colors duration-300`}>
                        {stat.prefix}{counters[index]}{stat.suffix}
                      </div>
                      <div className="text-slate-400 text-base leading-7 group-hover:text-slate-300 transition-colors duration-300">{stat.label}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-slate-200/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-4">
                Trusted by enterprise leaders
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-sky-300 mx-auto rounded-full"></div>
              <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg leading-8">
                Security executives share their experience with our disciplined approach to enterprise risk management
              </p>
            </div>
          </AnimateOnScroll>

          <div className="relative">
            {/* Testimonial Navigation */}
            <div className="absolute top-1/2 -left-4 sm:-left-6 transform -translate-y-1/2 z-20">
              <button
                onClick={() => navigateTestimonial('prev')}
                className="group w-12 h-12 rounded-full bg-gradient-to-r from-slate-900/80 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-400/30 hover:shadow-lg hover:shadow-sky-400/10 transition-all duration-300"
                disabled={isAnimating}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>

            <div className="absolute top-1/2 -right-4 sm:-right-6 transform -translate-y-1/2 z-20">
              <button
                onClick={() => navigateTestimonial('next')}
                className="group w-12 h-12 rounded-full bg-gradient-to-r from-slate-900/80 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-400/30 hover:shadow-lg hover:shadow-sky-400/10 transition-all duration-300"
                disabled={isAnimating}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
            {/* Testimonials Slider */}
            <div className="overflow-hidden rounded-[36px] border border-slate-800/50 bg-slate-950/50 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.08)]">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4 py-2">
                    <div className="group relative rounded-[36px] border border-slate-800/50 bg-gradient-to-br from-slate-900/95 to-slate-800/60 backdrop-blur-xl p-10 max-w-4xl mx-auto shadow-[0_25px_85px_rgba(15,23,42,0.35)] hover:shadow-[0_35px_105px_rgba(15,23,42,0.55)] transition-all duration-500">
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-[36px] bg-gradient-to-r from-sky-500/0 to-sky-400/0 group-hover:from-sky-500/10 group-hover:to-sky-400/10 transition-all duration-500" />

                      <div className="relative z-10">
                        <div className="absolute -top-5 left-10 w-10 h-10 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-300 flex items-center justify-center shadow-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                          </svg>
                        </div>

                        <div className="mt-6">
                          <p className="text-slate-300 italic mb-8 text-xl leading-9 group-hover:text-slate-200 transition-colors duration-300">&quot;{testimonial.content}&quot;</p>

                          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 bg-gradient-to-br from-sky-500/20 to-sky-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="text-base font-semibold text-sky-300">
                                  {testimonial.author.split(' ').map(name => name[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-sky-100 transition-colors duration-300">{testimonial.author}</div>
                                <div className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors duration-300">{testimonial.position}</div>
                              </div>
                            </div>

                            <div className="flex gap-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} size={18} className="text-sky-400 fill-sky-400 group-hover:text-sky-300 group-hover:fill-sky-300 transition-colors duration-300" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-gradient-to-r from-sky-400 to-sky-300 w-8 shadow-lg shadow-sky-400/25'
                      : 'bg-slate-600 hover:bg-slate-500 hover:shadow-md hover:shadow-slate-500/25'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsAndTestimonials;