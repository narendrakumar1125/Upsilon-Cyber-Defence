'use client';

import { Check, Award, Globe, Shield } from 'lucide-react';
import { useRef } from 'react';
import { AnimateOnScroll } from './motion/MotionComponents';
import { useStaggerAnimation, useFadeInOnScroll } from '@/hooks';

const AboutSection = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Stagger animation for info cards
  useStaggerAnimation(cardsRef, '.glass-card');

  // Fade in for main content
  useFadeInOnScroll(mainContentRef);

  return (
    <AnimateOnScroll animation="fadeInUp" delay={0.1}>
      <section id="about" className="py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-dark opacity-90"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-dark-100 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={mainContentRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About <span className="gradient-text">Upsilon Cyber Defence</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="glass-card p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <h3 className="text-2xl font-bold mb-6 text-light">Brief About Upsilon Cyber Defence</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Upsilon Cyber Defence is an Indian based company located at Bangalore. We started our Journey in 2021. We have a team of cybersecurity experts who are passionate about providing cutting-edge Cyber security Solutions to organizations across the world.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check size={18} className="text-primary mr-2" />
                    <span className="text-gray-300">Cyber Security</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-primary mr-2" />
                    <span className="text-gray-300">DevOps</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-primary mr-2" />
                    <span className="text-gray-300">Cloud Computing</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-primary mr-2" />
                    <span className="text-gray-300">Software Development</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check size={18} className="text-primary mr-2" />
                    <span className="text-gray-300">Data Science</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-primary mr-2" />
                    <span className="text-gray-300">Digital Marketing</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-primary mr-2" />
                    <span className="text-gray-300">Website Design</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-primary mr-2" />
                    <span className="text-gray-300">Mobile App Development</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6" ref={cardsRef}>
            {/* Why Upsilon Cyber Defence */}
            <div className="glass-card p-6 transform transition-all hover:scale-105">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-3 rounded-lg mr-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-light">Why Upsilon Cyber Defence</h3>
                  <p className="text-gray-300 text-sm">
                    Upsilon Cyber Defence is a great place to start your learning journey and to polish your skills. "Learning is fun only when it's hands-on is the approach" - our team believes it and delivers it.
                  </p>
                </div>
              </div>
            </div>
            
            {/* What We Do */}
            <div className="glass-card p-6 transform transition-all hover:scale-105">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-3 rounded-lg mr-4">
                  <Globe className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-light">What We Do</h3>
                  <p className="text-gray-300 text-sm">
                    Our platform provides courses for anyone looking for a career switch, a new job, or skill advancement. We also provide corporate offerings to enhance security posture with various IT solutions.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Our Mission */}
            <div className="glass-card p-6 transform transition-all hover:scale-105">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-3 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-light">Our Mission</h3>
                  <p className="text-gray-300 text-sm">
                    Our Mission is to deliver high quality industry-related trainings and also provide innovative security solutions to organizations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </AnimateOnScroll>
  );
};

export default AboutSection;