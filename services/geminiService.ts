import { GoogleGenAI } from "@google/genai";

export interface GenerateImageResult {
  imageUrl: string | null;
  error?: string;
}

export const generateBeautyEdit = async (
  imageBase64: string,
  prompt: string,
  useProModel: boolean = true
): Promise<GenerateImageResult> => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    return { imageUrl: null, error: "API Key missing" };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const modelName = useProModel ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
    
    // Clean base64 string if it has prefix
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', 
              data: cleanBase64
            }
          },
          {
            text: `Act as a professional beauty editor. ${prompt} 
            IMPORTANT:
            - Return ONLY the edited image.
            - Maintain the identity of the person perfectly.
            - Keep the background exactly the same unless asked otherwise.
            - Ensure high realism and flattering lighting suitable for a beauty salon portfolio.`
          }
        ]
      },
      config: {
        // For image generation/editing, we don't strictly need systemInstruction in the config for all models, 
        // but it helps guide the style.
        systemInstruction: "You are an expert beauty AI for Queen Hair Beauty Center. Your goal is to create realistic, glamorous, and flattering beauty simulations.",
      }
    });

    // Extract image from response
    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return { imageUrl: `data:image/png;base64,${part.inlineData.data}` };
        }
      }
    }

    return { imageUrl: null, error: "No image generated" };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { imageUrl: null, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export const getConsultation = async (
  userGoal: string,
  language: 'en' | 'ar'
): Promise<string> => {
   if (!process.env.API_KEY) return "API Key missing";
   
   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

   try {
     const model = 'gemini-3-flash-preview';
     const prompt = `
       You are a beauty consultant at "Queen Hair Beauty Center" in Amman, Jordan.
       The user wants: "${userGoal}".
       Recommend 2-3 specific services from our salon (Hair, Nails, Bridal, Lashes).
       Be friendly, professional, and use emojis. 
       Answer in ${language === 'ar' ? 'Arabic' : 'English'}.
       Keep it short (under 100 words).
     `;

     const response = await ai.models.generateContent({
       model: model,
       contents: prompt
     });

     return response.text || "Could not generate advice.";
   } catch (e) {
     console.error(e);
     return "Sorry, I am having trouble thinking right now.";
   }
};