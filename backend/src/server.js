const PORT = Number(process.env.PORT || 3001); // Use specific port or default to 3001 if not provided in environment variables (e.g., 'ai-algorithm')
// Import and use the rest of your code here, make sure you handle errors properly as per best practices for server development with NodeJS/Express framework  
const { app } = require('./app'); // Use dotenv instead to load env vars in Express application (e.g., 'ai-algorithm') – this is not necessary but can be done if needed, e.g.: const host= process.env.HOST || "localhost"; and use it accordingly
const { port } = require('./config/env'); // Use dotenv instead to load env vars in Express application (e.g., 'ai-algorithm') – this is not necessary but can be done if needed, e.g.: const host= process.env.HOST || "localhost"; and use it accordingly
app.listen(PORT ,host,(err) => { // Use dotenv instead to load env vars in Express application (e.g., 'ai-algorithm') – this is not necessary but can be done if needed, e.g.: const host= process.env.HOST || "localhost"; and use it accordingly
   console.log(`AI Algorithm Tutor backend listening on http://${host}:${port} `); // Use dotenv instead to load env vars in Express application (e.g., 'ai-algorithm') – this is not necessary but can be done if needed, e.g.: const host= process.env.HOST || "localhost"; and use it accordingly
});  
