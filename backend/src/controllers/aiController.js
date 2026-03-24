const { buildExplanationPrompt, buildDoubtPrompt } = require('../services/promptService');
const { generateWithOllama, getOllamaStatus } = require('../services/ollamaService');
const { HttpError } = require('../utils/httpError');

/**
 * POST /api/explain
 * Generates a teaching explanation for an algorithm step.
 */
const explainStep = async (req, res, next) => {
  try {
    const { algorithm, step, level = 'Beginner', previousStep } = req.body;

    if (!algorithm || !step) {
      throw new HttpError(400, 'algorithm and step are required.');
    }

    const prompt = buildExplanationPrompt({ algorithm, step, level, previousStep });
    const explanation = await generateWithOllama(prompt);

    res.status(200).json({
      explanation,
      model: process.env.OLLAMA_MODEL || 'olmo2',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/doubt
 * Answers a student's question about AI algorithms.
 */
const answerDoubt = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question) {
      throw new HttpError(400, 'question is required.');
    }

    const prompt = buildDoubtPrompt({ question });
    const answer = await generateWithOllama(prompt);

    res.status(200).json({
      answer,
      model: process.env.OLLAMA_MODEL || 'olmo2',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/ollama-status
 */
const ollamaStatus = async (_req, res, next) => {
  try {
    const status = await getOllamaStatus();
    res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  explainStep,
  answerDoubt,
  ollamaStatus,
};
