/**
 * Gemini AI Service – Replaces Ollama with Google Gemini API
 */
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { geminiApiKey, geminiModel } = require('../config/env');
const { HttpError } = require('../utils/httpError');

let genAI = null;
let model = null;

const getModel = () => {
  if (!geminiApiKey) {
    throw new HttpError(500, 'GEMINI_API_KEY is not configured in .env');
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(geminiApiKey);
    model = genAI.getGenerativeModel({ model: geminiModel });
  }
  return model;
};

const generateWithGemini = async (prompt) => {
  try {
    const m = getModel();
    const result = await m.generateContent(prompt);
    const response = await result.response;
    const text = response.text()?.trim();

    if (!text) {
      console.error('[gemini] Empty response');
      throw new HttpError(502, 'Gemini returned an empty response.');
    }

    return text;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    const details = error.message || 'Unknown Gemini error';
    console.error('[gemini] Generate request failed:', details);
    throw new HttpError(502, 'Failed to generate response from Gemini.', details);
  }
};

const getGeminiStatus = async () => {
  try {
    if (!geminiApiKey) {
      return {
        reachable: false,
        modelConfigured: geminiModel,
        modelAvailable: false,
        availableModels: [],
        error: 'GEMINI_API_KEY not set in .env',
      };
    }

    // Quick test: generate a tiny response to verify the key works
    const m = getModel();
    await m.generateContent('Reply with just the word OK');

    return {
      reachable: true,
      modelConfigured: geminiModel,
      modelAvailable: true,
      availableModels: [geminiModel],
    };
  } catch (error) {
    return {
      reachable: false,
      modelConfigured: geminiModel,
      modelAvailable: false,
      availableModels: [],
      error: error.message,
    };
  }
};

module.exports = { generateWithGemini, getGeminiStatus };
