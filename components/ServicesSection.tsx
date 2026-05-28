'use client';

import { Check, Code, LineChart, Shield, Users } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { useStaggerAnimation, useFadeInOnScroll } from '@/hooks';
import { AnimatedParagraph, AnimatedText } from './motion/AnimatedText';

// Service feature type
type ServiceFeature = {
  id: string;
  text: string;
};

// Service type
type Service = {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconColor: 'primary' | 'secondary';
  features: ServiceFeature[];
};

// Services data
const services: Service[] = [
  {
    id: 'strategy-consulting',
    title: 'Strategy & Architecture Consulting',
    icon: <LineChart className="h-8 w-8 text-primary" />,
    iconColor: 'primary',
    features: [
      { id: 'feature-1', text: 'Architecture Assessment Services' },
      { id: 'feature-2', text: 'Governance & Compliance' },
      { id: 'feature-3', text: 'Risk Assessment Services' },
      { id: 'feature-4', text: 'Project Management' },
    ],
  },
  {
    id: 'managed-services',
    title: 'Managed Services',
    icon: <Shield className="h-8 w-8 text-secondary" />,
    iconColor: 'secondary',
    features: [
      { id: 'feature-1', text: 'Incident Response (DFIR)' },
      { id: 'feature-2', text: 'Red Team / Blue Team Exercise' },
      { id: 'feature-3', text: 'SOC as a Service' },
      { id: 'feature-4', text: 'Application Security Testing' },
    ],
  },
  {
    id: 'integration-services',
    title: 'Integration Services',
    icon: <Code className="h-8 w-8 text-primary" />,
    iconColor: 'primary',
    features: [
      { id: 'feature-1', text: 'Solution Design & Implementation' },
      { id: 'feature-2', text: 'Product Integrations' },
      { id: 'feature-3', text: 'Custom Security Solutions' },
      { id: 'feature-4', text: 'API Security' },
    ],
  },
  {
    id: 'security-trainings',
    title: 'Cyber Security Trainings',
    icon: <Users className="h-8 w-8 text-secondary" />,
    iconColor: 'secondary',
    features: [
      { id: 'feature-1', text: 'Customized Training Programs' },
      { id: 'feature-2', text: 'Internship Programs' },
      { id: 'feature-3', text: 'Corporate Security Training' },
      { id: 'feature-4', text: 'Hands-on Workshops' },
    ],
  },
];

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Stagger animation for service cards
  useStaggerAnimation(containerRef, '.glass-card');

  // Fade in for the heading
  useFadeInOnScroll(headingRef);

  return (
    <section id="services" className="py-20 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Our <span className="gradient-text">
              <AnimatedText
                text="Services"
                type="chars"
                staggerDelay={0.08}
                duration={0.6}
              />
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <AnimatedParagraph
            text="Comprehensive cybersecurity solutions for organizations of all sizes"
            className="text-gray-300 mt-4 max-w-2xl mx-auto"
          />
        </div>
        
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`glass-card p-6 hover:border-${service.iconColor === 'primary' ? 'primary' : 'secondary'}/30 transition-all group`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-light mb-4">{service.title}</h3>
              <ul className="text-gray-300 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature.id} className="flex items-start">
                    <Check 
                      size={18} 
                      className={service.iconColor === 'primary' ? 'text-primary mr-2 mt-1' : 'text-secondary mr-2 mt-1'} 
                    />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href={`/services/${service.id}`}
                className={service.iconColor === 'primary' 
                  ? "mt-6 inline-block bg-transparent border border-primary text-primary hover:bg-primary/10 text-sm font-medium py-2 px-4 rounded-md transition-all" 
                  : "mt-6 inline-block bg-transparent border border-secondary text-secondary hover:bg-secondary/10 text-sm font-medium py-2 px-4 rounded-md transition-all"
                }
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;