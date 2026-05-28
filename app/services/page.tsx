'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/motion/MotionComponents';
import { LineChart, Shield, Code, Users, CheckCircle, ChevronRight, Globe, Target, AlertTriangle, Server, Database, Lock, Briefcase } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// Service type
type Service = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon?: React.ReactNode;
  iconColor?: 'primary' | 'secondary';
  features: string[] | { text: string }[];
  featured?: boolean;
  price?: string;
  tags?: string[];
};

// Empty array - all services will come from Firestore
const fallbackServicesData: Service[] = [];

// Categories data
const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'consulting', name: 'Strategy & Consulting' },
  { id: 'managed', name: 'Managed Services' },
  { id: 'integration', name: 'Integration Services' },
  { id: 'training', name: 'Training Services' },
];

// Main content component
function ServicesList() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch services from Firestore
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesQuery = query(collection(db, 'services'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(servicesQuery);
        const firestoreServices = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            icon: <Briefcase className="h-8 w-8 text-primary" />, // Default icon
            iconColor: 'primary' as const,
            // Ensure features is in the correct format
            features: Array.isArray(data.features) 
              ? data.features.map((f: string | { text: string }) => 
                  typeof f === 'string' ? { text: f } : f
                )
              : []
          };
        }) as Service[];
        
        // Combine Firestore services with fallback services
        const combinedServices = [...firestoreServices, ...fallbackServicesData];
        
        // Remove duplicates based on id
        const uniqueServices = Array.from(
          new Map(combinedServices.map(service => [service.id, service])).values()
        );
        
        setServices(uniqueServices);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Use fallback data if Firestore fails
        setServices(fallbackServicesData);
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);
  
  // Filter services based on active tab
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

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
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300">Loading services...</p>
            </div>
          ) : (
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
                              <span className="text-gray-300 text-sm">{typeof feature === 'string' ? feature : feature.text}</span>
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
          )}
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
    </>
  );
}

// Main Page Component with full suspense boundary
export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-dark"><p>Loading services...</p></div>}>
      <div className="min-h-screen bg-dark">
        <Navbar />
        <ServicesList />
        <Footer />
      </div>
    </Suspense>
  );
}
