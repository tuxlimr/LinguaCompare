import { GoogleGenAI, Type } from "@google/genai";
import { ComparisonScenario } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateComparison = async (sentence: string): Promise<ComparisonScenario | null> => {
  if (!apiKey) {
    console.warn("No API key found. Using mock data generation logic would go here if fallback required.");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a language comparison for the English sentence: "${sentence}". 
      Translate it into Spanish, Japanese, German, Swedish, and Finnish. 
      Analyze the word mapping (type: noun, verb, adjective, etc.) and provide grammar notes. 
      Estimate difficulty (0-100).
      
      CRITICAL: For each word in the translated sentence, provide a 'matchingIndex'. 
      This index (0-based) represents which word in the original English sentence corresponds to this translated word.
      Example: If English is "I love cats" (I=0, love=1, cats=2) and Spanish is "Amo los gatos", 
      "Amo" matches "love" (1), "los" has no direct match or matches "cats" broadly, "gatos" matches "cats" (2).
      If a word has no clear match (like a particle), leave matchingIndex undefined.

      For Japanese, please include the Romanized pronunciation in the grammar notes.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            referenceSentence: { type: Type.STRING },
            languages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  language: { type: Type.STRING },
                  flag: { type: Type.STRING },
                  sentence: { type: Type.STRING },
                  wordMapping: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        text: { type: Type.STRING },
                        type: { 
                          type: Type.STRING, 
                          enum: ['noun', 'verb', 'particle', 'adjective', 'article', 'preposition', 'pronoun', 'other'] 
                        },
                        translation: { type: Type.STRING },
                        matchingIndex: { type: Type.INTEGER, description: "Index of the corresponding word in the English reference sentence." }
                      }
                    }
                  },
                  grammarNotes: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  difficulty: { type: Type.INTEGER }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as ComparisonScenario;
    }
    return null;
  } catch (error) {
    console.error("Error generating comparison:", error);
    return null;
  }
};

export const translateText = async (text: string): Promise<string> => {
    if (!apiKey) return "API Configuration Missing";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Translate the following text into English. If it is already in English, provide a brief definition or grammatical explanation. Keep the response concise (under 30 words) and helpful for a language learner. Text: "${text}"`,
      });
      return response.text || "Translation unavailable.";
    } catch (e) {
      console.error("Translation error:", e);
      return "Could not translate text.";
    }
  };