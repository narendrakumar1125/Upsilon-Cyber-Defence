'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/motion/MotionComponents';
import { LineChart, Shield, Code, Users, CheckCircle, ChevronRight, Globe, Target, AlertTriangle, Server, Database, Lock } from 'lucide-react';

// Service type
type Service = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  iconColor: 'primary' | 'secondary';
  features: { text: string }[];
};

// Services implementation separated from the page component
export default function ServicesPageImpl() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Categories
  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'consulting', name: 'Strategy & Consulting' },
    { id: 'managed', name: 'Managed Services' },
    { id: 'integration', name: 'Integration Services' },
    { id: 'training', name: 'Training Services' },
  ];
  
  // Services Data
  const servicesData: Service[] = [
    // Strategy & Consulting Services
    {
      id: 'strategy-consulting',
      title: 'Architecture Assessment Services',
      description: 'Comprehensive evaluation of your current security architecture to identify strengths, weaknesses, and areas for improvement.',
      category: 'consulting',
      icon: <LineChart className="h-8 w-8 text-primary" />,
      iconColor: 'primary',
      features: [
        { text: 'Security architecture review' },
        { text: 'Gap analysis' },
        { text: 'Compliance mapping' },
        { text: 'Improvement roadmap' },
        { text: 'Security frameworks implementation' }
      ]
    },
    {
      id: 'governance-compliance',
      title: 'Governance & Compliance',
      description: 'Establish robust security governance frameworks and ensure compliance with industry regulations and standards.',
      category: 'consulting',
      icon: <Target className="h-8 w-8 text-secondary" />,
      iconColor: 'secondary',
      features: [
        { text: 'Regulatory compliance assessment' },
        { text: 'Policy development' },
        { text: 'Compliance program implementation' },
        { text: 'Audit preparation' },
        { text: 'Security governance frameworks' }
      ]
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment Services',
      description: 'Identify, analyze, and prioritize security risks to develop effective risk management strategies.',
      category: 'consulting',
      icon: <AlertTriangle className="h-8 w-8 text-primary" />,
      iconColor: 'primary',
      features: [
        { text: 'Threat modeling' },
        { text: 'Vulnerability assessment' },
        { text: 'Risk prioritization' },
        { text: 'Mitigation strategy development' },
        { text: 'Security posture analysis' }
      ]
    },
    
    // Managed Services
    {
      id: 'incident-response',
      title: 'Incident Response (DFIR)',
      description: 'Rapid response to security incidents with digital forensics and incident recovery capabilities.',
      category: 'managed',
      icon: <Shield className="h-8 w-8 text-primary" />,
      iconColor: 'primary',
      features: [
        { text: 'Incident detection & triage' },
        { text: 'Digital forensics' },
        { text: 'Malware analysis' },
        { text: 'Breach containment' },
        { text: 'Recovery & remediation' }
      ]
    },
    {
      id: 'red-blue-team',
      title: 'Red Team / Blue Team Exercise',
      description: 'Simulate attack scenarios and test your defense capabilities with expert offensive and defensive security teams.',
      category: 'managed',
      icon: <Target className="h-8 w-8 text-secondary" />,
      iconColor: 'secondary',
      features: [
        { text: 'Attack simulation' },
        { text: 'Defense evaluation' },
        { text: 'Strategic improvement' },
        { text: 'Team training' },
        { text: 'Security control validation' }
      ]
    },
    {
      id: 'soc-service',
      title: 'SOC as a Service',
      description: 'Outsourced Security Operations Center (SOC) for 24/7 monitoring, detection, and response to security threats.',
      category: 'managed',
      icon: <Server className="h-8 w-8 text-primary" />,
      iconColor: 'primary',
      features: [
        { text: '24/7 security monitoring' },
        { text: 'Threat detection & analysis' },
        { text: 'Alert triage & response' },
        { text: 'Security incident management' },
        { text: 'Regular security reporting' }
      ]
    },
    
    // Integration Services
    {
      id: 'solution-implementation',
      title: 'Solution Design & Implementation',
      description: 'Custom security solution design and implementation to address your specific security needs.',
      category: 'integration',
      icon: <Code className="h-8 w-8 text-primary" />,
      iconColor: 'primary',
      features: [
        { text: 'Security requirements analysis' },
        { text: 'Solution architecture design' },
        { text: 'Implementation planning' },
        { text: 'System integration' },
        { text: 'Post-implementation support' }
      ]
    },
    {
      id: 'product-integration',
      title: 'Product Integrations',
      description: 'Seamless integration of security products into your existing infrastructure.',
      category: 'integration',
      icon: <Database className="h-8 w-8 text-secondary" />,
      iconColor: 'secondary',
      features: [
        { text: 'Security tool integration' },
        { text: 'API integration development' },
        { text: 'Legacy system compatibility' },
        { text: 'Data flow optimization' },
        { text: 'Integration testing' }
      ]
    },
    
    // Training Services
    {
      id: 'custom-training',
      title: 'Customized Training Programs',
      description: "Tailored cybersecurity training programs designed for your organization's specific needs.",
      category: 'training',
      icon: <Users className="h-8 w-8 text-primary" />,
      iconColor: 'primary',
      features: [
        { text: 'Needs assessment' },
        { text: 'Custom curriculum development' },
        { text: 'Hands-on training labs' },
        { text: 'Expert instruction' },
        { text: 'Progress tracking & assessment' }
      ]
    },
    {
      id: 'corporate-training',
      title: 'Corporate Security Training',
      description: 'Security awareness and skill development training for corporate teams.',
      category: 'training',
      icon: <Lock className="h-8 w-8 text-secondary" />,
      iconColor: 'secondary',
      features: [
        { text: 'Security awareness training' },
        { text: 'Role-based security training' },
        { text: 'Security policy education' },
        { text: 'Social engineering defense' },
        { text: 'Secure coding practices' }
      ]
    }
  ];
  
  // Filter services based on active tab
  const filteredServices = activeCategory === 'all' 
    ? servicesData 
    : servicesData.filter(service => service.category === activeCategory);

  return (
    <div className="min-h-screen bg-dark">
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
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our <span className="gradient-text">Services</span></h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive cybersecurity solutions to protect your digital assets and strengthen your security posture
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      
      {/* Services Categories */}
      <section className="py-8 bg-dark-100 sticky top-16 z-30 border-b border-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-dark'
                    : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <StaggerItem key={service.id}>
                  <div className="glass-card overflow-hidden h-full flex flex-col hover:border-primary/30 transition-all duration-300">
                    <div className="p-6 pb-4 border-b border-dark-300">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0`}>
                          {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-light">{service.title}</h3>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle size={16} className={`mr-2 mt-0.5 flex-shrink-0 ${service.iconColor === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                              <span className="text-gray-300 text-sm">{feature.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-dark-200/50 mt-auto">
                      <Suspense fallback={
                        <div className="text-primary text-sm font-medium flex items-center justify-center gap-1 opacity-70">
                          Loading...
                        </div>
                      }>
                        <Link 
                          href={`/services/${service.id}`}
                          className={`text-${service.iconColor === 'primary' ? 'primary' : 'secondary'} hover:text-${service.iconColor === 'primary' ? 'primary' : 'secondary'}/80 text-sm font-medium flex items-center justify-center gap-1`}
                        >
                          Learn More
                          <ChevronRight size={16} />
                        </Link>
                      </Suspense>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>
      
      {/* Service Process */}
      <section className="py-16 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Service <span className="gradient-text">Process</span></h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We follow a systematic approach to deliver high-quality security services
              </p>
            </div>
          </AnimateOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <AnimateOnScroll animation="fadeInLeft" delay={0.1}>
              <div className="glass-card p-6 relative">
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-dark font-bold text-sm">1</div>
                <h3 className="text-xl font-bold text-light mb-3">Assessment</h3>
                <p className="text-gray-300 text-sm">
                  We begin by understanding your security needs and assessing your current environment to identify gaps and requirements.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInLeft" delay={0.2}>
              <div className="glass-card p-6 relative">
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-dark font-bold text-sm">2</div>
                <h3 className="text-xl font-bold text-light mb-3">Planning</h3>
                <p className="text-gray-300 text-sm">
                  We develop a customized implementation plan tailored to your specific security requirements and organizational goals.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInLeft" delay={0.3}>
              <div className="glass-card p-6 relative">
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-dark font-bold text-sm">3</div>
                <h3 className="text-xl font-bold text-light mb-3">Implementation</h3>
                <p className="text-gray-300 text-sm">
                  Our team of experts executes the security solution with minimal disruption to your operations.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInLeft" delay={0.4}>
              <div className="glass-card p-6 relative">
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-dark font-bold text-sm">4</div>
                <h3 className="text-xl font-bold text-light mb-3">Continuous Support</h3>
                <p className="text-gray-300 text-sm">
                  We provide ongoing monitoring, optimization, and support to ensure your security measures remain effective.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Enhance Your Security Posture?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get in touch with our security experts to discuss your cybersecurity needs and find the right solutions for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Suspense fallback={
                <div className="bg-gradient-to-r from-primary to-secondary text-dark font-bold py-3 px-8 rounded-md inline-flex items-center justify-center opacity-70">
                  Loading...
                </div>
              }>
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-8 rounded-md transition-all transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Contact Our Team
                  <ChevronRight size={18} className="ml-2" />
                </Link>
              </Suspense>
              <Suspense fallback={
                <div className="bg-transparent border border-primary text-primary font-bold py-3 px-8 rounded-md inline-flex items-center justify-center opacity-70">
                  Loading...
                </div>
              }>
                <Link
                  href="/contact?type=demo"
                  className="bg-transparent border border-primary text-primary hover:bg-primary/10 font-bold py-3 px-8 rounded-md transition-all inline-flex items-center justify-center"
                >
                  Request a Demo
                </Link>
              </Suspense>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}