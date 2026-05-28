'use client';

import { useState, useRef } from 'react';
import { Upload, X, CheckCircle, Download } from 'lucide-react';
import { uploadResource, Resource } from '@/lib/resources';

type FileUploadProps = {
  entityId: string;
  entityType: 'course' | 'service' | 'course-syllabus';
  onUploadComplete?: (url: string, name: string) => void;
};

export default function FileUpload({ 
  entityId, 
  entityType, 
  onUploadComplete 
}: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [uploadedFiles, setUploadedFiles] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    }
  };
  
  // Remove file from selected files
  const removeFile = (index: number) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  
  // Handle upload to Firebase Storage
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setError(null);

    const uploadPromises = selectedFiles.map(async (file) => {
      try {
        // Upload resource using the helper function
        return await uploadResource(
          file,
          entityId,
          entityType,
          (progress) => {
            // Update progress
            setUploadProgress(prev => ({
              ...prev,
              [file.name]: progress
            }));
          }
        );
      } catch (error: any) {
        console.error('Upload error:', error);
        setError(`Error uploading ${file.name}: ${error.message}`);
        return null;
      }
    });
    
    try {
      // Wait for all uploads to complete
      const results = await Promise.all(uploadPromises);

      // Filter out null results and update uploaded files state
      const validResults = results.filter(result => result !== null) as Resource[];

      // Notify parent for each successful upload
      validResults.forEach(resource => {
        if (onUploadComplete) {
          onUploadComplete(resource.url, resource.name);
        }
      });

      // Update uploaded files state
      setUploadedFiles(prev => [...prev, ...validResults]);

      // Clear selected files
      setSelectedFiles([]);
      setUploadProgress({});

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error during upload:', error);
      setError('An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Get appropriate icon for file type
  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('presentation') || type.includes('powerpoint')) return '📑';
    if (type.includes('image')) return '🖼️';
    if (type.includes('zip') || type.includes('compressed')) return '🗜️';
    return '📁';
  };
  
  return (
    <div className="space-y-6">
      {/* File Drop Zone */}
      <div 
        className="border-2 border-dashed border-dark-400 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-dark-300/30 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-300">Click to select files to upload</p>
        <p className="text-xs text-gray-500 mt-1">
          PDF, DOCX, XLSX, PPTX, JPG, PNG, ZIP files
        </p>
      </div>
      
      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-light">Selected Files</h3>
            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark text-sm font-bold py-2 px-4 rounded-md transition-all disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Files`}
            </button>
          </div>
          
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between bg-dark-300 p-3 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{getFileIcon(file.type)}</span>
                  <div>
                    <p className="font-medium text-light text-sm truncate max-w-xs">{file.name}</p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024).toFixed(1)} KB • {file.type.split('/')[1]}
                    </p>
                  </div>
                </div>
                
                {uploadProgress[file.name] !== undefined ? (
                  <div className="w-24 bg-dark-400 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{width: `${uploadProgress[file.name]}%`}}
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-400 p-1"
                    disabled={isUploading}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Upload Error */}
      {error && (
        <div className="bg-red-500/20 text-red-400 p-4 rounded-md">
          {error}
        </div>
      )}
      
      {/* Recently Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-light">Recently Uploaded</h3>
          
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between bg-dark-300/50 border border-primary/20 p-3 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <p className="font-medium text-light text-sm truncate max-w-xs">{file.name}</p>
                </div>
                
                <a 
                  href={file.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:text-primary/80 space-x-1"
                >
                  <Download size={14} />
                  <span className="text-xs">Download</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}