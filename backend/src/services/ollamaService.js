const axios = require('axios');
const { ollamaModel, ollamaUrl } = require('../config/env');
const { HttpError } = require('../utils/httpError');

const buildTagsUrl = () => ollamaUrl.replace(/\/generate$/, '/tags');

const generateWithOllama = async (prompt) => {
  try {
    const response = await axios.post(
      ollamaUrl,
      {
        model: ollamaModel,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 220,
        },
      },
      {
        timeout: 45000,
      },
    );

    const text = response.data?.response?.trim();

    if (!text) {
      console.error('[ollama] Empty response payload:', response.data);
      throw new HttpError(502, 'Ollama returned an empty response.', response.data);
    }

    return text;
  } catch (error) {
    const details = error.response?.data || error.message;
    console.error('[ollama] Generate request failed:', details);
    throw new HttpError(502, 'Failed to generate response from Ollama.', details);
  }
};

const getOllamaStatus = async () => {
  try {
    const response = await axios.get(buildTagsUrl(), { timeout: 5000 });
    const models = Array.isArray(response.data?.models) ? response.data.models : [];

    return {
      reachable: true,
      modelConfigured: ollamaModel,
      modelAvailable: models.some((model) => model.name?.startsWith(ollamaModel)),
      availableModels: models.map((model) => model.name),
    };
  } catch (error) {
    return {
      reachable: false,
      modelConfigured: ollamaModel,
      modelAvailable: false,
      availableModels: [],
      error: error.message,
    };
  }
};

module.exports = { generateWithOllama, getOllamaStatus };
