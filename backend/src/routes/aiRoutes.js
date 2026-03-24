const express = require('express');
const { answerDoubt, explainStep, ollamaStatus } = require('../controllers/aiController');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});
router.get('/ollama-status', ollamaStatus);

router.post('/explain', explainStep);
router.post('/doubt', answerDoubt);

module.exports = router;
