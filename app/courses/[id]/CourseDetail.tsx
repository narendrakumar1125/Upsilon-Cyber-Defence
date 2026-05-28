'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { ChevronLeft, Lock, Server, Database, BookOpen, Download, Code, Cloud, LineChart, GitBranch, Container, BarChart3 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const CourseDetail = () => {
  // Use the useParams hook to get the course ID
  const params = useParams();
  const courseId = params.id as string;
  
  // Local state to store the course data
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch course data on component mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // First try to fetch from Firestore
        const courseDoc = await getDoc(doc(db, 'courses', courseId));
        
        if (courseDoc.exists()) {
          const courseData = { 
            id: courseDoc.id, 
            ...courseDoc.data(),
            icon: <BookOpen className="h-10 w-10 text-primary" />, // Default icon
            overview: courseDoc.data().description || courseDoc.data().overview, // Use description as overview if overview is missing
            syllabus: courseDoc.data().syllabus || [], // Default empty syllabus
            syllabusLink: courseDoc.data().syllabusLink || null, // Include syllabus link
            syllabusFile: courseDoc.data().syllabusFile || null // Include syllabus file
          };
          setCourse(courseData);
          setLoading(false);
          return;
        }
        
        // If not found in Firestore, check hardcoded data as fallback
        const coursesData = [
        // Cybersecurity courses
        {
          id: 'cloud-security',
          title: 'Cloud Security',
          description: 'Learn to secure cloud infrastructure and applications across major platforms including AWS, Azure, and GCP.',
          category: 'cybersecurity',
          icon: <Lock className="h-10 w-10 text-primary" />,
          popular: true,
          overview: 'This comprehensive cloud security course provides in-depth training on securing cloud environments across all major platforms.',
          duration: '6 weeks',
          level: 'Intermediate',
          prerequisites: 'Basic networking knowledge, familiarity with cloud concepts',
          price: '₹30,000',
          syllabus: [
            { title: 'Module 1: Cloud Security Fundamentals', topics: ['Cloud security principles', 'Shared responsibility model', 'Regulatory compliance in the cloud'] },
            { title: 'Module 2: AWS Security', topics: ['Identity and Access Management (IAM)', 'Security Groups and NACLs', 'AWS security services'] },
            { title: 'Module 3: Azure Security', topics: ['Azure Active Directory', 'Azure Security Center', 'Azure Key Vault'] },
            { title: 'Module 4: GCP Security', topics: ['Cloud IAM', 'VPC Security', 'Cloud Security Command Center'] },
            { title: 'Module 5: Container Security', topics: ['Docker security', 'Kubernetes security', 'Container scanning'] },
            { title: 'Module 6: DevSecOps in Cloud', topics: ['CI/CD security', 'Infrastructure as Code security', 'Cloud compliance automation'] }
          ],
          syllabusLink: 'https://docs.google.com/document/d/1RldMe3-OCLSvhEb6ZXJbOT23XBotzS4o/edit?usp=sharing&ouid=115793946315704329738&rtpof=true&sd=true'
        },
        {
          id: 'network-security',
          title: 'Network Security',
          description: 'Master techniques to protect network infrastructure and mitigate advanced threats in enterprise environments.',
          category: 'cybersecurity',
          icon: <Server className="h-10 w-10 text-secondary" />,
          overview: "This network security course covers the fundamentals of securing network infrastructure.",
          duration: '8 weeks',
          level: 'Advanced',
          prerequisites: 'Networking fundamentals, basic security concepts',
          price: '₹35,000',
          syllabus: [
            { title: 'Module 1: Network Security Fundamentals', topics: ['OSI model security', 'Network protocols security', 'Network threats and vulnerabilities'] },
            { title: 'Module 2: Firewall Technologies', topics: ['Firewall types and architectures', 'Firewall rules and policies', 'Next-generation firewalls'] },
            { title: 'Module 3: Intrusion Detection & Prevention', topics: ['IDS/IPS deployment', 'Signature-based detection', 'Anomaly detection'] },
            { title: 'Module 4: VPN & Encryption', topics: ['VPN protocols', 'SSL/TLS implementation', 'End-to-end encryption'] },
            { title: 'Module 5: Network Access Control', topics: ['802.1X authentication', 'NAC solutions', 'Zero Trust networking'] },
            { title: 'Module 6: Advanced Threat Protection', topics: ['DDoS mitigation', 'Advanced persistent threats', 'Network forensics'] }
          ],
          syllabusLink: null
        },
        {
          id: 'siem-solutions',
          title: 'SIEM Solutions',
          description: 'Develop expertise in Security Information and Event Management tools and techniques for threat detection.',
          category: 'cybersecurity',
          icon: <Database className="h-10 w-10 text-primary" />,
          overview: 'Master Security Information and Event Management (SIEM) solutions to detect, analyze, and respond to security threats in real-time.',
          duration: '6 weeks',
          level: 'Intermediate',
          prerequisites: 'Basic security concepts, understanding of log analysis',
          price: '₹32,000',
          syllabus: [
            { title: 'Module 1: SIEM Fundamentals', topics: ['SIEM architecture and components', 'Log collection and normalization', 'Event correlation basics'] },
            { title: 'Module 2: Splunk Administration', topics: ['Splunk installation and configuration', 'Data ingestion and parsing', 'Search Processing Language (SPL)'] },
            { title: 'Module 3: QRadar Implementation', topics: ['QRadar architecture', 'Log source configuration', 'Custom rules and building blocks'] },
            { title: 'Module 4: ArcSight ESM', topics: ['ArcSight connectors', 'Event correlation rules', 'Dashboard creation'] },
            { title: 'Module 5: Threat Detection & Response', topics: ['Threat hunting techniques', 'Incident response workflows', 'Automated response playbooks'] },
            { title: 'Module 6: Advanced SIEM Analytics', topics: ['Machine learning in SIEM', 'Behavioral analytics', 'Threat intelligence integration'] }
          ],
          syllabusLink: null
        },
        // DevOps courses
        {
          id: 'ci-cd-pipelines',
          title: 'CI/CD Pipelines',
          description: 'Master continuous integration and deployment using Jenkins, GitLab CI, GitHub Actions, and modern DevOps practices.',
          category: 'devops',
          icon: <GitBranch className="h-10 w-10 text-primary" />,
          popular: true,
          overview: 'Learn to build, test, and deploy applications automatically using industry-standard CI/CD tools and best practices.',
          duration: '5 weeks',
          level: 'Intermediate',
          prerequisites: 'Basic Git knowledge, familiarity with command line',
          price: '₹28,000',
          syllabus: [
            { title: 'Module 1: CI/CD Fundamentals', topics: ['Continuous Integration concepts', 'Continuous Deployment vs Delivery', 'Pipeline architecture'] },
            { title: 'Module 2: Jenkins Mastery', topics: ['Jenkins installation and setup', 'Pipeline as Code (Jenkinsfile)', 'Jenkins plugins and integrations'] },
            { title: 'Module 3: GitLab CI/CD', topics: ['GitLab Runner configuration', '.gitlab-ci.yml syntax', 'GitLab CI/CD best practices'] },
            { title: 'Module 4: GitHub Actions', topics: ['Workflow syntax and triggers', 'Actions marketplace', 'Self-hosted runners'] },
            { title: 'Module 5: Advanced Pipeline Patterns', topics: ['Multi-stage pipelines', 'Parallel execution', 'Pipeline optimization'] },
            { title: 'Module 6: Deployment Strategies', topics: ['Blue-green deployments', 'Canary releases', 'Rollback strategies'] }
          ],
          syllabusLink: null
        },
        {
          id: 'docker-kubernetes',
          title: 'Docker & Kubernetes',
          description: 'Learn containerization with Docker and orchestration with Kubernetes for scalable, efficient application deployment.',
          category: 'devops',
          icon: <Container className="h-10 w-10 text-secondary" />,
          overview: 'Comprehensive training on containerization and container orchestration to deploy and manage applications at scale.',
          duration: '7 weeks',
          level: 'Intermediate',
          prerequisites: 'Linux basics, understanding of application deployment',
          price: '₹35,000',
          syllabus: [
            { title: 'Module 1: Docker Fundamentals', topics: ['Container concepts', 'Docker installation and setup', 'Dockerfile best practices'] },
            { title: 'Module 2: Docker Advanced', topics: ['Docker Compose', 'Docker networking', 'Docker volumes and storage'] },
            { title: 'Module 3: Kubernetes Basics', topics: ['Kubernetes architecture', 'Pods, Services, and Deployments', 'kubectl commands'] },
            { title: 'Module 4: Kubernetes Advanced', topics: ['ConfigMaps and Secrets', 'StatefulSets and DaemonSets', 'Ingress controllers'] },
            { title: 'Module 5: Kubernetes Operations', topics: ['Monitoring and logging', 'Resource management', 'Troubleshooting'] },
            { title: 'Module 6: Production Deployment', topics: ['Helm charts', 'Kubernetes security', 'Multi-cluster management'] }
          ],
          syllabusLink: null
        },
        {
          id: 'infrastructure-as-code',
          title: 'Infrastructure as Code',
          description: 'Automate infrastructure provisioning using Terraform, Ansible, and CloudFormation for reliable, repeatable deployments.',
          category: 'devops',
          icon: <Code className="h-10 w-10 text-primary" />,
          overview: 'Master Infrastructure as Code (IaC) tools to automate cloud infrastructure provisioning and configuration management.',
          duration: '6 weeks',
          level: 'Intermediate',
          prerequisites: 'Cloud computing basics, command line proficiency',
          price: '₹30,000',
          syllabus: [
            { title: 'Module 1: IaC Fundamentals', topics: ['Infrastructure as Code principles', 'Declarative vs Imperative', 'Version control for infrastructure'] },
            { title: 'Module 2: Terraform Deep Dive', topics: ['Terraform syntax and HCL', 'Providers and resources', 'State management'] },
            { title: 'Module 3: Terraform Advanced', topics: ['Modules and workspaces', 'Remote state backends', 'Terraform Cloud'] },
            { title: 'Module 4: Ansible Automation', topics: ['Ansible playbooks', 'Inventory management', 'Roles and collections'] },
            { title: 'Module 5: AWS CloudFormation', topics: ['CloudFormation templates', 'Stack management', 'Nested stacks'] },
            { title: 'Module 6: Multi-Cloud IaC', topics: ['Cross-cloud strategies', 'IaC testing', 'Best practices and patterns'] }
          ],
          syllabusLink: null
        },
        // Cloud Computing courses
        {
          id: 'aws-fundamentals',
          title: 'AWS Fundamentals',
          description: 'Comprehensive training on Amazon Web Services including EC2, S3, Lambda, and core cloud computing concepts.',
          category: 'cloud',
          icon: <Cloud className="h-10 w-10 text-primary" />,
          popular: true,
          overview: 'Build a strong foundation in Amazon Web Services with hands-on training on core services and best practices.',
          duration: '8 weeks',
          level: 'Beginner',
          prerequisites: 'Basic IT knowledge, understanding of cloud concepts',
          price: '₹40,000',
          syllabus: [
            { title: 'Module 1: AWS Cloud Essentials', topics: ['AWS global infrastructure', 'IAM and security basics', 'AWS pricing and billing'] },
            { title: 'Module 2: Compute Services', topics: ['EC2 instances and types', 'Auto Scaling and Load Balancing', 'Lambda serverless computing'] },
            { title: 'Module 3: Storage Services', topics: ['S3 buckets and objects', 'EBS volumes', 'EFS file systems'] },
            { title: 'Module 4: Database Services', topics: ['RDS and Aurora', 'DynamoDB NoSQL', 'Database migration'] },
            { title: 'Module 5: Networking & Content Delivery', topics: ['VPC configuration', 'CloudFront CDN', 'Route 53 DNS'] },
            { title: 'Module 6: AWS Management & Security', topics: ['CloudWatch monitoring', 'CloudTrail logging', 'AWS security best practices'] }
          ],
          syllabusLink: null
        },
        {
          id: 'azure-cloud',
          title: 'Microsoft Azure',
          description: 'Master Microsoft Azure cloud services, including virtual machines, storage, networking, and Azure DevOps integration.',
          category: 'cloud',
          icon: <Cloud className="h-10 w-10 text-secondary" />,
          overview: 'Comprehensive Azure training covering core services, infrastructure, and integration with Microsoft ecosystem.',
          duration: '8 weeks',
          level: 'Intermediate',
          prerequisites: 'Basic cloud concepts, Windows/Linux familiarity',
          price: '₹38,000',
          syllabus: [
            { title: 'Module 1: Azure Fundamentals', topics: ['Azure portal and CLI', 'Resource groups and subscriptions', 'Azure Active Directory'] },
            { title: 'Module 2: Compute Services', topics: ['Virtual Machines', 'App Services', 'Azure Functions'] },
            { title: 'Module 3: Storage & Databases', topics: ['Azure Storage accounts', 'Azure SQL Database', 'Cosmos DB'] },
            { title: 'Module 4: Networking', topics: ['Virtual Networks', 'Load Balancers', 'Azure DNS'] },
            { title: 'Module 5: Azure DevOps', topics: ['Azure Repos', 'Azure Pipelines', 'Azure Boards'] },
            { title: 'Module 6: Security & Monitoring', topics: ['Azure Security Center', 'Key Vault', 'Azure Monitor'] }
          ],
          syllabusLink: null
        },
        {
          id: 'gcp-essentials',
          title: 'Google Cloud Platform',
          description: 'Learn Google Cloud Platform essentials including Compute Engine, Cloud Storage, and serverless computing with Cloud Functions.',
          category: 'cloud',
          icon: <Cloud className="h-10 w-10 text-primary" />,
          overview: 'Master Google Cloud Platform services and learn to build scalable applications on GCP infrastructure.',
          duration: '7 weeks',
          level: 'Intermediate',
          prerequisites: 'Cloud computing basics, Linux command line',
          price: '₹36,000',
          syllabus: [
            { title: 'Module 1: GCP Fundamentals', topics: ['GCP console and CLI', 'Projects and billing', 'IAM and access control'] },
            { title: 'Module 2: Compute Services', topics: ['Compute Engine VMs', 'Google Kubernetes Engine', 'Cloud Functions'] },
            { title: 'Module 3: Storage Solutions', topics: ['Cloud Storage buckets', 'Cloud SQL', 'Bigtable and Firestore'] },
            { title: 'Module 4: Networking', topics: ['VPC networks', 'Cloud Load Balancing', 'Cloud CDN'] },
            { title: 'Module 5: Big Data & Analytics', topics: ['BigQuery', 'Dataflow', 'Pub/Sub messaging'] },
            { title: 'Module 6: GCP Operations', topics: ['Cloud Monitoring', 'Cloud Logging', 'Error Reporting'] }
          ],
          syllabusLink: null
        },
        // Data Science courses
        {
          id: 'data-analytics',
          title: 'Data Analytics',
          description: 'Learn to analyze and visualize data using Python, pandas, and visualization libraries to extract meaningful insights.',
          category: 'data-science',
          icon: <BarChart3 className="h-10 w-10 text-primary" />,
          popular: true,
          overview: 'Master data analysis techniques using Python and popular data science libraries to turn raw data into actionable insights.',
          duration: '6 weeks',
          level: 'Beginner',
          prerequisites: 'Basic Python knowledge, understanding of statistics',
          price: '₹28,000',
          syllabus: [
            { title: 'Module 1: Python for Data Science', topics: ['NumPy arrays', 'Pandas DataFrames', 'Data cleaning techniques'] },
            { title: 'Module 2: Data Visualization', topics: ['Matplotlib basics', 'Seaborn advanced plots', 'Plotly interactive charts'] },
            { title: 'Module 3: Exploratory Data Analysis', topics: ['Statistical summaries', 'Correlation analysis', 'Data profiling'] },
            { title: 'Module 4: Data Wrangling', topics: ['Merging datasets', 'Pivot tables', 'Time series analysis'] },
            { title: 'Module 5: SQL for Analytics', topics: ['SQL queries', 'Joins and aggregations', 'Window functions'] },
            { title: 'Module 6: Analytics Projects', topics: ['End-to-end analysis projects', 'Dashboard creation', 'Report generation'] }
          ],
          syllabusLink: null
        },
        {
          id: 'machine-learning',
          title: 'Machine Learning',
          description: 'Master machine learning algorithms, model training, and deployment using scikit-learn, TensorFlow, and real-world datasets.',
          category: 'data-science',
          icon: <LineChart className="h-10 w-10 text-secondary" />,
          overview: 'Comprehensive machine learning course covering algorithms, model development, and production deployment.',
          duration: '10 weeks',
          level: 'Advanced',
          prerequisites: 'Python programming, statistics, linear algebra basics',
          price: '₹45,000',
          syllabus: [
            { title: 'Module 1: ML Fundamentals', topics: ['Supervised vs Unsupervised learning', 'Model evaluation metrics', 'Bias-variance tradeoff'] },
            { title: 'Module 2: Regression & Classification', topics: ['Linear regression', 'Logistic regression', 'Decision trees and random forests'] },
            { title: 'Module 3: Advanced Algorithms', topics: ['Support Vector Machines', 'Gradient Boosting', 'Neural Networks basics'] },
            { title: 'Module 4: Deep Learning with TensorFlow', topics: ['TensorFlow/Keras', 'Convolutional Neural Networks', 'Recurrent Neural Networks'] },
            { title: 'Module 5: Model Deployment', topics: ['Model serialization', 'API development', 'Cloud deployment'] },
            { title: 'Module 6: ML Projects', topics: ['End-to-end ML pipeline', 'Model monitoring', 'Production best practices'] }
          ],
          syllabusLink: null
        },
        {
          id: 'big-data',
          title: 'Big Data Analytics',
          description: 'Explore big data technologies including Hadoop, Spark, and data processing frameworks for handling large-scale datasets.',
          category: 'data-science',
          icon: <Database className="h-10 w-10 text-primary" />,
          overview: 'Learn to process and analyze massive datasets using distributed computing frameworks and big data tools.',
          duration: '8 weeks',
          level: 'Advanced',
          prerequisites: 'Python programming, understanding of databases',
          price: '₹42,000',
          syllabus: [
            { title: 'Module 1: Big Data Fundamentals', topics: ['Big data characteristics', 'Hadoop ecosystem', 'Distributed computing concepts'] },
            { title: 'Module 2: Hadoop & MapReduce', topics: ['HDFS architecture', 'MapReduce programming', 'YARN resource management'] },
            { title: 'Module 3: Apache Spark', topics: ['Spark RDDs and DataFrames', 'Spark SQL', 'Spark Streaming'] },
            { title: 'Module 4: NoSQL Databases', topics: ['MongoDB', 'Cassandra', 'HBase'] },
            { title: 'Module 5: Data Processing Pipelines', topics: ['ETL processes', 'Data lake architecture', 'Stream processing'] },
            { title: 'Module 6: Big Data Analytics', topics: ['Large-scale analytics', 'Real-time processing', 'Performance optimization'] }
          ],
          syllabusLink: null
        },
      ];
      
        const foundCourse = coursesData.find(c => c.id === courseId);
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          // Handle course not found
          console.error('Course not found');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-light flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="min-h-screen bg-dark text-light flex items-center justify-center">
        <div className="text-2xl">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-light">
      <Navbar />
      
      {/* Course Detail Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-dark to-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/courses" 
            className="inline-flex items-center text-gray-400 hover:text-primary mb-6 transition-colors"
          >
            <ChevronLeft size={18} />
            <span>Back to Courses</span>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
              {course.icon}
            </div>
            
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-300 text-lg max-w-3xl mb-6">{course.overview}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 mb-8">
                <div className="glass-card p-4">
                  <div className="text-sm text-gray-400">Duration</div>
                  <div className="font-bold">{course.duration}</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-sm text-gray-400">Level</div>
                  <div className="font-bold">{course.level}</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-sm text-gray-400">Prerequisites</div>
                  <div className="font-bold text-sm">{course.prerequisites || 'Basic Knowledge'}</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-sm text-gray-400">Price</div>
                  <div className="font-bold">{course.price}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/courses/${courseId}/enroll`}
                className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105"
              >
                Enroll Now
              </Link>
                {(course.syllabusLink || course.syllabusFile) && (
                  <a
                    href={course.syllabusFile || course.syllabusLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-secondary to-primary hover:from-indigo-400 hover:to-sky-300 text-dark font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105 inline-flex items-center gap-2"
                  >
                    <Download size={20} />
                    Download Syllabus
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Syllabus */}
      {course.syllabus && course.syllabus.length > 0 && (
        <section className="py-16 bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Course Syllabus</h2>
            
            <div className="space-y-6">
              {course.syllabus.map((module: any, index: number) => (
                <div key={index} className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4">{module.title}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {module.topics.map((topic: string, topicIndex: number) => (
                      <li key={topicIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></div>
                        <span className="text-gray-300">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* If no syllabus but has syllabus link or file, show a message */}
      {(!course.syllabus || course.syllabus.length === 0) && (course.syllabusLink || course.syllabusFile) && (
        <section className="py-16 bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Course Syllabus</h2>
            <p className="text-gray-300 mb-6">
              For detailed course curriculum and module information, please download the complete syllabus.
            </p>
            <a
              href={course.syllabusFile || course.syllabusLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-secondary to-primary hover:from-indigo-400 hover:to-sky-300 text-dark font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              <Download size={20} />
              Download Complete Syllabus
            </a>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default CourseDetail;