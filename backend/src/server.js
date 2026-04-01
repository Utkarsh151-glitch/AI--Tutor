const PORT = Number(process.env.PORT ?? 3000);
const {
  app
} = require('./app');
const {
  host,
  port
} = require('./config/env');
app.listen(PORT, host, () => {
  console.log(`AI Algorithm Tutor backend listening on http://${host}:${port}`);
});