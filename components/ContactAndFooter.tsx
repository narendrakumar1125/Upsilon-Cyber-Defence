import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { AnimateOnScroll } from './motion/MotionComponents';

// Trust Signals Section
export const TrustSignals = () => {
  return (
    <AnimateOnScroll animation="fadeInUp" delay={0.1}>
      <section className="premium-section py-20 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Secured By Statement */}
        <div className="mb-12 text-center">
          <p className="premium-eyebrow mb-3 inline-block rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-1">
            Security Credentials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by enterprise teams and audited to the highest standards
          </h2>
          <p className="text-slate-400 text-base mb-4 max-w-3xl mx-auto">
            We deliver security programs that are mapped to SOC 2, ISO 27001, and other regulatory controls for critical systems.
          </p>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Our controls are independently reviewed, our processes are continuously validated, and our delivery is designed for mission-critical environments.
          </p>
        </div>

        {/* Logo Rail */}
        <div className="grid gap-4 sm:grid-cols-5 items-center justify-center mb-12">
          {['FortuneCL', 'FinServ', 'HealthSec', 'InfraOps', 'RetailX'].map((label) => (
            <div key={label} className="rounded-lg border border-slate-800 bg-slate-950/70 px-4 py-6 text-center text-sm font-semibold text-slate-400">
              {label}
            </div>
          ))}
        </div>

        {/* Certification Badges */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="premium-card p-6 text-center transition hover:border-sky-400/30">
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-lg border border-sky-300/20 bg-sky-500/10 text-sky-300">
              <span className="font-semibold">SOC 2</span>
            </div>
            <p className="text-base font-semibold text-white">SOC 2 Type II</p>
            <p className="mt-2 text-sm text-slate-400">Continuous control assurance with evidence-backed reporting.</p>
          </div>

          <div className="premium-card p-6 text-center transition hover:border-sky-400/30">
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-lg border border-sky-300/20 bg-sky-500/10 text-sky-300">
              <span className="font-semibold">ISO</span>
            </div>
            <p className="text-base font-semibold text-white">ISO 27001</p>
            <p className="mt-2 text-sm text-slate-400">Structured information security management for long-term resilience.</p>
          </div>
        </div>

        {/* Additional Trust Information */}
        <div className="mt-12 pt-10 border-t border-slate-800/60 text-center text-sm text-slate-500">
          These certifications are validated by independent auditors and reflected in our delivery controls, incident response capabilities, and change management process.
        </div>
      </div>
    </section>
    </AnimateOnScroll>
  );
};

// Contact Section
export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // In a real application, you would send the form data to your backend
      // This is a mockup of that process
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimateOnScroll animation="fadeInUp" delay={0.2}>
      <section id="contact" className="py-20 bg-gradient-to-b from-dark to-dark-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Contact <span className="gradient-text">Us</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-6 text-light">Get In Touch</h3>
              <p className="text-gray-300 mb-8">
                Have questions about our courses or services? Reach out to our team for prompt assistance.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md flex items-center justify-center mr-4">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-light">Contact Person</div>
                    <div className="text-gray-400">Divakar Viswanadh</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-light">Phone</div>
                    <div className="text-gray-400">7997888844</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-bold text-light">Email</div>
                    <div className="text-gray-400">support@upsilonsecurity.com</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-light">Address</div>
                    <div className="text-gray-400">
                      Sri Venkata Builders, 4th floor, 2nd main road, Chikkabegur, Bangalore, Karnataka 560068
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-bold text-light">Address</div>
                    <div className="text-gray-400">
                      Dno:1-136, main road, chinamuslwada, opposite canara bank, pendurthi, visakhapatnam -530051
                    </div>
                    <div className="text-gray-400 mt-1">
                      Ph: 7569320032
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-6 text-light">Send Us a Message</h3>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-primary/20 border border-primary text-light rounded-md">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500 text-light rounded-md">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-dark-200 border border-dark-300 text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-dark-200 border border-dark-300 text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-dark-200 border border-dark-300 text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary"
                    placeholder="Subject"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="bg-dark-200 border border-dark-300 text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </AnimateOnScroll>
  );
};

// Footer Section
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <AnimateOnScroll animation="fadeInUp" delay={0.3}>
      <footer className="bg-[#05070d] text-gray-300 pt-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg border border-sky-300/25 bg-slate-950 text-sky-200 shadow-lg shadow-sky-950/30">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-light">Upsilon Cyber Defence</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Cybersecurity services, training, and operational support for teams building resilient digital systems.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/Upsilon-Solutions-103330029077057" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-light transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-light transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/upsilon-cyber-defense/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-light transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/upsilonsolutions/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-light transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-light mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/strategy-consulting" className="text-gray-400 hover:text-primary transition-colors">Strategy & Consulting</Link>
              </li>
              <li>
                <Link href="/services/managed-services" className="text-gray-400 hover:text-primary transition-colors">Managed Services</Link>
              </li>
              <li>
                <Link href="/services/integration-services" className="text-gray-400 hover:text-primary transition-colors">Integration Services</Link>
              </li>
              <li>
                <Link href="/services/security-trainings" className="text-gray-400 hover:text-primary transition-colors">Cyber Security Trainings</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-light mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-primary transition-colors">Security Platform</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-primary transition-colors">Threat Detection</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-primary transition-colors">Incident Response</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-primary transition-colors">Security Analytics</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-light mb-4">Courses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses/cloud-security" className="text-gray-400 hover:text-primary transition-colors">Cloud Security</Link>
              </li>
              <li>
                <Link href="/courses/network-security" className="text-gray-400 hover:text-primary transition-colors">Network Security</Link>
              </li>
              <li>
                <Link href="/courses/devops-aws" className="text-gray-400 hover:text-primary transition-colors">DevOps AWS</Link>
              </li>
              <li>
                <Link href="/courses/devsecops" className="text-gray-400 hover:text-primary transition-colors">DevSecOps</Link>
              </li>
              <li>
                <Link href="/courses/siem-solutions" className="text-gray-400 hover:text-primary transition-colors">SIEM Solutions</Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-primary transition-colors">View All Courses →</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-light mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/instructor" className="text-gray-400 hover:text-primary transition-colors">Become an Instructor</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-gray-400 hover:text-primary transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 hover:text-primary transition-colors">Refund Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-sm">
            Copyright © {currentYear} Upsilon Cyber Defence. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
    </AnimateOnScroll>
  );
};
