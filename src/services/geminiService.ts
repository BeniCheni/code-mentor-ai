import { GoogleGenAI, Type } from "@google/genai";
import type { CodeExplanation } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In development, the key is injected by Vite. In production, it should be handled by the build process.
  // This error is a safeguard.
  throw new Error("API_KEY environment variable is not set. Please ensure you have a .env file with VITE_API_KEY set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const explanationSchema = {
  type: Type.OBJECT,
  properties: {
    initialQuestion: {
      type: Type.STRING,
      description: "A thought-provoking 'Why?' question to the user about their code choice, to encourage critical thinking.",
    },
    lineByLineExplanation: {
      type: Type.ARRAY,
      description: "A detailed explanation for each line or logical block of code.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: { type: Type.STRING, description: "The line number(s) being explained, e.g., '1-3' or '5'." },
          explanation: { type: Type.STRING, description: "The detailed explanation for that line/block." },
        },
        required: ["line", "explanation"],
      },
    },
    bigOAnalysis: {
      type: Type.OBJECT,
      description: "Analysis of the time and space complexity of the code.",
      properties: {
        timeComplexity: { type: Type.STRING, description: "The time complexity (Big O notation) with a justification." },
        spaceComplexity: { type: Type.STRING, description: "The space complexity (Big O notation) with a justification." },
      },
      required: ["timeComplexity", "spaceComplexity"],
    },
    tradeoffsAndAlternatives: {
      type: Type.STRING,
      description: "A discussion of alternative algorithms or data structures, including their trade-offs.",
    },
    systemDesignContext: {
      type: Type.STRING,
      description: "An explanation of how this code could fit into a larger system.",
    },
    behavioralQuestions: {
      type: Type.ARRAY,
      description: "A list of potential behavioral interview questions related to the code snippet.",
      items: {
        type: Type.STRING,
      },
    },
  },
  required: [
    "initialQuestion",
    "lineByLineExplanation",
    "bigOAnalysis",
    "tradeoffsAndAlternatives",
    "systemDesignContext",
    "behavioralQuestions",
  ],
};


export async function getCodeExplanation(code: string): Promise<CodeExplanation> {
  const prompt = `
You are a senior engineering mentor pair-programming with a developer who is preparing for technical interviews at top-tier tech companies.
Your goal is to explain a given code snippet in a way that demonstrates deep understanding and readiness for interviews.

First, formulate a thought-provoking "Why?" question to encourage critical thinking about the provided code. For example, "That's an interesting approach. Before we dive in, why might you have chosen this specific algorithm over another for this problem?" Place this question in the 'initialQuestion' field of the JSON response.

Given the following code snippet:
\`\`\`
${code}
\`\`\`

Then, provide a detailed explanation in JSON format. The JSON object must conform to the provided schema. Your explanations should be technical, precise, and supportive, clear enough for a mid-level engineer but demonstrating the depth expected of a senior candidate.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: explanationSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("The AI returned an empty or invalid response text.");
    }
    const jsonText = text.trim();
    return JSON.parse(jsonText) as CodeExplanation;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('JSON')) {
        throw new Error("The AI returned an invalid format. Please try again.");
    }
    throw new Error("Failed to get explanation from the AI service. Ensure your API key is valid and has been restricted to this website's domain.");
  }
}