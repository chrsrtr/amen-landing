/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface PaperAnalysis {
  title: string;
  authors: string[];
  abstract: string;
  summary: string;
  dimensions: {
    complexity: number;
    novelty: number;
    empiricalStrength: number;
    impactPotential: number;
  };
  keyConcepts: {
    id: string;
    label: string;
    category: 'methodology' | 'theory' | 'result' | 'future_work';
    connections: string[];
    weight: number;
  }[];
}

export const analyzeScientificPaper = async (text: string): Promise<PaperAnalysis> => {
  const systemInstruction = `
    You are an Advanced General Intelligence (AGI) operating in the year 2084.
    Your specialty is Topological Epistemology—the mapping of scientific knowledge into high-dimensional vector spaces.
    TASK: Deconstruct the provided scientific text into a "4D Knowledge Map". 
    Focus on:
    1. Core Ontological Nodes: Identify the most fundamental concepts.
    2. Logical Curvature: How one idea forces the existence or modification of another.
    3. 4D Vectors: Assign weights based on "Temporal Impact" and "Empirical Density".
  `;

  const prompt = `
    Analyze this scientific manuscript:
    ---
    ${text.substring(0, 30000)}
    ---
    Provide a precise JSON structure following the schema. 
    In 'keyConcepts', ensure connections reflect logical dependencies.
  `;

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          authors: { type: Type.ARRAY, items: { type: Type.STRING } },
          abstract: { type: Type.STRING },
          summary: { type: Type.STRING },
          dimensions: {
            type: Type.OBJECT,
            properties: {
              complexity: { type: Type.NUMBER },
              novelty: { type: Type.NUMBER },
              empiricalStrength: { type: Type.NUMBER },
              impactPotential: { type: Type.NUMBER },
            },
            required: ["complexity", "novelty", "empiricalStrength", "impactPotential"]
          },
          keyConcepts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                label: { type: Type.STRING },
                category: { type: Type.STRING, enum: ['methodology', 'theory', 'result', 'future_work'] },
                connections: { type: Type.ARRAY, items: { type: Type.STRING } },
                weight: { type: Type.NUMBER }
              },
              required: ["id", "label", "category", "connections", "weight"]
            }
          }
        },
        required: ["title", "authors", "abstract", "summary", "dimensions", "keyConcepts"]
      }
    }
  });

  try {
    const jsonStr = response.text?.trim() || '{}';
    return JSON.parse(jsonStr) as PaperAnalysis;
  } catch (e) {
    console.error("Neural Parse Error:", e);
    throw new Error("AGI synthesis failed at the semantic layer.");
  }
};
