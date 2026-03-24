const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 4000,
  ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434/api/generate',
  ollamaModel: process.env.OLLAMA_MODEL || 'olmo2',
};
