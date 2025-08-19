// Vercel serverless function
// Place this file in /api/identify-plant.js

import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // API key is stored as Vercel environment variable (without VITE_ prefix)
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const { imageData, mimeType } = req.body;
    
    const ai = new GoogleGenAI({ apiKey });
    
    const plantSchema = {
      type: "object",
      properties: {
        plantName: { type: "string", description: "Common name of the plant." },
        scientificName: { type: "string", description: "Scientific (Latin) name of the plant." },
        plantType: { type: "string", description: "Category of the plant, e.g., Succulent, Fern, Flower." },
        careInstructions: {
          type: "object",
          properties: {
            water: { type: "string", description: "Detailed watering needs for the plant." },
            sunlight: { type: "string", description: "Detailed sunlight requirements for the plant." },
          },
          required: ["water", "sunlight"]
        },
        origin: { type: "string", description: "Geographical origin of the plant." },
        funFact: { type: "string", description: "An interesting and fun fact about the plant." },
        hotspots: {
          type: "array",
          description: "A list of 3-5 interesting points on the plant image for user interaction.",
          items: {
            type: "object",
            properties: {
              x: { type: "number", description: "The x-coordinate as a percentage from the left edge (0-100) of the hotspot." },
              y: { type: "number", description: "The y-coordinate as a percentage from the top edge (0-100) of the hotspot." },
              title: { type: "string", description: "A brief title for the hotspot, e.g., 'Leaf Structure', 'Flower Bud', 'Stem'." },
              description: { type: "string", description: "A detailed, interesting description for the hotspot feature." }
            },
            required: ["x", "y", "title", "description"]
          }
        }
      },
      required: ["plantName", "scientificName", "plantType", "careInstructions", "origin", "funFact", "hotspots"]
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          { text: "You are an expert botanist. Identify the plant in this image..." },
          { inlineData: { data: imageData, mimeType } }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: plantSchema,
      }
    });

    const plantData = JSON.parse(response.text);
    res.json(plantData);
    
  } catch (error) {
    console.error('Plant identification error:', error);
    res.status(500).json({ error: 'Failed to identify plant' });
  }
}
