import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
} else {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable. AI features will be disabled.");
}

const getAi = (): GoogleGenAI => {
    if (!ai) {
        throw new Error("Gemini AI client is not initialized. Please check your API_KEY environment variable.");
    }
    return ai;
};

/**
 * Analyzes resume text and provides feedback.
 * @param resumeText The text content of the resume.
 * @returns A string containing AI-generated feedback.
 */
export const analyzeResume = async (resumeText: string): Promise<string> => {
  try {
    const aiClient = getAi();
    const prompt = `You are an expert career coach for students and new graduates. Analyze the following resume text and provide constructive feedback. Focus on clarity, impact of bullet points (using action verbs and quantifiable results), and formatting suggestions. Structure your feedback into three sections: "✅ Strengths", "📈 Areas for Improvement", and "🚀 Actionable Suggestions". Keep the feedback concise and encouraging. The resume is:\n\n---\n\n${resumeText}`;

    const response: GenerateContentResponse = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return "Sorry, I couldn't analyze the resume at this time. Please try again later.";
  }
};

/**
 * Enhances a job description to be more engaging.
 * @param jobDescription The original job description text.
 * @returns An enhanced version of the job description.
 */
export const enhanceJobDescription = async (jobDescription: string): Promise<string> => {
  try {
    const aiClient = getAi();
    const prompt = `You are an expert copywriter specializing in job descriptions. Rewrite the following job description to be more engaging, clear, and inclusive. Use a friendly yet professional tone. Ensure it highlights the company culture and attracts top talent. Structure it with clear headings like "What You'll Do", "What We're Looking For", and "Why You'll Love Working With Us". The original description is:\n\n---\n\n${jobDescription}`;
    
    const response: GenerateContentResponse = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error enhancing job description:", error);
    return "Sorry, I couldn't enhance the job description at this time. Please try again later.";
  }
};

/**
 * Generates a professional profile image based on a text prompt.
 * @param prompt A text description for the desired image.
 * @returns A base64 encoded string of the generated image.
 */
export const generateProfileImage = async (prompt: string): Promise<string> => {
    try {
        const aiClient = getAi();
        const fullPrompt = `A professional, friendly-looking headshot of ${prompt}, digital art, suitable for a professional profile on a job board. Soft, clean background.`;
        
        const response = await aiClient.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: fullPrompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating profile image:", error);
        throw new Error("Failed to generate profile image. Please try a different prompt.");
    }
};
