'use client';

import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { AnimateOnScroll } from '@/components/motion/MotionComponents';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">Privacy <span className="gradient-text">Policy</span></h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                How we collect, use, and protect your personal information
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
                <h2 className="text-2xl font-bold mb-4 text-light">Overview</h2>
                <p className="text-gray-300 mb-4">
                  Upsilon Cyber Defence is highly concerned with privacy issues and specifies how we gather relevant information about users and keep it confidential and safe. Upsilon Cyber Defence provides courses and knowledge tailored to user needs.
                </p>
                <p className="text-gray-300 mb-4">
                  We ensure that information collected through our website, mobile applications, widgets, or other software is safeguarded and secured. It will not be shared with third parties without explicit consent.
                </p>
                <p className="text-gray-300">
                  This Privacy Policy was last updated on May 1, 2025.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.2}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">What Information Do We Gather?</h2>
                <p className="text-gray-300 mb-4">
                  We collect various types of information to provide and improve our services to you. The information we collect may include:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Name of the visitor</li>
                  <li>Contact information such as mobile number and email address</li>
                  <li>Residential address and course preferences</li>
                  <li>Information gathered from customer surveys</li>
                  <li>Technical information such as IP address, browser type, and device information</li>
                  <li>Usage data related to how you interact with our website and services</li>
                </ul>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.3}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">How Do We Utilize the Collected Information?</h2>
                <p className="text-gray-300 mb-4">
                  The information gathered is used for the following purposes:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>To identify training needs and customize our courses to provide high-quality training services</li>
                  <li>To communicate with you about our services, updates, and promotional content</li>
                  <li>To process transactions and deliver the services you request</li>
                  <li>To improve our website, services, and user experience</li>
                  <li>To comply with legal obligations</li>
                  <li>To detect and prevent fraud and unauthorized access to our services</li>
                </ul>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.4}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">How Do We Use Personal Information?</h2>
                <p className="text-gray-300 mb-4">
                  We only use personal information provided by the user as permitted by law. Unauthorized access to the data is strictly prohibited. We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
                </p>
                <p className="text-gray-300 mb-4">
                  We may share your personal information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service. These third parties are contractually obligated to use your information only for the purposes for which we disclose it to them and are required to maintain the confidentiality and security of your information.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.5}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Use of Cookies</h2>
                <p className="text-gray-300 mb-4">
                  Cookies enhance user preferences and browsing experiences. Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
                </p>
                <p className="text-gray-300 mb-4">
                  You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.6}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Controlling Personal Information</h2>
                <p className="text-gray-300 mb-4">
                  Users can control how their personal information is handled in the following ways:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>When asked for information, users can choose to decline.</li>
                  <li>If users have previously agreed to provide personal information, they can withdraw consent or request deletion of the information by contacting us at <a href="mailto:support@upsilon.com" className="text-primary hover:underline">support@upsilon.com</a>.</li>
                </ul>
                <p className="text-gray-300 mb-4">
                  We will not send marketing or advertising emails unless users have explicitly opted in. However, we encourage users to subscribe to receive promotional offers and background information related to training programs and services.
                </p>
                <p className="text-gray-300 mb-4">
                  If users believe the information provided is incomplete or incorrect, they can email us at <a href="mailto:support@upsilon.com" className="text-primary hover:underline">support@upsilon.com</a>, and we will rectify it promptly.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.7}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Your Rights</h2>
                <p className="text-gray-300 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information. These rights may include:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>The right to access your personal information</li>
                  <li>The right to rectify inaccurate personal information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to restrict processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to object to processing of your personal information</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p className="text-gray-300 mb-4">
                  To exercise any of these rights, please contact us at <a href="mailto:support@upsilon.com" className="text-primary hover:underline">support@upsilon.com</a>.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.8}>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-light">Changes to This Privacy Policy</h2>
                <p className="text-gray-300 mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
                </p>
                <p className="text-gray-300 mb-4">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInUp" delay={0.9}>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-light">Contact Us</h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
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
                <Link href="/terms-conditions" className="glass-card p-6 hover:border-primary/30 transition-all block">
                  <h4 className="text-lg font-bold mb-2 text-light">Terms & Conditions</h4>
                  <p className="text-gray-300 text-sm mb-4">Our terms of service and user agreement</p>
                  <div className="text-primary flex items-center gap-1 text-sm">
                    Read Terms & Conditions
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