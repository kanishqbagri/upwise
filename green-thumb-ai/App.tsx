import React, { useState, useCallback } from 'react';
import { PlantData } from './types';
import { identifyPlant } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import InteractiveImage from './components/InteractiveImage';
import PlantInfoCard from './components/PlantInfoCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';

const App: React.FC = () => {
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setPlantData(null);
    
    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);

    try {
      const data = await identifyPlant(file);
      setPlantData(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      // Keep the uploaded image visible on error
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleReset = () => {
      setPlantData(null);
      setImageSrc(null);
      setError(null);
      setIsLoading(false);
  }

  const clearError = () => {
      setError(null);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-6xl mx-auto mb-6 text-center">
          <div className="flex items-center justify-center cursor-pointer" onClick={handleReset}>
            <span className="material-icons text-5xl text-green-600">potted_plant</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 ml-3">Green Thumb AI</h1>
          </div>
          <p className="text-gray-500 mt-2">Your personal AI botanist.</p>
      </header>

      <main className="w-full max-w-6xl mx-auto flex-grow">
        {error && <div className="mb-4"><ErrorDisplay message={error} onClear={clearError} /></div>}
        
        {!imageSrc && !isLoading && <ImageUploader onImageSelect={handleImageSelect} isLoading={isLoading} />}
        
        {isLoading && <div className="w-full bg-white p-8 rounded-xl shadow-2xl flex justify-center items-center"><LoadingSpinner /></div>}

        {imageSrc && !isLoading && plantData && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-fade-in">
            <div className="lg:col-span-2 aspect-square">
                <InteractiveImage imageSrc={imageSrc} plantData={plantData} />
            </div>
            <div className="lg:col-span-3 flex flex-col">
                <div className="flex-grow">
                    <PlantInfoCard plantData={plantData} />
                </div>
                <button 
                    onClick={handleReset}
                    className="mt-6 w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                >
                    Identify Another Plant
                </button>
            </div>
          </div>
        )}

        {imageSrc && !isLoading && !plantData && !error && (
             <div className="text-center p-8">
                 <p className="text-gray-600">Something went wrong, but no error was reported. Please try again.</p>
                 <button onClick={handleReset} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Try Again</button>
             </div>
        )}

        {imageSrc && !isLoading && error && (
            <div className="text-center p-4">
                <img src={imageSrc} alt="Upload attempt" className="max-w-xs mx-auto rounded-lg shadow-md mb-4"/>
                <button 
                    onClick={handleReset}
                    className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
                >
                    Try a Different Image
                </button>
            </div>
        )}
      </main>

      <footer className="w-full max-w-6xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Powered by Google Gemini. Designed for educational and entertainment purposes.</p>
      </footer>
    </div>
  );
};

export default App;
