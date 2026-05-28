'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { AnimateOnScroll } from '@/components/motion/MotionComponents';
import { ChevronLeft, Check, LineChart, Shield, Code, Users, CheckCircle, Briefcase } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Service type definition for TypeScript
type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  overview: string;
  benefits: string[];
  features: any[];
  process: { step: string; description: string }[];
  caseStudyTitle?: string;
  caseStudyDescription?: string;
};

const ServiceDetail = () => {
  // Use the useParams hook to get the service ID
  const params = useParams();
  const serviceId = params.id as string;
  
  // Local state to store the service data
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch service data on component mount
  useEffect(() => {
    const fetchService = async () => {
      try {
        // First try to fetch from Firestore
        const serviceDoc = await getDoc(doc(db, 'services', serviceId));
        
        if (serviceDoc.exists()) {
          const data = serviceDoc.data();
          const serviceData: Service = { 
            id: serviceDoc.id, 
            title: data.title || '',
            description: data.description || '',
            icon: <Briefcase className="h-10 w-10 text-primary" />, // Default icon
            iconColor: data.iconColor || 'primary',
            overview: data.overview || data.description || '', // Use description as overview if overview is missing
            benefits: data.benefits || [],
            process: data.process || [],
            // Convert features to expected format
            features: data.features ? data.features.map((f: any) => 
              typeof f === 'string' ? { title: f, description: '' } : f
            ) : [],
            caseStudyTitle: data.caseStudyTitle,
            caseStudyDescription: data.caseStudyDescription
          };
          setService(serviceData);
          setLoading(false);
          return;
        }
        
        // If not found in Firestore, check hardcoded data as fallback
        const servicesData: Service[] = [
        {
          id: 'strategy-consulting',
          title: 'Strategy & Architecture Consulting',
          description: 'Expert guidance on cybersecurity architecture design, risk assessment, and governance frameworks to strengthen your security posture.',
          icon: <LineChart className="h-10 w-10 text-primary" />,
          iconColor: 'primary',
          overview: 'Our Strategy & Architecture Consulting services provide expert guidance to help organizations develop and implement effective cybersecurity strategies. We work closely with your team to assess your current security posture, identify vulnerabilities, and create a comprehensive roadmap for enhancing your security architecture.',
          benefits: [
            'Comprehensive assessment of your current security posture',
            'Identification of security gaps and vulnerabilities',
            'Strategic roadmap for security architecture enhancement',
            'Alignment of security strategy with business objectives',
            'Compliance with industry regulations and standards',
            'Risk reduction and improved security ROI'
          ],
          features: [
            {
              title: 'Architecture Assessment Services',
              description: 'We evaluate your existing security architecture to identify strengths, weaknesses, and areas for improvement, ensuring alignment with industry best practices.'
            },
            {
              title: 'Governance & Compliance',
              description: 'Our experts help establish robust governance frameworks and ensure compliance with relevant regulations and standards such as GDPR, HIPAA, PCI DSS, and ISO 27001.'
            },
            {
              title: 'Risk Assessment Services',
              description: 'We conduct comprehensive risk assessments to identify, analyze, and prioritize security risks, enabling informed decision-making for risk mitigation.'
            },
            {
              title: 'Project Management',
              description: 'Our experienced project managers oversee the implementation of security initiatives, ensuring they are completed on time, within budget, and meet all requirements.'
            }
          ],
          process: [
            {
              step: 'Initial Assessment',
              description: 'Evaluate current security architecture, policies, and procedures to establish a baseline.'
            },
            {
              step: 'Gap Analysis',
              description: 'Identify gaps between current state and desired security posture or compliance requirements.'
            },
            {
              step: 'Strategy Development',
              description: 'Create a tailored security strategy and roadmap aligned with business objectives.'
            },
            {
              step: 'Implementation Planning',
              description: 'Develop detailed plans for implementing recommended security controls and enhancements.'
            },
            {
              step: 'Ongoing Support',
              description: 'Provide continued guidance and support throughout implementation and beyond.'
            }
          ],
          caseStudyTitle: 'Financial Services Firm Security Transformation',
          caseStudyDescription: 'We helped a mid-sized financial services firm strengthen their security posture after a security incident. Our team conducted a comprehensive assessment, developed a new security architecture, and implemented robust governance frameworks. The result was a 65% reduction in security vulnerabilities and full compliance with industry regulations.'
        },
        {
          id: 'managed-services',
          title: 'Managed Services',
          description: 'Comprehensive managed security services including incident response, SOC operations, and application security testing to protect your digital assets.',
          icon: <Shield className="h-10 w-10 text-secondary" />,
          iconColor: 'secondary',
          overview: 'Our Managed Security Services provide continuous monitoring, detection, and response capabilities to protect your organization from evolving cyber threats. We operate as an extension of your team, offering 24/7 security operations center (SOC) capabilities, incident response, and proactive threat hunting.',
          benefits: [
            'Round-the-clock security monitoring and threat detection',
            'Rapid incident response to minimize impact of security events',
            'Reduced burden on internal security teams',
            'Access to specialized security expertise',
            'Improved threat visibility across your environment',
            'Cost-effective alternative to building an in-house SOC'
          ],
          features: [
            {
              title: 'Incident Response (DFIR)',
              description: 'Our Digital Forensics and Incident Response team provides rapid response to security incidents, conducting thorough investigations and guiding effective remediation efforts.'
            },
            {
              title: 'Red Team / Blue Team Exercise',
              description: 'We conduct simulated cyber attacks to test your defenses, followed by collaborative analysis to improve detection and response capabilities.'
            },
            {
              title: 'SOC as a Service',
              description: 'Our 24/7 Security Operations Center monitors your environment for threats, provides alerts for suspicious activities, and initiates response actions when needed.'
            },
            {
              title: 'Application Security Testing',
              description: 'We conduct comprehensive security testing of your applications, including static and dynamic analysis, to identify and address vulnerabilities before they can be exploited.'
            }
          ],
          process: [
            {
              step: 'Service Onboarding',
              description: 'Deploy necessary monitoring tools and integrate with your existing security infrastructure.'
            },
            {
              step: 'Security Baseline',
              description: 'Establish normal behavior patterns to enable effective anomaly detection.'
            },
            {
              step: 'Continuous Monitoring',
              description: 'Provide 24/7 monitoring and alerting for security events across your environment.'
            },
            {
              step: 'Threat Detection & Response',
              description: 'Identify and respond to security incidents according to established procedures.'
            },
            {
              step: 'Regular Reporting',
              description: 'Deliver detailed reports on security events, trends, and recommendations.'
            }
          ],
          caseStudyTitle: 'Healthcare Provider Security Operations',
          caseStudyDescription: 'A regional healthcare provider engaged our SOC as a Service to enhance their security monitoring capabilities. Within the first month, our team detected and contained a ransomware attack in its early stages, preventing data encryption and potentially saving millions in recovery costs and reputational damage.'
        },
        {
          id: 'integration-services',
          title: 'Integration Services',
          description: 'Seamless security solution integration services, from design to implementation, ensuring optimal functionality and protection across your systems.',
          icon: <Code className="h-10 w-10 text-primary" />,
          iconColor: 'primary',
          overview: 'Our Integration Services help organizations implement and integrate security solutions into their existing infrastructure. From solution design to deployment and optimization, we ensure your security tools work together seamlessly to provide comprehensive protection.',
          benefits: [
            'Seamless integration of security solutions with existing infrastructure',
            'Elimination of security gaps between different tools and systems',
            'Optimized security tool performance and effectiveness',
            'Reduced complexity in security architecture',
            'Maximized return on security investments',
            'Enhanced visibility across security controls'
          ],
          features: [
            {
              title: 'Solution Design & Implementation',
              description: 'We design and implement security solutions tailored to your specific needs, ensuring they integrate effectively with your existing environment.'
            },
            {
              title: 'Product Integrations',
              description: 'Our experts integrate various security products and platforms to create a cohesive security ecosystem with centralized management and visibility.'
            },
            {
              title: 'Custom Security Solutions',
              description: 'We develop custom security solutions when standard offerings don\'t meet your specific requirements, ensuring you have the exact capabilities you need.'
            },
            {
              title: 'API Security',
              description: 'We implement robust security controls for APIs, ensuring secure communications between applications and services across your infrastructure.'
            }
          ],
          process: [
            {
              step: 'Requirements Gathering',
              description: 'Understand your specific security needs, existing infrastructure, and business objectives.'
            },
            {
              step: 'Solution Design',
              description: 'Develop a comprehensive design for integrating security solutions into your environment.'
            },
            {
              step: 'Proof of Concept',
              description: 'Create and test a proof of concept in a controlled environment to verify effectiveness.'
            },
            {
              step: 'Implementation',
              description: 'Deploy the solution in your production environment with minimal disruption to operations.'
            },
            {
              step: 'Optimization & Support',
              description: 'Fine-tune the implementation and provide ongoing support to ensure continued effectiveness.'
            }
          ],
          caseStudyTitle: 'Manufacturing Company SIEM Implementation',
          caseStudyDescription: 'We helped a multinational manufacturing company integrate a SIEM solution with over 20 different security tools and data sources. The implementation provided centralized visibility into security events across their global operations, reducing investigation time by 60% and enabling more effective threat detection and response.'
        },
        {
          id: 'security-trainings',
          title: 'Cyber Security Trainings',
          description: 'Specialized cyber security training programs tailored for both individuals and organizations, focusing on practical, hands-on learning experiences.',
          icon: <Users className="h-10 w-10 text-secondary" />,
          iconColor: 'secondary',
          overview: `Our Cyber Security Training programs provide comprehensive education in various cybersecurity domains. 
          We offer both standardized and customized training solutions for individuals seeking to advance their careers and 
          organizations looking to enhance their security team's capabilities.`,
          benefits: [
            'Practical, hands-on learning experiences',
            'Training tailored to specific roles and skill levels',
            'Industry-relevant content aligned with current threats',
            'Development of both technical and strategic security skills',
            'Preparation for recognized security certifications',
            'Improved security awareness across the organization'
          ],
          features: [
            {
              title: 'Customized Training Programs',
              description: 'We develop training programs tailored to your organization\'s specific security needs, industry context, and technology environment.'
            },
            {
              title: 'Internship Programs',
              description: 'Our internship programs provide aspiring security professionals with practical experience and mentorship to kickstart their careers in cybersecurity.'
            },
            {
              title: 'Corporate Security Training',
              description: 'We deliver comprehensive security training for corporate teams, covering both general security awareness and specialized skills for security professionals.'
            },
            {
              title: 'Hands-on Workshops',
              description: 'Our interactive workshops provide practical experience with tools and techniques used in real-world security operations and incident response scenarios.'
            }
          ],
          process: [
            {
              step: 'Needs Assessment',
              description: 'Identify specific training requirements and skills gaps to be addressed.'
            },
            {
              step: 'Training Design',
              description: 'Develop a customized curriculum and learning materials based on identified needs.'
            },
            {
              step: 'Training Delivery',
              description: 'Deliver training through a combination of instruction, demonstrations, and hands-on exercises.'
            },
            {
              step: 'Knowledge Assessment',
              description: 'Evaluate participants\' understanding and skills through various assessment methods.'
            },
            {
              step: 'Continuous Improvement',
              description: 'Gather feedback and continuously enhance training content and delivery methods.'
            }
          ],
          caseStudyTitle: 'Tech Company Security Upskilling',
          caseStudyDescription: 'We developed and delivered a comprehensive security training program for a technology company transitioning their development team to a DevSecOps model. The program included both awareness training for all developers and specialized tracks for security champions. After six months, security vulnerabilities in code decreased by 45%, and the team successfully integrated security practices into their development lifecycle.'
        }
      ];
      
        const foundService = servicesData.find(s => s.id === serviceId);
        
        if (foundService) {
          setService(foundService);
        } else {
          // Handle service not found
          console.error('Service not found');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service:', error);
        setLoading(false);
      }
    };
    
    fetchService();
  }, [serviceId]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-light flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }
  
  if (!service) {
    return (
      <div className="min-h-screen bg-dark text-light flex items-center justify-center">
        <div className="text-2xl">Service not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-light">
      <Navbar />
      
      {/* Service Detail Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-dark to-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/services" 
            className="inline-flex items-center text-gray-400 hover:text-primary mb-6 transition-colors"
          >
            <ChevronLeft size={18} />
            <span>Back to Services</span>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
              {service.icon}
            </div>
            
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{service.title}</h1>
              <p className="text-gray-300 text-lg max-w-3xl mb-8">{service.overview}</p>
              
              <Link
                href="/contact"
                className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105 inline-block"
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Key Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start glass-card p-4">
                  <CheckCircle className={`text-${service.iconColor} h-6 w-6 mr-3 flex-shrink-0`} />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Offerings</h2>
            
            <div className="space-y-8">
              {service.features.map((feature, index) => (
                <div key={index} className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3 text-light">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Process</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary hidden md:block"></div>
              
              <div className="space-y-8">
                {service.process.map((step, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-start gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-dark font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="glass-card p-6 w-full">
                      <h3 className="text-xl font-bold mb-2">{step.step}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      
      {/* Case Study Section (if available) */}
      {service.caseStudyTitle && (
        <section className="py-16 bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll animation="fadeInUp">
              <div className="glass-card p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Case Study: {service.caseStudyTitle}</h2>
                <p className="text-gray-300">{service.caseStudyDescription}</p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss how our {service.title} can help strengthen your organization's security posture.
            </p>
            <Suspense fallback={
              <div className="bg-gradient-to-r from-primary to-secondary text-dark font-bold py-3 px-8 rounded-md inline-block opacity-70">
                Loading...
              </div>
            }>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-8 rounded-md transition-all transform hover:scale-105 inline-block"
              >
                Request a Consultation
              </Link>
            </Suspense>
          </AnimateOnScroll>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;