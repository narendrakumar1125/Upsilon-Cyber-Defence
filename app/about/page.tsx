'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/motion/MotionComponents';
import { Check, Award, Globe, Shield, Users, BookOpen, Target, ChevronRight } from 'lucide-react';

// Extract content components to wrap in Suspense
function AboutContent() {
  // Team members data
  const teamMembers = [
    {
      name: 'Leadership Team',
      role: 'Management',
      description: 'Our leadership team brings decades of industry experience in cybersecurity, training, and technology management.',
      image: '/team-leadership.jpg' // Replace with actual image path
    },
    {
      name: 'Cybersecurity Experts',
      role: 'Technical Team',
      description: 'Our technical team consists of certified security professionals with hands-on experience in various security domains.',
      image: '/team-technical.jpg' // Replace with actual image path
    },
    {
      name: 'Training Specialists',
      role: 'Education',
      description: 'Our training specialists design curriculum and provide hands-on learning experiences for students at all levels.',
      image: '/team-training.jpg' // Replace with actual image path
    }
  ];
  
  // Core values
  const coreValues = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from course content to customer service.',
      icon: <Award className="h-6 w-6 text-primary" />
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate our training methods and services to stay ahead of evolving threats.',
      icon: <Target className="h-6 w-6 text-primary" />
    },
    {
      title: 'Integrity',
      description: 'We operate with the highest level of integrity and ethical standards in all our interactions.',
      icon: <Shield className="h-6 w-6 text-primary" />
    },
    {
      title: 'Community',
      description: 'We foster a supportive community of learners and security professionals.',
      icon: <Users className="h-6 w-6 text-primary" />
    },
    {
      title: 'Knowledge',
      description: 'We believe in sharing knowledge and empowering others through education.',
      icon: <BookOpen className="h-6 w-6 text-primary" />
    },
    {
      title: 'Global Perspective',
      description: 'We embrace diverse perspectives and global approaches to cybersecurity challenges.',
      icon: <Globe className="h-6 w-6 text-primary" />
    }
  ];

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
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">About <span className="gradient-text">Upsilon Cyber Defence</span></h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We're on a mission to create the next generation of cybersecurity experts through high-quality training and innovative security solutions.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll animation="fadeInLeft">
              <div className="glass-card p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-300 mb-6">
                  Upsilon Cyber Defence was founded in 2021 in Bangalore, India, with a clear vision: to bridge the gap between cybersecurity education and real-world industry needs.
                </p>
                <p className="text-gray-300 mb-6">
                  We noticed that many cybersecurity training programs weren't providing the hands-on experience that employers were looking for. Our founding team of security experts came together to build a training platform that focuses on practical skills and real-world scenarios.
                </p>
                <p className="text-gray-300">
                  Today, we've grown into a comprehensive cybersecurity training and services company, helping individuals advance their careers and organizations strengthen their security posture through education and innovative solutions.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fadeInRight">
              <div className="glass-card p-8 h-full">
                <h2 className="text-3xl font-bold mb-6">What Sets Us Apart</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold text-light">Hands-on Learning</h3>
                      <p className="text-gray-300 text-sm">Our training programs focus on practical, hands-on experience with real-world scenarios and tools.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold text-light">Industry Expert Instructors</h3>
                      <p className="text-gray-300 text-sm">Learn from professionals with years of experience in the cybersecurity field.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold text-light">Comprehensive Curriculum</h3>
                      <p className="text-gray-300 text-sm">Our courses cover the latest technologies, tools, and techniques in cybersecurity.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold text-light">Personalized Support</h3>
                      <p className="text-gray-300 text-sm">Our team provides individual attention and support to each student throughout their learning journey.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold text-light">Career Guidance</h3>
                      <p className="text-gray-300 text-sm">We help students navigate the cybersecurity job market and prepare for certification exams.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </AnimateOnScroll>
          </div>

        </div>
      </section>
      
      {/* Core Values Section */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Core <span className="gradient-text">Values</span></h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                These fundamental principles guide everything we do at Upsilon Cyber Defence
              </p>
            </div>
          </AnimateOnScroll>
          
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <StaggerItem key={index}>
                  <div className="glass-card p-6 h-full hover:border-primary/30 transition-all group">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-light mb-3">{value.title}</h3>
                    <p className="text-gray-300">{value.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 bg-gradient-to-b from-dark-100 to-dark relative overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-primary/10 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-secondary/10 rounded-full filter blur-[80px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our <span className="gradient-text">Team</span></h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Meet the experts behind Upsilon Cyber Defence
              </p>
            </div>
          </AnimateOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <AnimateOnScroll key={index} animation="scaleUp" delay={index * 0.1}>
                <div className="glass-card overflow-hidden rounded-lg h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden flex items-center justify-center">
                    <div className="text-4xl font-bold text-gray-300/50">{member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-light mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-4">{member.role}</p>
                    <p className="text-gray-300 text-sm flex-grow">{member.description}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll animation="scaleUp">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Start Your Cybersecurity Journey?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of learners and take the first step toward a rewarding career in cybersecurity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-8 rounded-md transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Explore Our Courses
                <ChevronRight size={18} className="ml-2" />
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border border-primary text-primary hover:bg-primary/10 font-bold py-3 px-8 rounded-md transition-all inline-flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}

// Main page content with layout elements
function AboutPageContent() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <AboutContent />
      <Footer />
    </div>
  );
}

// Main page component with Suspense boundary at the top level
export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-dark"><p>Loading...</p></div>}>
      <AboutPageContent />
    </Suspense>
  );
}
