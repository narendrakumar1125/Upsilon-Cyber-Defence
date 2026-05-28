'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { Phone, Mail, MapPin, MessageSquare, Calendar, User, BookOpen } from 'lucide-react';

// Contact form component that might use useSearchParams
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      setFormData({ name: '', email: '', mobile: '', subject: '', message: '', inquiryType: 'general' });
      
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
    <div className="glass-card p-8">
      <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
      
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
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="inquiryType" className="block text-gray-300 text-sm font-bold mb-2">
            I'm interested in:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div 
              className={`p-4 rounded-lg text-center cursor-pointer transition-all ${formData.inquiryType === 'general' ? 'bg-primary/20 border border-primary' : 'bg-dark-200 border border-dark-300 hover:bg-dark-300'}`}
              onClick={() => setFormData({...formData, inquiryType: 'general'})}
            >
              <MessageSquare className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-sm font-medium">General Inquiry</div>
            </div>
            <div 
              className={`p-4 rounded-lg text-center cursor-pointer transition-all ${formData.inquiryType === 'courses' ? 'bg-primary/20 border border-primary' : 'bg-dark-200 border border-dark-300 hover:bg-dark-300'}`}
              onClick={() => setFormData({...formData, inquiryType: 'courses'})}
            >
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-sm font-medium">Courses</div>
            </div>
            <div 
              className={`p-4 rounded-lg text-center cursor-pointer transition-all ${formData.inquiryType === 'demo' ? 'bg-primary/20 border border-primary' : 'bg-dark-200 border border-dark-300 hover:bg-dark-300'}`}
              onClick={() => setFormData({...formData, inquiryType: 'demo'})}
            >
              <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-sm font-medium">Book a Demo</div>
            </div>
            <div 
              className={`p-4 rounded-lg text-center cursor-pointer transition-all ${formData.inquiryType === 'corporate' ? 'bg-primary/20 border border-primary' : 'bg-dark-200 border border-dark-300 hover:bg-dark-300'}`}
              onClick={() => setFormData({...formData, inquiryType: 'corporate'})}
            >
              <User className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-sm font-medium">Corporate Training</div>
            </div>
          </div>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
              Name*
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
            <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
              Email*
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="mobile" className="block text-gray-300 text-sm font-bold mb-2">
              Mobile Number*
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="bg-dark-200 border border-dark-300 text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary"
              placeholder="Your Mobile Number"
              required
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-gray-300 text-sm font-bold mb-2">
              Subject*
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
        </div>
        
        <div>
          <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">
            Message*
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
  );
}

// Contact information component
function ContactInfo() {
  return (
    <div>
      <div className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md flex items-center justify-center mr-4">
              <User className="h-5 w-5 text-primary" />
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
              <a href="tel:+917997888844" className="text-gray-400 hover:text-primary transition-colors">
                +91 7997888844
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md flex items-center justify-center mr-4">
              <Mail className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <div className="font-bold text-light">Email</div>
              <a href="mailto:support@upsilonsecurity.com" className="text-gray-400 hover:text-primary transition-colors">
                support@upsilonsecurity.com
              </a>
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
      
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
        <p className="text-gray-300 mb-6">
          Follow us on social media for the latest updates, cybersecurity tips, and course announcements.
        </p>
        <div className="flex space-x-4">
          <a 
            href="https://www.facebook.com/Upsilon-Solutions-103330029077057" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-dark-200 hover:bg-dark-300 rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
            </svg>
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-dark-200 hover:bg-dark-300 rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </a>
          <a 
            href="https://www.linkedin.com/company/upsilon-cyber-defense/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-dark-200 hover:bg-dark-300 rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" clipRule="evenodd"></path>
            </svg>
          </a>
          <a 
            href="https://www.instagram.com/upsilonsolutions/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-dark-200 hover:bg-dark-300 rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// FAQ section
function FAQSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our courses and services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-2">How do I enroll in a course?</h3>
            <p className="text-gray-300">
              You can enroll in a course by navigating to the course page and clicking the "Enroll Now" button. Follow the instructions to complete the payment process and gain access to the course materials.
            </p>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-2">Are the courses self-paced or scheduled?</h3>
            <p className="text-gray-300">
              We offer both self-paced and instructor-led scheduled courses. Each course page indicates whether it is self-paced or follows a specific schedule with live sessions.
            </p>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-2">Do you offer corporate training?</h3>
            <p className="text-gray-300">
              Yes, we provide customized corporate training programs for teams and organizations. Contact us through the form above to discuss your specific requirements.
            </p>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-2">What is your refund policy?</h3>
            <p className="text-gray-300">
              Our refund policy allows for refunds within 7 days of purchase if you're not satisfied with the course. Special circumstances may also qualify for refunds outside this window. View our <Link href="/policy" className="text-primary hover:underline">Refund Policy</Link> page for more details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Content Component
function ContactPageContent() {
  return (
    <div className="min-h-screen bg-dark">
      {/* Navbar is added in the main wrapper */}
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-dark to-dark-100 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cyber-grid opacity-10" style={{
            transform: 'perspective(1000px) rotateX(60deg)',
            transformOrigin: 'top',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Get in <span className="gradient-text">Touch</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions about our courses or services? We're here to help!
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Column */}
            <div className="lg:col-span-1">
              <Suspense fallback={<div className="glass-card p-8 mb-8">Loading contact information...</div>}>
                <ContactInfo />
              </Suspense>
            </div>
            
            {/* Contact Form Column */}
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="glass-card p-8 text-center">Loading contact form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-4">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8293428608934!2d77.63249531482124!3d12.91605369088787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15f188b0acb7%3A0xc0e79b212b01a393!2sChikkabegur%2C%20Bengaluru%2C%20Karnataka%20560100!5e0!3m2!1sen!2sin!4v1588888888888!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{border: 0}}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Upsilon Cyber Defence Location"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <Suspense fallback={<div className="py-16 text-center">Loading FAQ section...</div>}>
        <FAQSection />
      </Suspense>
    </div>
  );
}

// Main Page Component with Suspense Boundary
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading contact page...</p></div>}>
        <ContactPageContent />
      </Suspense>
      
      <Footer />
    </div>
  );
}
