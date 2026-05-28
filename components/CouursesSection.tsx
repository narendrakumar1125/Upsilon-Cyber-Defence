'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Lock, Server, Database, ChevronDown, Code, Cloud, LineChart, GitBranch, Container, BarChart3 } from 'lucide-react';
import { useStaggerAnimation, useFadeInOnScroll } from '@/hooks';

// Course type definition
type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  popular?: boolean;
};

// Sample courses data
const coursesData: Course[] = [
  // Cybersecurity courses
  {
    id: 'cloud-security',
    title: 'Cloud Security',
    description: 'Learn to secure cloud infrastructure and applications across major platforms including AWS, Azure, and GCP.',
    category: 'cybersecurity',
    icon: <Lock className="h-20 w-20 text-primary absolute transform group-hover:scale-110 transition-all duration-500" />,
    popular: true
  },
  {
    id: 'network-security',
    title: 'Network Security',
    description: 'Master techniques to protect network infrastructure and mitigate advanced threats in enterprise environments.',
    category: 'cybersecurity',
    icon: <Server className="h-20 w-20 text-secondary absolute transform group-hover:scale-110 transition-all duration-500" />
  },
  {
    id: 'siem-solutions',
    title: 'SIEM Solutions',
    description: 'Develop expertise in Security Information and Event Management tools and techniques for threat detection.',
    category: 'cybersecurity',
    icon: <Database className="h-20 w-20 text-primary absolute transform group-hover:scale-110 transition-all duration-500" />
  },
  // DevOps courses
  {
    id: 'ci-cd-pipelines',
    title: 'CI/CD Pipelines',
    description: 'Master continuous integration and deployment using Jenkins, GitLab CI, GitHub Actions, and modern DevOps practices.',
    category: 'devops',
    icon: <GitBranch className="h-20 w-20 text-primary absolute transform group-hover:scale-110 transition-all duration-500" />,
    popular: true
  },
  {
    id: 'docker-kubernetes',
    title: 'Docker & Kubernetes',
    description: 'Learn containerization with Docker and orchestration with Kubernetes for scalable, efficient application deployment.',
    category: 'devops',
    icon: <Container className="h-20 w-20 text-secondary absolute transform group-hover:scale-110 transition-all duration-500" />
  },
  {
    id: 'infrastructure-as-code',
    title: 'Infrastructure as Code',
    description: 'Automate infrastructure provisioning using Terraform, Ansible, and CloudFormation for reliable, repeatable deployments.',
    category: 'devops',
    icon: <Code className="h-20 w-20 text-primary absolute transform group-hover:scale-110 transition-all duration-500" />
  },
  // Cloud Computing courses
  {
    id: 'aws-fundamentals',
    title: 'AWS Fundamentals',
    description: 'Comprehensive training on Amazon Web Services including EC2, S3, Lambda, and core cloud computing concepts.',
    category: 'cloud',
    icon: <Cloud className="h-20 w-20 text-primary absolute transform group-hover:scale-110 transition-all duration-500" />,
    popular: true
  },
  {
    id: 'azure-cloud',
    title: 'Microsoft Azure',
    description: 'Master Microsoft Azure cloud services, including virtual machines, storage, networking, and Azure DevOps integration.',
    category: 'cloud',
    icon: <Cloud className="h-20 w-20 text-secondary absolute transform group-hover:scale-110 transition-all duration-500" />
  },
  {
    id: 'gcp-essentials',
    title: 'Google Cloud Platform',
    description: 'Learn Google Cloud Platform essentials including Compute Engine, Cloud Storage, and serverless computing with Cloud Functions.',
    category: 'cloud',
    icon: <Cloud className="h-20 w-20 text-primary absolute transform group-hover:scale-110 transition-all duration-500" />
  },
  // Data Science courses
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Learn to analyze and visualize data using Python, pandas, and visualization libraries to extract meaningful insights.',
    category: 'data-science',
    icon: <BarChart3 className="h-20 w-20 text-primary absolute transform group-hover:scale-110 transition-all duration-500" />,
    popular: true
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    description: 'Master machine learning algorithms, model training, and deployment using scikit-learn, TensorFlow, and real-world datasets.',
    category: 'data-science',
    icon: <LineChart className="h-20 w-20 text-secondary absolute transform group-hover:scale-110 transition-all duration-500" />
  },
  {
    id: 'big-data',
    title: 'Big Data Analytics',
    description: 'Explore big data technologies including Hadoop, Spark, and data processing frameworks for handling large-scale datasets.',
    category: 'data-science',
    icon: <Database className="h-20 w-20 text-primary absolute transform group-hover:scale-110 transition-all duration-500" />
  },
];

const CoursesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('cybersecurity');
  const coursesGridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Stagger animation for courses
  useStaggerAnimation(coursesGridRef, 'div[class*="bg-dark-200"]');

  // Fade in for heading
  useFadeInOnScroll(headingRef);

  const categories = [
    { id: 'cybersecurity', name: 'Cybersecurity' },
    { id: 'devops', name: 'DevOps' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'data-science', name: 'Data Science' },
  ];

  const filteredCourses = coursesData.filter(
    (course) => course.category === selectedCategory
  );

  return (
    <section id="courses" className="py-20 bg-gradient-to-b from-dark to-dark-100 relative overflow-hidden">
      {/* Glowing Orbs */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-primary/10 rounded-full filter blur-[80px]"></div>
      <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-secondary/10 rounded-full filter blur-[80px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our <span className="gradient-text">Courses</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Master cutting-edge skills with our industry-recognized training programs
          </p>
        </div>

        {/* Course Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`font-medium py-2 px-6 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-dark shadow-lg'
                  : 'bg-dark-200 text-gray-300 hover:text-light hover:bg-dark-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div ref={coursesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div 
                key={course.id}
                className="bg-dark-200/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-dark-300 transition-all duration-300 hover:shadow-primary/20 group"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden flex items-center justify-center">
                  {course.icon}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-light transition-colors group-hover:text-primary">{course.title}</h3>
                    {course.popular && (
                      <div className="bg-primary/20 text-primary text-xs font-bold py-1 px-2 rounded">Popular</div>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-6">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/courses/${course.id}`}
                      className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark text-sm font-bold py-2 px-4 rounded-md transition-all"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No courses available in this category yet.</p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for new courses!</p>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            href="/courses"
            className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-8 rounded-md transition-all shadow-lg inline-flex items-center gap-2"
          >
            Explore Courses
            <ChevronDown size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;