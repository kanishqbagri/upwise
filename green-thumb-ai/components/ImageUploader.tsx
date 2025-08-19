
import React, { useRef } from 'react';
import { CameraIcon, UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const triggerCamera = () => {
      cameraInputRef.current?.click();
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl text-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        disabled={isLoading}
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        capture="environment"
        disabled={isLoading}
      />
      <div className="border-2 border-dashed border-gray-300 p-12 rounded-lg flex flex-col items-center">
        <span className="material-icons text-7xl text-green-500 mb-4">potted_plant</span>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Identify Your Plant</h2>
        <p className="text-gray-500 mb-6">Upload a photo or use your camera to get started.</p>
        <div className="flex space-x-4">
            <button
                onClick={triggerFileUpload}
                disabled={isLoading}
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                <UploadIcon />
                Upload Image
            </button>
            <button
                onClick={triggerCamera}
                disabled={isLoading}
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                <CameraIcon />
                Use Camera
            </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
