'use client';

import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { AnimateOnScroll } from '@/components/motion/MotionComponents';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-dark to-dark-100 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cyber-grid opacity-10" style={{
            transform: 'perspective(1000px) rotateX(60deg)',
            transformOrigin: 'top',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">Refund <span className="gradient-text">Policy</span></h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our commitment to transparency and fair practices
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      
      {/* Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8">
            <AnimateOnScroll animation="fadeInUp" delay={0.1}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Refund Policy Overview</h2>
                <p className="text-gray-300 mb-4">
                  Any amount paid towards fees/charges against services subscribed for at <strong>Upsilon Cyber Defence</strong> is non-refundable.
                </p>
                <p className="text-gray-300 mb-4">
                  However, we understand that certain circumstances may warrant special consideration. This policy outlines the conditions under which refunds may be considered and our process for handling refund requests.
                </p>
                <p className="text-gray-300">
                  This Refund Policy was last updated on May 1, 2025.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.2}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Special Circumstances for Refund Consideration</h2>
                <p className="text-gray-300 mb-4">
                  Refunds may be considered under the following special circumstances:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Course access not provided within 48 hours of successful payment</li>
                  <li>Duplicate payment has been made for the same course</li>
                  <li>Technical issues regarding video quality making the course content non-functional or inaccessible</li>
                  <li>Cancellation of any scheduled live events or workshops by Upsilon Cyber Defence</li>
                  <li>Course content significantly differs from what was advertised at the time of purchase</li>
                </ul>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.3}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Denied Refund Claims</h2>
                <p className="text-gray-300 mb-4">
                  Refund requests will be denied under the following circumstances:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>A significant portion of the course has been consumed (more than 30% of content viewed)</li>
                  <li>Multiple refunds have been requested for the same course by the same user</li>
                  <li>Course was purchased through a third-party vendor or reseller</li>
                  <li>Facility for a timed event was provided, but the student did not attend</li>
                  <li>More than 7 days have passed since the date of purchase</li>
                  <li>The refund request is based on personal preferences or change of mind</li>
                  <li>The user has violated our Terms & Conditions or engaged in fraudulent activity</li>
                </ul>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.4}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Refund Request Process</h2>
                <p className="text-gray-300 mb-4">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Send an email to <a href="mailto:support@upsilon.com" className="text-primary hover:underline">support@upsilon.com</a> within 7 days of purchase</li>
                  <li>Include your order details, transaction ID, and reason for the refund request</li>
                  <li>Provide any supporting documentation or screenshots if applicable</li>
                  <li>Our support team will review your request and respond within 48 hours</li>
                </ol>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.5}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Processing Period</h2>
                <p className="text-gray-300 mb-4">
                  If your refund request is approved:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Refund claims are processed within 7 to 10 business days after approval</li>
                  <li>The processed amount will be credited to the original payment method within 7-10 working days</li>
                  <li>You will receive an email confirmation once the refund has been initiated</li>
                  <li>Bank processing times may vary and are outside our control</li>
                </ul>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.6}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Course Access After Refund</h2>
                <p className="text-gray-300 mb-4">
                  Please note that once a refund is processed:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Your access to the course content will be immediately revoked</li>
                  <li>Any certificates or completion records will be invalidated</li>
                  <li>You will not be able to re-enroll in the same course at a discounted price</li>
                </ul>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.7}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Exceptions</h2>
                <p className="text-gray-300 mb-4">
                  Upsilon Cyber Defence reserves the right to make exceptions to this policy on a case-by-case basis. Such exceptions are at the sole discretion of our management team and do not create a precedent for future refund requests.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.8}>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-light">Contact Us</h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions about our Refund Policy, please contact us:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>By email: <a href="mailto:support@upsilon.com" className="text-primary hover:underline">support@upsilon.com</a></li>
                  <li>By phone: 7981019955</li>
                  <li>By mail: Sri Venkata Builders, 4th floor, 2nd main road, Chikkabegur, Bangalore, Karnataka 560068</li>
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
          
          {/* Related Policies */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-center">Related Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimateOnScroll animation="fadeInLeft" delay={0.1}>
                <Link href="/privacy-policy" className="glass-card p-6 hover:border-primary/30 transition-all block">
                  <h4 className="text-lg font-bold mb-2 text-light">Privacy Policy</h4>
                  <p className="text-gray-300 text-sm mb-4">How we collect, use, and protect your personal information</p>
                  <div className="text-primary flex items-center gap-1 text-sm">
                    Read Privacy Policy
                    <ChevronRight size={16} />
                  </div>
                </Link>
              </AnimateOnScroll>
              
              <AnimateOnScroll animation="fadeInRight" delay={0.2}>
                <Link href="/terms-conditions" className="glass-card p-6 hover:border-primary/30 transition-all block">
                  <h4 className="text-lg font-bold mb-2 text-light">Terms & Conditions</h4>
                  <p className="text-gray-300 text-sm mb-4">Our terms of service and user agreement</p>
                  <div className="text-primary flex items-center gap-1 text-sm">
                    Read Terms & Conditions
                    <ChevronRight size={16} />
                  </div>
                </Link>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}