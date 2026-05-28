import { getCourses, getServices } from '@/lib/firestore';

export async function getCourseIds() {
  // Always include hardcoded course IDs first to ensure routes are generated
  const hardcodedCourseIds = [
    { id: 'cloud-security' },
    { id: 'network-security' },
    { id: 'siem-solutions' },
    { id: 'ci-cd-pipelines' },
    { id: 'docker-kubernetes' },
    { id: 'infrastructure-as-code' },
    { id: 'aws-fundamentals' },
    { id: 'azure-cloud' },
    { id: 'gcp-essentials' },
    { id: 'data-analytics' },
    { id: 'machine-learning' },
    { id: 'big-data' }
  ];
  
  try {
    const courses = await getCourses();
    const courseIds = courses.map((course) => ({
      id: course.id,
    }));
    
    // Combine hardcoded IDs with Firestore IDs, removing duplicates
    const allIds = [...hardcodedCourseIds];
    courseIds.forEach(course => {
      if (!allIds.find(c => c.id === course.id)) {
        allIds.push(course);
      }
    });
    
    return allIds;
  } catch (error) {
    console.error('Error fetching course IDs:', error);
    // Always return hardcoded course IDs as fallback
    return hardcodedCourseIds;
  }
}

export async function getServiceIds() {
  // Always include hardcoded service IDs first to ensure routes are generated
  const hardcodedServiceIds = [
    { id: 'strategy-consulting' },
    { id: 'managed-services' },
    { id: 'integration-services' },
    { id: 'security-trainings' }
  ];
  
  try {
    const services = await getServices();
    const serviceIds = services.map((service) => ({
      id: service.id,
    }));
    
    // Combine hardcoded IDs with Firestore IDs, removing duplicates
    const allIds = [...hardcodedServiceIds];
    serviceIds.forEach(service => {
      if (!allIds.find(s => s.id === service.id)) {
        allIds.push(service);
      }
    });
    
    return allIds;
  } catch (error) {
    console.error('Error fetching service IDs:', error);
    // Always return hardcoded service IDs as fallback
    return hardcodedServiceIds;
  }
}