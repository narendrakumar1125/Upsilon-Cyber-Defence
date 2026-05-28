'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { AnimateOnScroll } from '@/components/motion/MotionComponents';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// Course data - matches CourseDetail.tsx prices
const courseData = {
  // Cybersecurity courses
  'cloud-security': {
    id: 'cloud-security',
    title: 'Cloud Security',
    price: '30000',
  },
  'network-security': {
    id: 'network-security',
    title: 'Network Security',
    price: '35000',
  },
  'siem-solutions': {
    id: 'siem-solutions',
    title: 'SIEM Solutions',
    price: '32000',
  },
  // DevOps courses
  'ci-cd-pipelines': {
    id: 'ci-cd-pipelines',
    title: 'CI/CD Pipelines',
    price: '28000',
  },
  'docker-kubernetes': {
    id: 'docker-kubernetes',
    title: 'Docker & Kubernetes',
    price: '35000',
  },
  'infrastructure-as-code': {
    id: 'infrastructure-as-code',
    title: 'Infrastructure as Code',
    price: '30000',
  },
  // Cloud Computing courses
  'aws-fundamentals': {
    id: 'aws-fundamentals',
    title: 'AWS Fundamentals',
    price: '40000',
  },
  'azure-cloud': {
    id: 'azure-cloud',
    title: 'Microsoft Azure',
    price: '38000',
  },
  'gcp-essentials': {
    id: 'gcp-essentials',
    title: 'Google Cloud Platform',
    price: '36000',
  },
  // Data Science courses
  'data-analytics': {
    id: 'data-analytics',
    title: 'Data Analytics',
    price: '28000',
  },
  'machine-learning': {
    id: 'machine-learning',
    title: 'Machine Learning',
    price: '45000',
  },
  'big-data': {
    id: 'big-data',
    title: 'Big Data Analytics',
    price: '42000',
  },
  // Legacy courses (keeping for backward compatibility)
  'application-security': {
    id: 'application-security',
    title: 'Application Security',
    price: '35000',
  },
  'oscp-preparation': {
    id: 'oscp-preparation',
    title: 'OSCP Preparation',
    price: '50000',
  },
  'devops-aws': {
    id: 'devops-aws',
    title: 'DevOps for AWS',
    price: '45000',
  },
  'devops-azure': {
    id: 'devops-azure',
    title: 'DevOps for Azure',
    price: '45000',
  },
  'devsecops': {
    id: 'devsecops',
    title: 'DevSecOps',
    price: '48000',
  },
  'aws-certification': {
    id: 'aws-certification',
    title: 'AWS Certification',
    price: '25000',
  },
  'azure-certification': {
    id: 'azure-certification',
    title: 'Azure Certification',
    price: '25000',
  },
  'gcp-certification': {
    id: 'gcp-certification',
    title: 'GCP Certification',
    price: '25000',
  },
  'java-development': {
    id: 'java-development',
    title: 'Java Development',
    price: '35000',
  },
  'python-development': {
    id: 'python-development',
    title: 'Python Development',
    price: '35000',
  },
  'cyber-security-master': {
    id: 'cyber-security-master',
    title: 'Cyber Security Master',
    price: '60000',
  },
  'soar': {
    id: 'soar',
    title: 'SOAR',
    price: '40000',
  },
  'endpoint-security': {
    id: 'endpoint-security',
    title: 'Endpoint Security',
    price: '35000',
  },
  'threat-hunting': {
    id: 'threat-hunting',
    title: 'Threat Hunting',
    price: '45000',
  }
};

export default function CourseEnrollment() {
  const params = useParams();
  const courseId = params.id as string;
  const course = courseData[courseId as keyof typeof courseData] || {
    id: courseId,
    title: 'Course',
    price: '0'
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    course_name: course.title,
    course_id: courseId,
    amount: course.price,
  });
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call the Firebase Functions payment initiation API
      const response = await fetch('https://us-central1-cybernexgen-766e5.cloudfunctions.net/nextjsApi/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success && data.redirectUrl) {
        // Redirect to PhonePe payment page
        window.location.href = data.redirectUrl;
      } else {
        // Show detailed error message
        let errorMsg = data.error || 'Payment initiation failed. Please try again.';
        
        // Add helpful context for common errors
        if (errorMsg.includes('Invalid Merchant')) {
          errorMsg += ' Please contact support@cybernexgen.com for assistance.';
        }
        
        setError(errorMsg);
        setLoading(false);
        
        // Log error for debugging
        console.error('Payment initiation error:', data);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError('An error occurred. Please try again later.');
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-dark text-light">
      <Navbar />
      
      {/* Course Enrollment Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-dark to-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href={`/courses/${courseId}`} 
            className="inline-flex items-center text-gray-400 hover:text-primary mb-6 transition-colors"
          >
            <ChevronLeft size={18} />
            <span>Back to Course Details</span>
          </Link>
          
          <AnimateOnScroll animation="fadeInUp">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Enroll in {course.title}</h1>
            <p className="text-gray-300 text-lg max-w-3xl mb-6">
              Complete your enrollment by filling out the form below.
            </p>
          </AnimateOnScroll>
        </div>
      </section>
      
      {/* Enrollment Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Course Summary */}
            <div className="md:col-span-2">
              <div className="glass-card p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Course Summary</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400">Course Name</div>
                    <div className="font-bold">{course.title}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Price</div>
                    <div className="font-bold text-primary text-xl">₹{parseInt(course.price).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enrollment Form */}
            <div className="md:col-span-3">
              <div className="glass-card p-8">
                <h2 className="text-xl font-bold mb-6">Complete Your Enrollment</h2>
                
                {error && (
                  <div className="bg-red-900/30 text-red-300 p-4 rounded-md mb-6">
                    {error}
                  </div>
                )}
                
                {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
                <form  onSubmit={() => alert("Contact us for enrollment")} className="space-y-6">
                  {/* Hidden fields */}
                  <input type="hidden" name="course_name" value={course.title} />
                  <input type="hidden" name="amount" value={course.price} />
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-dark-200 border border-dark-300 text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary"
                      placeholder="Enter your full name"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-dark-200 border border-dark-300 text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary"
                      placeholder="Enter your email address"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="number">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      className="bg-dark-200 border border-dark-300 text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary"
                      placeholder="Enter your phone number"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-4 rounded-md transition-all flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-b-2 border-dark rounded-full"></div>
                          Processing...
                        </>
                      ) : (
                        // <>Pay ₹{parseInt(course.price).toLocaleString()}</>
                        <>Enroll Now</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}