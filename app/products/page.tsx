'use client';

import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/motion/MotionComponents';
import Link from 'next/link';
import { 
  Shield, 
  Brain, 
  Zap, 
  Search, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Lock,
  Network,
  Database,
  Activity,
  AlertTriangle,
  BarChart3
} from 'lucide-react';

function ProductsContent() {
  return (
    <>
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
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Intelligent <span className="gradient-text">Security Platform</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Streamline security operations and reduce the workload on your security teams by automating threat detection, hunting, and incident response
              </p>
              <p className="text-gray-400 mb-8 italic">
                Designed by Security Professionals for Security Professionals
              </p>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-8 rounded-md transition-all transform hover:scale-105 inline-flex items-center gap-2"
              >
                Request a Demo
                <ArrowRight size={18} />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Transform Your <span className="gradient-text">Security Operations</span></h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
            </div>
          </AnimateOnScroll>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StaggerItem>
                <div className="glass-card p-8 text-center hover:border-primary/30 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Database className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-light">Security Built on Intelligent Data</h3>
                  <p className="text-gray-300">
                    Leverage comprehensive telemetry data to establish a robust security foundation and make informed, data-driven cybersecurity decisions. Normalize and enrich data from multiple sources to perform advanced analytics and design efficient, cost-effective cyber defense strategies.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass-card p-8 text-center hover:border-secondary/30 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-light">Precise Detection and Swift Response</h3>
                  <p className="text-gray-300">
                    Achieve continuous security coverage by automating threat detection and response powered by adaptive AI. Rapidly build and deploy intelligent detection models at scale to counter emerging threats. Automatically prioritize alerts, reduce false positives, and help your security teams save time while improving effectiveness.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass-card p-8 text-center hover:border-primary/30 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-light">Always Ready to Defend</h3>
                  <p className="text-gray-300">
                    Continuously identify threats, vulnerabilities, and exposures across endpoints, networks, and applications. Stay prepared to handle threats from any direction across your attack surface. Use intuitive threat hunting to uncover hidden threats, proactively build strong defenses, and easily create detection models based on threat scenarios.
                  </p>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-16 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Enhance SOC Operations With <span className="gradient-text">Intelligent Automation</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Advanced threat detection and response capabilities to protect your organization
              </p>
            </div>
          </AnimateOnScroll>

          <div className="space-y-12">
            {/* Feature 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <AnimateOnScroll animation="fadeInLeft">
                <div className="glass-card p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <Brain className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-light">Intelligent Model Development</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Achieve comprehensive coverage by creating intelligent models developed in minutes using advanced algorithms that can self-learn, train themselves using feedback, rank based on effectiveness, and automatically activate when relevant threats are detected.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Self-learning algorithms for continuous improvement</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Automatic model activation based on threat relevance</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>360° security coverage across all attack vectors</span>
                    </li>
                  </ul>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fadeInRight">
                <div className="glass-card p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="text-center">
                    <Activity className="h-24 w-24 text-primary mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400 italic">Visual representation of intelligent model development</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Feature 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <AnimateOnScroll animation="fadeInRight">
                <div className="glass-card p-8 bg-gradient-to-br from-primary/5 to-secondary/5 order-2 lg:order-1">
                  <div className="text-center">
                    <Network className="h-24 w-24 text-secondary mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400 italic">No-code platform interface</p>
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fadeInLeft">
                <div className="glass-card p-8 order-1 lg:order-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-light">Simplified No-Code Platform</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Streamline security operations with an intuitive no-code platform that enables rapid model creation without requiring extensive coding expertise. Build complex detection models through simple drag-and-drop actions, allowing security analysts to focus on high-value tasks and improve overall productivity.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Drag-and-drop model creation interface</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Pre-built threat intelligence integrations</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Reduced time and cost for security operations</span>
                    </li>
                  </ul>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Feature 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <AnimateOnScroll animation="fadeInLeft">
                <div className="glass-card p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-light">Real-Time Threat Detection</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Secure your entire IT ecosystem with automated threat detection and response in real-time, addressing threats emerging from any source. Quickly identify critical alerts with automated risk scoring and eliminate false positives, enabling SOC analysts to be more effective and efficient.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Automated risk scoring and prioritization</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Real-time threat detection across all sources</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Significant reduction in false positive alerts</span>
                    </li>
                  </ul>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fadeInRight">
                <div className="glass-card p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="text-center">
                    <Target className="h-24 w-24 text-primary mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400 italic">Real-time threat detection visualization</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Feature 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <AnimateOnScroll animation="fadeInRight">
                <div className="glass-card p-8 bg-gradient-to-br from-primary/5 to-secondary/5 order-2 lg:order-1">
                  <div className="text-center">
                    <BarChart3 className="h-24 w-24 text-secondary mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400 italic">Contextual awareness dashboard</p>
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fadeInLeft">
                <div className="glass-card p-8 order-1 lg:order-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <Search className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-light">Context-Aware Security Operations</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Gain enhanced visibility on incidents and events with visual timelines and contextual awareness to make well-informed security decisions. Quickly identify critical alerts with risk scoring and eliminate false positives through automated investigations. Deploy appropriate remediation actions immediately following detection.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Visual timelines for incident analysis</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Automated investigation and remediation</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Contextual decision-making support</span>
                    </li>
                  </ul>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Feature 5 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <AnimateOnScroll animation="fadeInLeft">
                <div className="glass-card p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <Brain className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-light">Adaptive Learning Models</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Enhance SOC teams with adaptive AI models and gain uninterrupted security coverage with the widest possible reach. Improve overall security operations and autonomously defend against cyberattacks. Leverage the self-training capability of models from feedback to adapt to the changing threat landscape, saving time and effort.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Continuous learning from security feedback</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Adaptation to evolving threat landscape</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Uninterrupted 24/7 security coverage</span>
                    </li>
                  </ul>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fadeInRight">
                <div className="glass-card p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="text-center">
                    <TrendingUp className="h-24 w-24 text-primary mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400 italic">Adaptive learning progression</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Feature 6 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <AnimateOnScroll animation="fadeInRight">
                <div className="glass-card p-8 bg-gradient-to-br from-primary/5 to-secondary/5 order-2 lg:order-1">
                  <div className="text-center">
                    <Search className="h-24 w-24 text-secondary mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400 italic">Advanced threat hunting interface</p>
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fadeInLeft">
                <div className="glass-card p-8 order-1 lg:order-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <Target className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-light">Advanced Threat Hunting</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Rapidly detect threats by employing AI/ML to correlate data sets, analyze patterns, sort by critical alerts, and eliminate false positives. Save your SOC teams time and effort by enabling them to quickly develop threat-hunting models using the intuitive no-code platform.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      <span>AI-powered data correlation and pattern analysis</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Rapid threat hunting model development</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Automated false positive elimination</span>
                    </li>
                  </ul>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our <span className="gradient-text">Performance</span></h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Measurable results that demonstrate the effectiveness of our security platform
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimateOnScroll animation="fadeInUp" delay={0.1}>
              <div className="glass-card p-8 text-center">
                <div className="text-5xl font-bold gradient-text mb-4">95%</div>
                <h3 className="text-xl font-bold mb-2 text-light">MITRE ATT&CK Framework Coverage</h3>
                <p className="text-gray-300 text-sm">
                  Comprehensive coverage of attack techniques and tactics
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={0.2}>
              <div className="glass-card p-8 text-center">
                <div className="text-5xl font-bold gradient-text mb-4">95%</div>
                <h3 className="text-xl font-bold mb-2 text-light">Reduction in False Positives</h3>
                <p className="text-gray-300 text-sm">
                  Significant decrease in alert fatigue and improved efficiency
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={0.3}>
              <div className="glass-card p-8 text-center">
                <div className="text-5xl font-bold gradient-text mb-4">90%</div>
                <h3 className="text-xl font-bold mb-2 text-light">Decrease in Mean Time to Respond</h3>
                <p className="text-gray-300 text-sm">
                  Faster incident response and threat mitigation
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Seamless <span className="gradient-text">Integrations</span></h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                We integrate with numerous identity, security, and SaaS products to provide comprehensive coverage across your technology stack.
              </p>
              <Link
                href="/services/integration-services"
                className="text-primary hover:text-secondary transition-colors inline-flex items-center gap-2"
              >
                View All Integrations
                <ArrowRight size={18} />
              </Link>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'SIEM Solutions', 'EDR Platforms', 'Cloud Security', 
              'Identity Providers', 'Network Security', 'Email Security',
              'Endpoint Protection', 'Vulnerability Scanners', 'Threat Intelligence',
              'Compliance Tools', 'Log Management', 'Incident Response'
            ].map((integration, index) => (
              <AnimateOnScroll key={index} animation="fadeInUp" delay={index * 0.05}>
                <div className="glass-card p-6 text-center hover:border-primary/30 transition-all">
                  <Lock className="h-8 w-8 text-primary mx-auto mb-2 opacity-70" />
                  <p className="text-sm text-gray-300">{integration}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Get a Comprehensive Overview of Our Solution
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              With a unified platform for comprehensive security operations, gain increased oversight and control over your cybersecurity posture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-8 rounded-md transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Request Information
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact?type=demo"
                className="bg-transparent border border-primary text-primary hover:bg-primary/10 font-bold py-3 px-8 rounded-md transition-all inline-flex items-center justify-center"
              >
                Schedule a Demo
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading products...</p></div>}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
