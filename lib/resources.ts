import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';

export interface Resource {
  id?: string;
  name: string;
  type: string;
  size: number;
  url: string;
  entityId: string;
  entityType: 'course' | 'service' | 'course-syllabus';
  createdAt?: any;
  updatedAt?: any;
}

// Get resources for a specific entity (course or service)
export const getResourcesForEntity = async (
  entityId: string, 
  entityType: 'course' | 'service' | 'course-syllabus'
): Promise<Resource[]> => {
  try {
    const q = query(
      collection(db, 'resources'),
      where('entityId', '==', entityId),
      where('entityType', '==', entityType),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Resource[];
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
};

// Upload a file to Firebase Storage and add a record to the resources collection
export const uploadResource = async (
  file: File,
  entityId: string,
  entityType: 'course' | 'service' | 'course-syllabus',
  onProgress?: (progress: number) => void
): Promise<Resource | null> => {
  try {
    // Create a unique filename
    const fileId = uuidv4();
    const fileName = file.name;
    const path = `resources/${entityType}/${fileId}_${fileName}`;
    
    // Create storage reference
    const storageRef = ref(storage, path);
    
    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    // Return a promise that resolves with the file data
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress updates
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          if (onProgress) onProgress(progress);
        },
        (error) => {
          // Error handling
          console.error('Upload error:', error);
          reject(error);
        },
        async () => {
          // Upload complete
          try {
            // Get download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            // Add to Firestore
            const resourceData: Omit<Resource, 'id'> = {
              name: fileName,
              type: file.type,
              size: file.size,
              url: downloadURL,
              entityId,
              entityType,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            };
            
            const docRef = await addDoc(collection(db, 'resources'), resourceData);
            
            // Resolve with the new resource
            resolve({
              id: docRef.id,
              ...resourceData
            });
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error uploading resource:', error);
    return null;
  }
};

// Delete a resource (from both Storage and Firestore)
export const deleteResource = async (resourceId: string): Promise<boolean> => {
  try {
    // Get the resource data
    const resourceRef = doc(db, 'resources', resourceId);
    const resourceSnap = await getDoc(resourceRef);
    
    if (resourceSnap.exists()) {
      const resourceData = resourceSnap.data();
      
      // Delete from Storage if URL exists
      if (resourceData.url) {
        try {
          // Extract storage path from URL
          const url = new URL(resourceData.url);
          const storagePath = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
          const storageRef = ref(storage, storagePath);
          await deleteObject(storageRef);
        } catch (error) {
          console.error('Error deleting file from storage:', error);
          // Continue even if storage deletion fails
        }
      }
      
      // Delete from Firestore
      await deleteDoc(resourceRef);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error deleting resource:', error);
    return false;
  }
};

// Get all resources
export const getAllResources = async (): Promise<Resource[]> => {
  try {
    const q = query(
      collection(db, 'resources'),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Resource[];
  } catch (error) {
    console.error('Error fetching all resources:', error);
    return [];
  }
};

// Get resources by type
export const getResourcesByType = async (entityType: 'course' | 'service' | 'course-syllabus'): Promise<Resource[]> => {
  try {
    const q = query(
      collection(db, 'resources'),
      where('entityType', '==', entityType),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Resource[];
  } catch (error) {
    console.error(`Error fetching ${entityType} resources:`, error);
    return [];
  }
};