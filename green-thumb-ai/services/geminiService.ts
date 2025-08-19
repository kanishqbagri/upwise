
import { PlantData } from '../types';

// Utility function to convert a File to a base64 string
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        resolve(''); // Should not happen with readAsDataURL
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const identifyPlant = async (imageFile: File): Promise<PlantData> => {
  try {
    // Convert image to base64
    const imageData = await fileToGenerativePart(imageFile);
    
    // Call backend API instead of Gemini directly
    const response = await fetch('/api/identify-plant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageData: imageData.inlineData.data,
        mimeType: imageData.inlineData.mimeType,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const plantData = await response.json();
    return plantData as PlantData;

  } catch (error) {
    console.error("Error identifying plant:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to identify plant: ${error.message}`);
    }
    throw new Error("An unknown error occurred while identifying the plant.");
  }
};
