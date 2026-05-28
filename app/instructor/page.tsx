'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { CheckCircle, ChevronDown, FileText, Award, Briefcase, X } from 'lucide-react';

// Main Content Component
function InstructorContent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    expertise: [] as string[],
    experience: '',
    linkedIn: '',
    otherProfiles: '',
    motivation: '',
    howHeard: '',
    resume: null as File | null,
    acceptTerms: false,
  });
  
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Expertise options
  const expertiseOptions = [
    'Cloud Security',
    'Network Security',
    'Application Security',
    'SIEM/SOAR',
    'DevOps',
    'Cloud Computing',
    'Software Development',
    'Data Science',
    'Digital Marketing',
    'Other',
  ];
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  // Handle expertise selection
  const toggleExpertise = (expertise: string) => {
    setFormData(prev => {
      const newExpertise = prev.expertise.includes(expertise)
        ? prev.expertise.filter(item => item !== expertise)
        : [...prev.expertise, expertise];
      
      return { ...prev, expertise: newExpertise };
    });
    
    // Clear error when field is updated
    if (errors.expertise) {
      setErrors({ ...errors, expertise: '' });
    }
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
      
      // Clear error when field is updated
      if (errors.resume) {
        setErrors({ ...errors, resume: '' });
      }
    }
  };
  
  // Validate form
  const validateForm = (step: number) => {
    const newErrors: { [key: string]: string } = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    } else if (step === 2) {
      if (formData.expertise.length === 0) newErrors.expertise = 'Please select at least one area of expertise';
      if (!formData.experience) newErrors.experience = 'Experience level is required';
      if (!formData.linkedIn.trim()) newErrors.linkedIn = 'LinkedIn profile is required';
      if (!formData.motivation.trim()) newErrors.motivation = 'Please tell us why you want to teach';
    } else if (step === 3) {
      if (!formData.resume) newErrors.resume = 'Please upload your resume/CV';
      if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (validateForm(formStep)) {
      setFormStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setFormStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm(formStep)) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send the form data to your backend
      // This is a mockup of that process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ ...errors, submit: 'There was an error submitting your application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Become an <span className="gradient-text">Instructor</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our team of expert instructors and share your knowledge with passionate students around the world
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="sticky top-32">
                <div className="glass-card p-6 mb-8">
                  <h2 className="text-xl font-bold mb-6">Why Teach with Us?</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                      <div>
                        <h3 className="font-bold text-light">Global Reach</h3>
                        <p className="text-gray-400 text-sm">Share your knowledge with students from around the world.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                      <div>
                        <h3 className="font-bold text-light">Flexible Schedule</h3>
                        <p className="text-gray-400 text-sm">Create your own teaching schedule that works for you.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                      <div>
                        <h3 className="font-bold text-light">Competitive Compensation</h3>
                        <p className="text-gray-400 text-sm">Earn competitive rates for your expertise and time.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                      <div>
                        <h3 className="font-bold text-light">Professional Growth</h3>
                        <p className="text-gray-400 text-sm">Enhance your professional profile as an industry expert.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                      <div>
                        <h3 className="font-bold text-light">Support Team</h3>
                        <p className="text-gray-400 text-sm">Our team provides support for curriculum development and technical issues.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold mb-6">Our Instructor Partnership</h2>
                  <p className="text-gray-300 mb-6">
                    Our instructor partnership program helps passionate people who want to share their knowledge with others. When you become an instructor with Upsilon Cyber Defence, you can:
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      Create courses in your area of expertise
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      Deliver our courses in virtual or offline classrooms
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      Grow in your profession with our support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-8 order-1 lg:order-2">
              {submitSuccess ? (
                <div className="glass-card p-8 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-primary" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h2>
                  <p className="text-gray-300 mb-6">
                    Thank you for your interest in becoming an instructor with Upsilon Cyber Defence. Our team will review your application and contact you within 3-5 business days.
                  </p>
                  <Suspense fallback={
                    <div className="bg-gradient-to-r from-primary to-secondary text-dark font-bold py-3 px-6 rounded-md inline-block opacity-70">
                      Loading...
                    </div>
                  }>
                    <Link
                      href="/"
                      className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-6 rounded-md transition-all inline-block"
                    >
                      Return to Home
                    </Link>
                  </Suspense>
                </div>
              ) : (
                <div className="glass-card p-8">
                  <div className="flex justify-between mb-8">
                    <h2 className="text-2xl font-bold">Instructor Application</h2>
                    <div className="flex items-center text-sm">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${formStep >= 1 ? 'bg-primary text-dark font-bold' : 'bg-dark-200 text-gray-400'}`}>
                        1
                      </div>
                      <div className={`w-8 h-1 ${formStep >= 2 ? 'bg-primary' : 'bg-dark-200'}`}></div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-2 ${formStep >= 2 ? 'bg-primary text-dark font-bold' : 'bg-dark-200 text-gray-400'}`}>
                        2
                      </div>
                      <div className={`w-8 h-1 ${formStep >= 3 ? 'bg-primary' : 'bg-dark-200'}`}></div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-2 ${formStep >= 3 ? 'bg-primary text-dark font-bold' : 'bg-dark-200 text-gray-400'}`}>
                        3
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Personal Information */}
                    {formStep === 1 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="p-2 rounded-full bg-primary/20">
                            <Award className="text-primary" size={20} />
                          </div>
                          <h3 className="text-xl font-bold">Personal Information</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="firstName" className="block text-gray-300 text-sm font-bold mb-2">
                              First Name*
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className={`bg-dark-200 border ${errors.firstName ? 'border-red-500' : 'border-dark-300'} text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary`}
                              placeholder="Enter your first name"
                            />
                            {errors.firstName && (
                              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-gray-300 text-sm font-bold mb-2">
                              Last Name*
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className={`bg-dark-200 border ${errors.lastName ? 'border-red-500' : 'border-dark-300'} text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary`}
                              placeholder="Enter your last name"
                            />
                            {errors.lastName && (
                              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
                            Email Address*
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`bg-dark-200 border ${errors.email ? 'border-red-500' : 'border-dark-300'} text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary`}
                            placeholder="Enter your email address"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-gray-300 text-sm font-bold mb-2">
                            Phone Number*
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`bg-dark-200 border ${errors.phone ? 'border-red-500' : 'border-dark-300'} text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary`}
                            placeholder="Enter your phone number"
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="city" className="block text-gray-300 text-sm font-bold mb-2">
                            City/Location*
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`bg-dark-200 border ${errors.city ? 'border-red-500' : 'border-dark-300'} text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary`}
                            placeholder="Enter your city"
                          />
                          {errors.city && (
                            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                          )}
                        </div>
                        
                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-4 rounded-md transition-all"
                          >
                            Continue to Professional Information
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Step 2: Professional Information */}
                    {formStep === 2 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="p-2 rounded-full bg-primary/20">
                            <Briefcase className="text-primary" size={20} />
                          </div>
                          <h3 className="text-xl font-bold">Professional Information</h3>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-bold mb-2">
                            Areas of Expertise*
                          </label>
                          <div className="flex flex-wrap gap-3 mt-2">
                            {expertiseOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => toggleExpertise(option)}
                                className={`px-3 py-2 rounded-full text-sm transition-all ${
                                  formData.expertise.includes(option)
                                    ? 'bg-primary text-dark'
                                    : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                          {errors.expertise && (
                            <p className="text-red-500 text-xs mt-2">{errors.expertise}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="experience" className="block text-gray-300 text-sm font-bold mb-2">
                            Years of Experience*
                          </label>
                          <select
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className={`bg-dark-200 border ${errors.experience ? 'border-red-500' : 'border-dark-300'} text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary`}
                          >
                            <option value="">Select your experience</option>
                            <option value="1-3">1-3 years</option>
                            <option value="4-6">4-6 years</option>
                            <option value="7-10">7-10 years</option>
                            <option value="10+">More than 10 years</option>
                          </select>
                          {errors.experience && (
                            <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="linkedIn" className="block text-gray-300 text-sm font-bold mb-2">
                            LinkedIn Profile URL*
                          </label>
                          <input
                            type="text"
                            id="linkedIn"
                            name="linkedIn"
                            value={formData.linkedIn}
                            onChange={handleChange}
                            className={`bg-dark-200 border ${errors.linkedIn ? 'border-red-500' : 'border-dark-300'} text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary`}
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                          {errors.linkedIn && (
                            <p className="text-red-500 text-xs mt-1">{errors.linkedIn}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="otherProfiles" className="block text-gray-300 text-sm font-bold mb-2">
                            Other Professional Profiles (Optional)
                          </label>
                          <input
                            type="text"
                            id="otherProfiles"
                            name="otherProfiles"
                            value={formData.otherProfiles}
                            onChange={handleChange}
                            className="bg-dark-200 border border-dark-300 text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary"
                            placeholder="GitHub, personal website, etc."
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="motivation" className="block text-gray-300 text-sm font-bold mb-2">
                            Why do you want to teach with us?*
                          </label>
                          <textarea
                            id="motivation"
                            name="motivation"
                            value={formData.motivation}
                            onChange={handleChange}
                            rows={4}
                            className={`bg-dark-200 border ${errors.motivation ? 'border-red-500' : 'border-dark-300'} text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary`}
                            placeholder="Tell us about your teaching experience and why you want to join our instructor team..."
                          ></textarea>
                          {errors.motivation && (
                            <p className="text-red-500 text-xs mt-1">{errors.motivation}</p>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="bg-dark-200 text-gray-300 hover:bg-dark-300 font-bold py-3 px-4 rounded-md transition-all"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-4 rounded-md transition-all sm:flex-1"
                          >
                            Continue to Final Step
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Step 3: Final Step */}
                    {formStep === 3 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="p-2 rounded-full bg-primary/20">
                            <FileText className="text-primary" size={20} />
                          </div>
                          <h3 className="text-xl font-bold">Final Step</h3>
                        </div>
                        
                        <div>
                          <label htmlFor="resume" className="block text-gray-300 text-sm font-bold mb-2">
                            Upload Resume/CV*
                          </label>
                          <div className={`border-2 border-dashed ${errors.resume ? 'border-red-500' : 'border-dark-300'} rounded-lg p-6 text-center`}>
                            <input
                              type="file"
                              id="resume"
                              name="resume"
                              onChange={handleFileChange}
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                            />
                            {formData.resume ? (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <FileText className="text-primary mr-2" size={20} />
                                  <span className="text-gray-300">{formData.resume.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setFormData({ ...formData, resume: null })}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                            ) : (
                              <div>
                                <p className="text-gray-400 mb-2">Drag and drop your resume here, or</p>
                                <label
                                  htmlFor="resume"
                                  className="inline-block bg-dark-200 text-primary hover:bg-dark-300 font-medium py-2 px-4 rounded-md cursor-pointer transition-all"
                                >
                                  Browse Files
                                </label>
                                <p className="text-gray-500 text-xs mt-2">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                              </div>
                            )}
                          </div>
                          {errors.resume && (
                            <p className="text-red-500 text-xs mt-1">{errors.resume}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="howHeard" className="block text-gray-300 text-sm font-bold mb-2">
                            How did you hear about us? (Optional)
                          </label>
                          <select
                            id="howHeard"
                            name="howHeard"
                            value={formData.howHeard}
                            onChange={handleChange}
                            className="bg-dark-200 border border-dark-300 text-light rounded-md w-full py-3 px-4 focus:outline-none focus:border-primary"
                          >
                            <option value="">Select an option</option>
                            <option value="search">Search Engine</option>
                            <option value="social">Social Media</option>
                            <option value="friend">Friend or Colleague</option>
                            <option value="student">Former Student</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div className="my-6">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="acceptTerms"
                                name="acceptTerms"
                                type="checkbox"
                                checked={formData.acceptTerms}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 rounded border-dark-300 bg-dark-200 text-primary focus:ring-primary"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="acceptTerms" className={`font-medium ${errors.acceptTerms ? 'text-red-500' : 'text-gray-300'}`}>
                                I accept the <Suspense fallback={<span className="text-primary">Terms and Conditions</span>}><Link href="/terms-conditions" className="text-primary hover:underline">Terms and Conditions</Link></Suspense> and <Suspense fallback={<span className="text-primary">Privacy Policy</span>}><Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link></Suspense>
                              </label>
                              {errors.acceptTerms && (
                                <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {errors.submit && (
                          <div className="p-4 bg-red-500/20 border border-red-500 text-light rounded-md mb-4">
                            {errors.submit}
                          </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="bg-dark-200 text-gray-300 hover:bg-dark-300 font-bold py-3 px-4 rounded-md transition-all"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-4 rounded-md transition-all sm:flex-1 ${
                              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer is included here */}
      <Footer />
    </div>
  );
}

// Main page component wrapped in Suspense
export default function InstructorPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading form...</p></div>}>
        <InstructorContent />
      </Suspense>
    </div>
  );
}