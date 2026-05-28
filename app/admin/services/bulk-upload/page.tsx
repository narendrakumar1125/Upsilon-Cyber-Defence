'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, FileJson, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function BulkUploadServicesPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<{ success: string[]; errors: string[] } | null>(null);
  const [preview, setPreview] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile);
      // Read and preview the file
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          setPreview(Array.isArray(data) ? data : []);
        } catch (error) {
          alert('Invalid JSON file');
          setFile(null);
          setPreview([]);
        }
      };
      reader.readAsText(selectedFile);
    } else {
      alert('Please select a JSON file');
    }
  };

  const handleUpload = async () => {
    if (!file || preview.length === 0) return;

    setUploading(true);
    const successfulUploads: string[] = [];
    const failedUploads: string[] = [];

    try {
      for (const service of preview) {
        try {
          // Validate required fields
          if (!service.title || !service.description || !service.category) {
            failedUploads.push(`${service.title || 'Unknown'}: Missing required fields`);
            continue;
          }

          // Use existing ID or generate new one
          const serviceId = service.id || doc(collection(db, 'services')).id;
          
          await setDoc(doc(db, 'services', serviceId), {
            ...service,
            id: serviceId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            authorId: 'bulk-upload' // You might want to get the actual user ID
          });

          successfulUploads.push(service.title);
        } catch (error) {
          failedUploads.push(`${service.title}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      setResults({
        success: successfulUploads,
        errors: failedUploads
      });
    } catch (error) {
      console.error('Bulk upload error:', error);
      alert('Failed to upload services');
    } finally {
      setUploading(false);
    }
  };

  const downloadSampleFile = () => {
    const sampleData = [
      {
        id: "sample-service-1",
        title: "Sample Service Title",
        description: "Detailed description of the service and what it includes.",
        category: "consulting",
        price: "Custom Quote",
        featured: false,
        features: [
          "Feature 1 description",
          "Feature 2 description",
          "Feature 3 description"
        ],
        tags: ["consulting", "security", "assessment"]
      }
    ];

    const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-services.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/services"
            className="text-gray-400 hover:text-light transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-light">Bulk Upload Services</h1>
        </div>
      </div>

      <div className="bg-dark-200 p-6 rounded-lg">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-light mb-2">Upload Instructions</h2>
          <ul className="text-gray-300 space-y-2">
            <li>• Upload a JSON file containing an array of service objects</li>
            <li>• Each service must have: title, description, and category</li>
            <li>• Optional fields: id, price, featured, features (array of strings), tags</li>
            <li>• Categories: consulting, managed, integration, training</li>
            <li>• If no ID is provided, one will be generated automatically</li>
          </ul>
          <button
            onClick={downloadSampleFile}
            className="mt-4 text-primary hover:text-primary/80 underline"
          >
            Download Sample JSON File
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select JSON File
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-dark hover:file:bg-primary/80"
              />
              {file && (
                <div className="flex items-center gap-2 text-sky-300">
                  <FileJson size={20} />
                  <span className="text-sm">{file.name}</span>
                </div>
              )}
            </div>
          </div>

          {preview.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-light mb-3">Preview ({preview.length} services)</h3>
              <div className="max-h-60 overflow-y-auto bg-dark-300 rounded-lg p-4">
                <div className="space-y-2">
                  {preview.map((service, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{service.title || 'Untitled'}</span>
                      <span className="text-gray-500">{service.category || 'No category'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {file && preview.length > 0 && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-6 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload {preview.length} Services
                </>
              )}
            </button>
          )}
        </div>

        {results && (
          <div className="mt-6 space-y-4">
            {results.success.length > 0 && (
              <div className="bg-sky-950/30 border border-sky-400/40/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-sky-300" size={20} />
                  <h3 className="text-sky-300 font-bold">Successfully Uploaded ({results.success.length})</h3>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  {results.success.map((title, index) => (
                    <li key={index}>• {title}</li>
                  ))}
                </ul>
              </div>
            )}

            {results.errors.length > 0 && (
              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="text-red-400" size={20} />
                  <h3 className="text-red-400 font-bold">Failed Uploads ({results.errors.length})</h3>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  {results.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setFile(null);
                  setPreview([]);
                  setResults(null);
                }}
                className="flex-1 bg-dark-300 hover:bg-dark-400 text-light font-bold py-2 px-4 rounded-md transition-all"
              >
                Upload More
              </button>
              <Link
                href="/admin/services"
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-2 px-4 rounded-md transition-all text-center"
              >
                View All Services
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}