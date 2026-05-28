import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';

// Course type
export interface Course {
  id?: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  price: string;
  popular: boolean;
  featured: boolean;
  tags: string[];
  syllabusLink?: string;
  authorId: string;
  createdAt?: any;
  updatedAt?: any;
}

// Service type
export interface Service {
  id?: string;
  title: string;
  description: string;
  category: string;
  overview: string;
  benefits: string[];
  features: { title: string; description: string }[];
  process: { step: string; description: string }[];
  caseStudyTitle?: string;
  caseStudyDescription?: string;
  authorId: string;
  createdAt?: any;
  updatedAt?: any;
}

// Resource type
export interface Resource {
  id?: string;
  name: string;
  type: string;
  url: string;
  entityId: string;
  entityType: 'course' | 'service';
  createdAt?: any;
  updatedAt?: any;
}

// User type
export interface User {
  id?: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  photoURL?: string;
  createdAt?: any;
  updatedAt?: any;
}

// Helper function to convert Firestore doc to typed object with ID
const convertDoc = <T>(doc: QueryDocumentSnapshot<DocumentData>): T => {
  return {
    id: doc.id,
    ...doc.data()
  } as T;
};

// Course operations
export const getCourses = async (): Promise<Course[]> => {
  const coursesCol = collection(db, 'courses');
  const q = query(coursesCol, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => convertDoc<Course>(doc));
};

export const getPopularCourses = async (count = 3): Promise<Course[]> => {
  const coursesCol = collection(db, 'courses');
  const q = query(
    coursesCol,
    where('popular', '==', true),
    orderBy('createdAt', 'desc'),
    limit(count)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => convertDoc<Course>(doc));
};

export const getFeaturedCourses = async (count = 6): Promise<Course[]> => {
  const coursesCol = collection(db, 'courses');
  const q = query(
    coursesCol,
    where('featured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(count)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => convertDoc<Course>(doc));
};

export const getCourse = async (id: string): Promise<Course | null> => {
  const courseDoc = doc(db, 'courses', id);
  const snapshot = await getDoc(courseDoc);
  
  if (!snapshot.exists()) return null;
  
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as Course;
};

export const createCourse = async (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> => {
  const coursesCol = collection(db, 'courses');
  const docRef = await addDoc(coursesCol, {
    ...course,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  
  return {
    id: docRef.id,
    ...course
  };
};

export const updateCourse = async (id: string, course: Partial<Omit<Course, 'id' | 'createdAt'>>): Promise<Course> => {
  const courseDoc = doc(db, 'courses', id);
  await updateDoc(courseDoc, {
    ...course,
    updatedAt: serverTimestamp()
  });
  
  return {
    id,
    ...course
  } as Course;
};

export const deleteCourse = async (id: string): Promise<string> => {
  const courseDoc = doc(db, 'courses', id);
  await deleteDoc(courseDoc);
  return id;
};

// Service operations
export const getServices = async (): Promise<Service[]> => {
  const servicesCol = collection(db, 'services');
  const q = query(servicesCol, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => convertDoc<Service>(doc));
};

export const getService = async (id: string): Promise<Service | null> => {
  const serviceDoc = doc(db, 'services', id);
  const snapshot = await getDoc(serviceDoc);
  
  if (!snapshot.exists()) return null;
  
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as Service;
};

export const createService = async (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> => {
  const servicesCol = collection(db, 'services');
  const docRef = await addDoc(servicesCol, {
    ...service,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  
  return {
    id: docRef.id,
    ...service
  };
};

export const updateService = async (id: string, service: Partial<Omit<Service, 'id' | 'createdAt'>>): Promise<Service> => {
  const serviceDoc = doc(db, 'services', id);
  await updateDoc(serviceDoc, {
    ...service,
    updatedAt: serverTimestamp()
  });
  
  return {
    id,
    ...service
  } as Service;
};

export const deleteService = async (id: string): Promise<string> => {
  const serviceDoc = doc(db, 'services', id);
  await deleteDoc(serviceDoc);
  return id;
};

// Resource operations
export const getResources = async (): Promise<Resource[]> => {
  const resourcesCol = collection(db, 'resources');
  const q = query(resourcesCol, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => convertDoc<Resource>(doc));
};

export const getResourcesForEntity = async (entityId: string, entityType: 'course' | 'service'): Promise<Resource[]> => {
  const resourcesCol = collection(db, 'resources');
  const q = query(
    resourcesCol,
    where('entityId', '==', entityId),
    where('entityType', '==', entityType),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => convertDoc<Resource>(doc));
};

export const createResource = async (resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>): Promise<Resource> => {
  const resourcesCol = collection(db, 'resources');
  const docRef = await addDoc(resourcesCol, {
    ...resource,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  
  return {
    id: docRef.id,
    ...resource
  };
};

export const updateResource = async (id: string, resource: Partial<Omit<Resource, 'id' | 'createdAt'>>): Promise<Resource> => {
  const resourceDoc = doc(db, 'resources', id);
  await updateDoc(resourceDoc, {
    ...resource,
    updatedAt: serverTimestamp()
  });
  
  return {
    id,
    ...resource
  } as Resource;
};

export const deleteResource = async (id: string): Promise<string> => {
  const resourceDoc = doc(db, 'resources', id);
  await deleteDoc(resourceDoc);
  return id;
};

// User operations
export const getUsers = async (): Promise<User[]> => {
  const usersCol = collection(db, 'users');
  const snapshot = await getDocs(usersCol);
  return snapshot.docs.map(doc => convertDoc<User>(doc));
};

export const getUser = async (id: string): Promise<User | null> => {
  const userDoc = doc(db, 'users', id);
  const snapshot = await getDoc(userDoc);
  
  if (!snapshot.exists()) return null;
  
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as User;
};

export const updateUser = async (id: string, user: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> => {
  const userDoc = doc(db, 'users', id);
  await updateDoc(userDoc, {
    ...user,
    updatedAt: serverTimestamp()
  });
  
  return {
    id,
    ...user
  } as User;
};

// Count operations - useful for dashboards
export const getCourseCount = async (): Promise<number> => {
  const snapshot = await getDocs(collection(db, 'courses'));
  return snapshot.size;
};

export const getServiceCount = async (): Promise<number> => {
  const snapshot = await getDocs(collection(db, 'services'));
  return snapshot.size;
};

export const getResourceCount = async (): Promise<number> => {
  const snapshot = await getDocs(collection(db, 'resources'));
  return snapshot.size;
};

export const getUserCount = async (): Promise<number> => {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.size;
};