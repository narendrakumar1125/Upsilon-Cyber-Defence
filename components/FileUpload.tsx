'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { X, Upload, FileText, File, CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';

type FileUploadProps = {
  entityId: string;
  entityType: 'course' | 'service' | 'course-syllabus';
  onUploadComplete?: (fileUrl: string, fileName: string) => void;
  maxFiles?: number;
  acceptedFileTypes?: Record<string, string[]>;
};

export default function FileUpload({
  entityId,
  entityType,
  onUploadComplete,
  maxFiles = 5,
  acceptedFileTypes = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    'application/zip': ['.zip'],
    'application/x-zip-compressed': ['.zip'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
  },
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files at once.`);
      return;
    }
    
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, [files, maxFiles]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles,
  });
  
  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  
  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    try {
      for (const file of files) {
        // Create a unique filename
        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const filePath = `${entityType}/${entityId}/${fileName}`;
        
        // Create storage reference
        const storageRef = ref(storage, filePath);
        
        // Start upload
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        // Track progress
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
          },
          (error) => {
            console.error('Upload error:', error);
          },
          async () => {
            // Upload completed
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            // Save file reference to Firestore
            await addDoc(collection(db, 'resources'), {
              name: file.name,
              type: file.type,
              url: downloadURL,
              entityId,
              entityType,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
            
            // Update local state
            setUploadedFiles((prev) => [...prev, { name: file.name, url: downloadURL }]);
            
            // Call callback if provided
            if (onUploadComplete) {
              onUploadComplete(downloadURL, file.name);
            }
            
            // Clear completed files if all uploads are done
            if (Object.keys(uploadProgress).length === files.length && 
                Object.values(uploadProgress).every(progress => progress === 100)) {
              setFiles([]);
              setUploading(false);
              setUploadProgress({});
            }
          }
        );
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-gray-700 hover:border-primary/50 hover:bg-dark-200/50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-400">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop files here, or click to select files"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Accepted file types: PDF, DOCX, PPTX, ZIP, JPG, PNG (Max {maxFiles} files)
        </p>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-light">Selected Files</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-dark-200 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-light truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  disabled={uploading}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={uploadFiles}
            disabled={uploading}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-4 rounded-md transition-all"
          >
            {uploading ? "Uploading..." : `Upload ${files.length} File${files.length > 1 ? 's' : ''}`}
          </button>
        </div>
      )}
      
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-light">Upload Progress</h3>
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="truncate max-w-xs">{fileName}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-dark-300 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-light">Uploaded Files</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-dark-200/50 border border-primary/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-light truncate max-w-xs">
                      {file.name}
                    </p>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      View File
                    </a>
                  </div>
                </div>
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}