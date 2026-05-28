'use client';

import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { AnimateOnScroll } from '@/components/motion/MotionComponents';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function TermsConditionsPage() {
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
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">Terms & <span className="gradient-text">Conditions</span></h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Please read these terms carefully before using our services
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      
      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8">
            <AnimateOnScroll animation="fadeInUp" delay={0.1}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Introduction</h2>
                <p className="text-gray-300 mb-4">
                  Welcome to Upsilon Cyber Defence. These Terms and Conditions ("Terms") govern your use of our website, services, and courses. By accessing or using our services, you agree to be bound by these Terms.
                </p>
                <p className="text-gray-300 mb-4">
                  If you do not agree with any part of these terms, you must not use our services.
                </p>
                <p className="text-gray-300">
                  These Terms & Conditions were last updated on May 1, 2025.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.2}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Content and Course Information</h2>
                <p className="text-gray-300 mb-4">
                  Users will have access to course materials for the specific course they registered for. The content access includes:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Video lectures and tutorials</li>
                  <li>Course materials and resources</li>
                  <li>Practice exercises and assessments</li>
                  <li>Certificate upon successful completion</li>
                </ul>
                <p className="text-gray-300">
                  Revisions or additional access to updated course content may require an additional fee.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.3}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Intellectual Property Rights</h2>
                <p className="text-gray-300 mb-4">
                  Upsilon Cyber Defence owns all content on the website, including but not limited to:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Course materials, videos, and documentation</li>
                  <li>Website design, graphics, and logos</li>
                  <li>Software and source code</li>
                  <li>Text, images, and other multimedia content</li>
                </ul>
                <p className="text-gray-300">
                  Unauthorized distribution, use, reproduction, or modification of our content is strictly prohibited and may result in legal action.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.4}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">User Responsibilities</h2>
                <p className="text-gray-300 mb-4">
                  As a user of our services, you agree to:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Provide accurate and complete information during registration</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Not share your account access with others</li>
                  <li>Not engage in any activity that disrupts or interferes with our services</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Respect the intellectual property rights of Upsilon Cyber Defence and others</li>
                  <li>Use the course content solely for personal educational purposes</li>
                </ul>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.5}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Limitation of Liability</h2>
                <p className="text-gray-300 mb-4">
                  Users acknowledge that accessing and using the website, services, and course content is at their own risk. Upsilon Cyber Defence is not liable for:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Any interruptions or errors in service availability</li>
                  <li>Loss of data or unauthorized access to user information</li>
                  <li>Any indirect, incidental, or consequential damages</li>
                  <li>Third-party actions or content</li>
                  <li>Technical issues beyond our reasonable control</li>
                </ul>
                <p className="text-gray-300">
                  Our total liability shall not exceed the amount paid by you for the specific service in question.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.6}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Termination</h2>
                <p className="text-gray-300 mb-4">
                  Upsilon Cyber Defence reserves the right to terminate this agreement and deny access to the website or course content immediately upon issuing a legal notice. Grounds for termination include:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Violation of these Terms & Conditions</li>
                  <li>Fraudulent or illegal activities</li>
                  <li>Sharing or distributing course content without authorization</li>
                  <li>Harassment or inappropriate behavior towards staff or other users</li>
                  <li>Providing false information during registration</li>
                </ul>
                <p className="text-gray-300">
                  Any misconduct, violation of the contract, or misrepresentation by the user may result in termination and potential legal action.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.7}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Indemnity</h2>
                <p className="text-gray-300 mb-4">
                  In any case of damage, loss, expenses including attorney fees or liability caused due to:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Unauthorized access to our website, course content, and services from your account</li>
                  <li>Breach of this agreement</li>
                  <li>Violation of any rights of another party</li>
                  <li>Your use or misuse of our services</li>
                </ul>
                <p className="text-gray-300">
                  You will not hold us or our contractors, officers, licensees, employees, and agents responsible for the loss. You agree to indemnify and hold us harmless from any claims arising from your actions.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.8}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Governing Law and Jurisdiction</h2>
                <p className="text-gray-300 mb-4">
                  For participants living in India, this agreement shall be construed and governed by the laws implemented by the Indian government, and Indian courts will have the restricted jurisdiction over the matters related to or arising out of this agreement.
                </p>
                <p className="text-gray-300">
                  This agreement shall be construed and governed by Indian law and courts in Bangalore, Karnataka for any restricted jurisdiction over the matters related to or arising out of this agreement.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.9}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Amendment and Assignment</h2>
                <p className="text-gray-300 mb-4">
                  We reserve the right to bilaterally adjust or modify the terms and conditions without providing any prior notice to the user. However, once modified, we shall publish the revised terms and agreement on the website so that you will be aware of all the modifications and revisions made in the agreement.
                </p>
                <p className="text-gray-300 mb-4">
                  It is the responsibility of the user to regularly check the contents of the website in order to be aware of any revisions, modifications, or amendments. Your continued use of or access to our website, its content, and services after the modification and publication of the agreement shall be considered your acceptance of the change.
                </p>
                <p className="text-gray-300">
                  The user is prohibited from allocating the terms and conditions or the applications present in the agreement to any third party as this will be considered a violation of the contract and legal proceedings may be followed against you.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={1.0}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Severability</h2>
                <p className="text-gray-300 mb-4">
                  If any provision of these Terms is held to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions will continue in full force and effect. The invalid or unenforceable provision will be replaced with a valid and enforceable provision that most closely matches the intent of the original provision.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={1.1}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Entire Agreement</h2>
                <p className="text-gray-300 mb-4">
                  This agreement, along with the privacy policy, refund policy, and other mentioned guidelines, rules, and regulations presented on the https://www.upsilon.com website, constitutes the entire contract which governs your use of our website.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={1.2}>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-light">Contact Information</h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions about these Terms & Conditions, please contact us:
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
                <Link href="/refund-policy" className="glass-card p-6 hover:border-primary/30 transition-all block">
                  <h4 className="text-lg font-bold mb-2 text-light">Refund Policy</h4>
                  <p className="text-gray-300 text-sm mb-4">Our policy regarding refunds and cancellations</p>
                  <div className="text-primary flex items-center gap-1 text-sm">
                    Read Refund Policy
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