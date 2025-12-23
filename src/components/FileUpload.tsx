'use client';

import { Upload } from 'lucide-react';
import { ConversationData } from '@/types';

interface FileUploadProps {
  onDataLoaded: (data: ConversationData) => void;
}

export default function FileUpload({ onDataLoaded }: FileUploadProps) {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data: ConversationData = JSON.parse(text);
      onDataLoaded(data);
    } catch (error) {
      console.error('Error parsing JSON file:', error);
      alert('Invalid JSON file. Please upload a valid conversation file.');
    }
  };

  return (
    <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
      <label className="flex items-center gap-3 cursor-pointer">
        <Upload className="text-blue-600" size={24} />
        <span className="text-lg font-medium text-gray-700">Upload JSON File</span>
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
