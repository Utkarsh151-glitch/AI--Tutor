const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const aiRoutes = require('./routes/aiRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use((req, _res, next) => {
  const payload = req.method === 'GET' ? undefined : req.body;
  console.log(`[request] ${req.method} ${req.originalUrl}`, payload ? payload : '');
  next();
});

app.use('/api', aiRoutes);
app.use(errorHandler);

module.exports = { app };
