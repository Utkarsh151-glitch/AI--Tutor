const { app } = require('./app');
const { host, port } = require('./config/env');

app.listen(port, host, () => {
  console.log(`AI Algorithm Tutor backend listening on http://${host}:${port}`);
});
