// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import Navbar from '@/components/Navbar';
// import { Footer } from '@/components/ContactAndFooter';
// import { CheckCircle, ChevronRight } from 'lucide-react';
// import { AnimateOnScroll } from '@/components/motion/MotionComponents';
// import { db } from '@/utils/firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { verifyPaymentStatus } from '@/services/phonePeService';

// export default function PaymentSuccessPage() {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const courseId = params.id as string;
  
//   const [course, setCourse] = useState({
//     id: courseId,
//     title: '',
//     customerName: searchParams.get('name') || 'Student',
//   });
  
//   // Generate a transaction ID for display
//   const [transactionId, setTransactionId] = useState('');
  
//   useEffect(() => {
//     // Get transaction ID from URL params
//     const txnId = searchParams.get('transactionId');
    
//     if (txnId) {
//       setTransactionId(txnId);
      
//       // Query Firestore directly for payment details
//       const fetchPaymentDetails = async () => {
//         try {
//           const paymentsRef = collection(db, 'payments');
//           const q = query(paymentsRef, where('transaction_id', '==', txnId));
//           const querySnapshot = await getDocs(q);
          
//           if (!querySnapshot.empty) {
//             const paymentData = querySnapshot.docs[0].data();
//             setCourse(prev => ({
//               ...prev,
//               customerName: paymentData.name || prev.customerName,
//               title: paymentData.course_name || prev.title
//             }));
//           }
//         } catch (error) {
//           console.error('Error fetching payment details:', error);
//         }
//       };
      
//       fetchPaymentDetails();
//     } else {
//       // No transaction ID in URL, this could be a direct access
//       // Generate a mock transaction ID for display
//       const generateMockTransactionId = () => {
//         const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
//         const timestamp = Date.now().toString().slice(-8);
//         return `TXN${timestamp}${randomPart}`;
//       };
      
//       setTransactionId(generateMockTransactionId());
//     }
    
//     // Fetch course details - this would typically be an API call
//     // Using mock data for now
//     const fetchCourse = () => {
//       const coursesData: Record<string, { title: string }> = {
//         'cloud-security': { title: 'Cloud Security' },
//         'network-security': { title: 'Network Security' },
//         'siem-solutions': { title: 'SIEM Solutions' },
//         'application-security': { title: 'Application Security' },
//         'oscp-preparation': { title: 'OSCP Preparation' },
//         'devops-aws': { title: 'DevOps for AWS' },
//         'devops-azure': { title: 'DevOps for Azure' },
//         'devsecops': { title: 'DevSecOps' },
//         'aws-certification': { title: 'AWS Certification' },
//         'azure-certification': { title: 'Azure Certification' },
//         'gcp-certification': { title: 'GCP Certification' },
//         'java-development': { title: 'Java Development' },
//         'python-development': { title: 'Python Development' }
//       };
      
//       setCourse(prev => ({
//         ...prev,
//         title: coursesData[courseId]?.title || 'Course'
//       }));
//     };
    
//     fetchCourse();
//   }, [courseId, searchParams]);
  
//   return (
//     <div className="min-h-screen bg-dark text-light">
//       <Navbar />
      
//       <section className="pt-32 pb-16 bg-gradient-to-b from-dark to-dark-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-center">
//             <AnimateOnScroll animation="scaleUp">
//               <div className="glass-card p-8 max-w-2xl w-full text-center">
//                 <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
//                   <CheckCircle className="h-12 w-12 text-primary" />
//                 </div>
                
//                 <h1 className="text-3xl sm:text-4xl font-bold mb-6">Payment Successful!</h1>
                
//                 <p className="text-xl text-gray-300 mb-8">
//                   Thank you, {course.customerName}! Your enrollment in {course.title} has been confirmed.
//                 </p>
                
//                 <div className="glass-card bg-dark-200/70 p-6 mb-8">
//                   <h2 className="text-lg font-bold mb-4">Enrollment Details</h2>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
//                     <div>
//                       <div className="text-sm text-gray-400">Course</div>
//                       <div className="font-medium text-light">{course.title}</div>
//                     </div>
                    
//                     <div>
//                       <div className="text-sm text-gray-400">Transaction ID</div>
//                       <div className="font-medium text-light">{transactionId}</div>
//                     </div>
                    
//                     <div>
//                       <div className="text-sm text-gray-400">Date</div>
//                       <div className="font-medium text-light">{new Date().toLocaleDateString()}</div>
//                     </div>
                    
//                     <div>
//                       <div className="text-sm text-gray-400">Status</div>
//                       <div className="font-medium text-primary">Confirmed</div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <p className="text-gray-300 mb-8">
//                   You will receive a confirmation email shortly with your course access details. Please check your inbox (and spam folder, just in case).
//                 </p>
                
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <Link
//                     href={`/courses/${courseId}`}
//                     className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-6 rounded-md transition-all"
//                   >
//                     View Course Details
//                   </Link>
                  
//                   <Link
//                     href="/courses"
//                     className="bg-transparent border border-primary text-primary hover:bg-primary/10 font-bold py-3 px-6 rounded-md transition-all flex items-center justify-center"
//                   >
//                     Explore More Courses
//                     <ChevronRight size={16} className="ml-2" />
//                   </Link>
//                 </div>
//               </div>
//             </AnimateOnScroll>
//           </div>
//         </div>
//       </section>
      
//       <Footer />
//     </div>
//   );
// }