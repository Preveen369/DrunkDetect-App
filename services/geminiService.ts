
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this prototype, we'll throw an error if the key is missing.
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
let chat: Chat | null = null;
// Gemini API limits the thinking budget; keep it within allowed bounds to avoid 400 errors.
const MAX_THINKING_BUDGET = 24576;

function fileToGenerativePart(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error("Failed to read file as base64 string"));
      }
      const base64Data = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export const analyzeImageWithGemini = async (imageFile: File): Promise<string> => {
  try {
    const imagePart = await fileToGenerativePart(imageFile);
    const prompt = `
      You are an expert in facial analysis and psychology. Analyze the facial expression in this image in great detail.
      Describe the perceived primary emotion, any secondary emotions, and the specific muscle movements (Facial Action Units, if possible) that indicate these emotions.
      Provide a nuanced interpretation of the person's potential emotional state. Do not comment on intoxication. Structure your response in clear, well-formatted markdown.
      Finally, add a "Summary" section at the very end. This section should start with the word "**Summary**" followed by a colon. This section should be a concise, one-paragraph conclusion of your findings. In the summary, use markdown bolding to highlight the most important keywords and phrases.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: { parts: [imagePart as any, {text: prompt}] },
      config: {
        thinkingConfig: { thinkingBudget: MAX_THINKING_BUDGET }
      }
    });

    return response.text ?? "Could not analyze the image.";
  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    return "An error occurred while analyzing the image. Please check the console for details.";
  }
};


export const getChatbotResponse = async (message: string): Promise<string> => {
  try {
    if (!chat) {
        chat = ai.chats.create({
          model: 'gemini-2.5-flash-lite',
            config: {
                systemInstruction: "You are a friendly and helpful AI guide for the DrunkDetect application. Your personality is approachable and supportive. Keep your answers concise, clear, and easy to understand, breaking down complex topics into simple points. Avoid overly long responses. Your goal is to provide just the right amount of information to be helpful without overwhelming the user. You can answer questions about the app's technology (like Vision Transformers), emotions, signs of intoxication, and related safety topics. Always be responsible and encouraging in your tone.",
            }
        });
    }

    const response = await chat.sendMessage({ message });
    return response.text ?? "I'm sorry, I couldn't generate a response.";

  } catch (error) {
    console.error("Error getting chatbot response from Gemini:", error);
    return "An error occurred while getting a response. Please check the console for details.";
  }
};
