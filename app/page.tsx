'use client';

import { Footer, TrustSignals } from '@/components/ContactAndFooter';
import AutoScrollingShowcaseSection from '@/components/AutoScrollingShowcaseSection';
import HomeHeroSection from '@/components/HomeHeroSection';
import { AnimateOnScroll } from '@/components/motion/MotionComponents';
import Navbar from '@/components/Navbar';
import {
  CloudSecuritySection,
  IncidentResponseSection,
  SecurityIntelligenceSection,
  SecurityMonitoringSection,
  ThreatCorrelationSection,
} from '@/components/SecurityStorySections';
import ServicesHighlightSection from '@/components/ServicesHighlightSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SecurityOperationsSection from '@/components/TrainingProgramsSection';
import WhyChooseUpsilonSection from '@/components/WhyChooseUpsilonSection';
import { Suspense } from 'react';

// Extract the main content into a separate component
function HomeContent() {
  return (
    <>
      <HomeHeroSection />
      <ServicesHighlightSection />
      <AutoScrollingShowcaseSection />
      <SecurityMonitoringSection />
      <SecurityOperationsSection />
      <ThreatCorrelationSection />
      <IncidentResponseSection />
      <CloudSecuritySection />
      <SecurityIntelligenceSection />
      <WhyChooseUpsilonSection />
      <TestimonialsSection />
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Wrap the main content in Suspense with minimal fallback */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
        <HomeContent />
      </Suspense>

      {/* Trust Signals & Security Certifications */}
      <AnimateOnScroll animation="fadeInUp" delay={0.35} className="overflow-hidden">
        <TrustSignals />
      </AnimateOnScroll>

      {/* Footer */}
      <AnimateOnScroll animation="fadeInUp" delay={0.4} className="overflow-hidden">
        <Footer />
      </AnimateOnScroll>
    </main>
  );
}
