# AI Algorithm Visualizer

A production-grade mobile app for learning AI algorithms through step-by-step visualization with AI-powered explanations.

## Tech Stack

- **Mobile**: React Native (Expo)
- **Backend**: Node.js (Express)
- **AI**: Ollama (OLMo 2 - 7B)

## Setup

### Backend
```bash
cd backend
npm install
# Create .env with:
# HOST=0.0.0.0
# PORT=4000
# OLLAMA_URL=http://localhost:11434/api/generate
# OLLAMA_MODEL=olmo2
npm run dev
```

### Ollama
```bash
ollama pull olmo2
ollama serve
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```

> Update `mobile/src/services/api.ts` with your local IP address.

## Features

- **A* Pathfinding Visualizer** – Step-by-step grid pathfinding with AI explanations
- **Alpha-Beta Pruning Visualizer** – Game tree search with pruning visualization
- **AI Chat** – Ask questions about any algorithm
- **Light Tactile UI** – Premium design with soft neomorphic shadows and glass panels
