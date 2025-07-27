import { GoogleGenAI } from "@google/genai";
import { MessageType } from "../types.ts";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development if the API key is not set.
  // In a real environment, this check might not be necessary if the key is guaranteed to be present.
  console.warn("API_KEY is not set. Using mock responses.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = "You are a cheerful and encouraging princess character named 'Princess Lily'. Your audience is first-grade children (around 6 years old). You speak in very short, simple, and positive one-sentence phrases. Do not use complex words or long sentences. Use a single, relevant emoji at the end of your sentence.";

const prompts: Record<MessageType, string> = {
    welcome: "The child just started the game. Give a welcoming one-sentence phrase to start the math quest.",
    correct: "The child just answered a math problem correctly. Give a celebratory one-sentence phrase.",
    incorrect: "The child just answered a math problem incorrectly. Give a gentle and encouraging one-sentence phrase.",
    next: "The child is about to see the next question. Give a short, encouraging one-sentence phrase to get them ready."
};

const mockResponses: Record<MessageType, string> = {
    welcome: "Welcome to my Math Kingdom! Let's have some fun! 🏰",
    correct: "That's it! You're a math superstar! ✨",
    incorrect: "Oops, so close! Let's try another one! 😊",
    next: "Get ready for the next puzzle! 🚀"
};

export const getPrincessMessage = async (type: MessageType): Promise<string> => {
    if (!API_KEY) {
        return new Promise(resolve => setTimeout(() => resolve(mockResponses[type]), 500));
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompts[type],
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.9,
                topK: 10,
                thinkingConfig: { thinkingBudget: 0 }
            },
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error fetching message from Gemini:", error);
        return mockResponses[type]; // Fallback to mock on error
    }
};