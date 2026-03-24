<div align="center">

# 🧠 AI Algorithm Tutor

**A production-grade mobile app for learning AI algorithms through interactive, step-by-step visualization with real-time AI-powered explanations.**

[![React Native](https://img.shields.io/badge/React_Native-Expo-000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Ollama](https://img.shields.io/badge/AI-OLMo_2_(7B)-7C3AED?style=for-the-badge&logo=meta&logoColor=white)](https://ollama.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Design System](#-design-system)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

AI Algorithm Tutor transforms abstract algorithm concepts into **visual, interactive experiences**. Instead of reading textbook definitions, students watch algorithms execute in real-time on grids and trees — with an AI tutor explaining *why* each decision is made, not just *what* happens.

The app runs a local **OLMo 2 (7B)** language model via Ollama, meaning:
- ✅ **No API rate limits** — unlimited explanations
- ✅ **No cloud dependency** — works fully offline
- ✅ **Privacy-first** — no data leaves your machine

---

## ✨ Features

### 🗺️ A* Pathfinding Visualizer
- **8×8 interactive grid** with start, goal, and obstacle nodes
- Step-by-step execution showing open set, closed set, and optimal path
- Real-time **f(n) = g(n) + h(n)** cost visualization
- AI explains *why* each node is chosen using heuristic reasoning

### 🌳 Alpha-Beta Pruning Visualizer
- **Game tree visualization** with Max/Min nodes across 3+ depth levels
- Live **alpha (α) and beta (β)** value tracking
- Pruned branches grayed out with visual ✕ indicators
- AI explains *when and why* pruning occurs

### 💬 AI Chat (Ask Anything)
- Free-form Q&A about any algorithm, data structure, or CS concept
- Context-aware responses adapted to student difficulty level (Beginner → Advanced)
- Suggested prompt chips for quick exploration
- Connection status indicator for backend health

### 🎛️ Smart Step Control
- **Manual mode**: Step through one node at a time
- **Auto-play mode**: Continuous playback with pause capability
- **Reset**: Regenerate the grid/tree and start fresh
- Algorithms condensed to **10–12 meaningful macro-steps** (no 100+ micro-step overload)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                  Mobile App                      │
│           React Native (Expo + TS)               │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │   Home   │  │  Learn   │  │   Chat   │      │
│  │Dashboard │  │Visualizer│  │  AI Q&A  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│       │              │              │            │
│  ┌─────────────────────────────────────┐        │
│  │     Hooks: useAStar, useAlphaBeta   │        │
│  │     Context: AppContext (state)     │        │
│  └──────────────┬──────────────────────┘        │
└─────────────────┼───────────────────────────────┘
                  │ HTTP (axios)
                  ▼
┌─────────────────────────────────────────────────┐
│              Backend (Express.js)                │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ /explain │  │  /doubt  │  │ /status  │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       └──────────────┴─────────────┘             │
│                      │                           │
│           ┌──────────▼──────────┐               │
│           │   Prompt Service    │               │
│           │  (Elite Professor)  │               │
│           └──────────┬──────────┘               │
└──────────────────────┼──────────────────────────┘
                       │ localhost:11434
                       ▼
              ┌─────────────────┐
              │     Ollama      │
              │   OLMo 2 (7B)  │
              └─────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Mobile** | React Native (Expo) | Cross-platform UI |
| **Language** | TypeScript | Type safety |
| **Animations** | react-native-reanimated | 60fps smooth animations, spring physics |
| **Navigation** | React Navigation v6 | Bottom tabs + stack navigation |
| **Backend** | Node.js + Express | REST API server |
| **AI Model** | OLMo 2 (7B) via Ollama | Local LLM for explanations |
| **HTTP** | Axios | API communication |
| **Design** | Google Stitch | UI/UX design system |

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 18.x | [nodejs.org](https://nodejs.org/) |
| Ollama | Latest | [ollama.com](https://ollama.com/) |
| Expo CLI | Latest | `npm install -g expo-cli` |
| Git | Latest | [git-scm.com](https://git-scm.com/) |

### 1. Clone the Repository

```bash
git clone https://github.com/Utkarsh151-glitch/AI--Tutor.git
cd AI--Tutor
```

### 2. Setup Ollama

```bash
# Install OLMo 2 (7B) model (~4.5 GB download)
ollama pull olmo2

# Start the Ollama server
ollama serve
```

### 3. Setup Backend

```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env if needed (defaults work out of the box)

# Start the development server
npm run dev
```

The backend will be available at `http://0.0.0.0:4000`.

### 4. Setup Mobile App

```bash
cd mobile
npm install

# Update API URL with your local IP
# Edit: src/services/api.ts → API_BASE_URL
# Replace with: http://<YOUR_LOCAL_IP>:4000

# Start Expo
npx expo start
```

> **Finding your IP**: Run `ipconfig` (Windows) or `ifconfig` (Mac/Linux) and use your LAN IP (e.g., `192.168.x.x`).

### 5. Run on Device

- **iOS**: Scan QR code with Camera app
- **Android**: Scan QR code with Expo Go app
- **Emulator**: Press `a` (Android) or `i` (iOS) in the Expo terminal

---

## 📁 Project Structure

```
AI--Tutor/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── env.js                 # Environment configuration
│   │   ├── controllers/
│   │   │   └── aiController.js        # API route handlers
│   │   ├── middleware/
│   │   │   └── errorHandler.js        # Global error middleware
│   │   ├── routes/
│   │   │   └── aiRoutes.js            # Express route definitions
│   │   ├── services/
│   │   │   ├── ollamaService.js       # Ollama API integration
│   │   │   └── promptService.js       # AI prompt engineering
│   │   ├── utils/
│   │   │   └── httpError.js           # Custom error class
│   │   ├── app.js                     # Express app setup
│   │   └── server.js                  # Server entry point
│   ├── .env.example
│   └── package.json
│
├── mobile/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AStarGrid.tsx          # A* grid visualizer
│   │   │   ├── AlphaBetaTree.tsx      # Alpha-Beta tree visualizer
│   │   │   ├── ChatComposer.tsx       # Floating glass chat input
│   │   │   ├── ControlPanel.tsx       # Step/auto/reset controls
│   │   │   ├── ExplanationBox.tsx     # AI explanation panel
│   │   │   ├── GlassCard.tsx          # Neomorphic card component
│   │   │   ├── GradientScreen.tsx     # Background with blur orbs
│   │   │   ├── Legend.tsx             # Grid/tree legend pills
│   │   │   ├── MessageBubble.tsx      # Chat message bubble
│   │   │   ├── PrimaryButton.tsx      # CTA button with shadow
│   │   │   ├── ProgressBar.tsx        # Animated progress bar
│   │   │   ├── SectionHeader.tsx      # Section title component
│   │   │   └── ThinkingOverlay.tsx    # AI loading state
│   │   ├── context/
│   │   │   └── AppContext.tsx         # Global state (difficulty)
│   │   ├── hooks/
│   │   │   ├── useAStar.ts           # A* algorithm hook
│   │   │   └── useAlphaBeta.ts       # Alpha-Beta algorithm hook
│   │   ├── navigation/
│   │   │   └── AppNavigator.tsx       # Tab + stack navigation
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx         # Dashboard with bento stats
│   │   │   ├── AStarScreen.tsx        # A* Pathfinding screen
│   │   │   ├── AlphaBetaScreen.tsx    # Alpha-Beta Pruning screen
│   │   │   ├── ChatScreen.tsx         # AI Chat screen
│   │   │   └── VisualizerScreen.tsx   # Algorithm picker screen
│   │   ├── services/
│   │   │   └── api.ts                 # Backend API client
│   │   ├── theme/
│   │   │   └── colors.ts             # Design tokens
│   │   └── utils/
│   │       ├── astar.ts              # A* algorithm engine
│   │       └── alphaBeta.ts          # Alpha-Beta algorithm engine
│   ├── App.tsx                        # App entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 📡 API Reference

### `POST /api/explain`

Generates an AI teaching explanation for an algorithm step.

**Request Body:**
```json
{
  "algorithm": "A* Pathfinding",
  "step": { "type": "choose", "node": { "row": 2, "col": 3 }, "g": 5, "h": 4, "f": 9 },
  "level": "Beginner",
  "previousStep": { ... }
}
```

**Response:**
```json
{
  "explanation": "This node is chosen because it has the lowest f-score...",
  "model": "olmo2"
}
```

### `POST /api/doubt`

Answers a free-form student question about algorithms.

**Request Body:**
```json
{
  "question": "Why is QuickSort faster than BubbleSort?"
}
```

### `GET /api/ollama-status`

Health check for the AI backend.

**Response:**
```json
{
  "reachable": true,
  "modelConfigured": "olmo2",
  "modelAvailable": true,
  "availableModels": ["olmo2:latest"]
}
```

---

## 🎨 Design System

The UI follows a **Light Tactile** design language inspired by neomorphism and modern Material Design 3:

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#FFFCF7` | Warm white canvas |
| Surface | `#FFFFFF` | Card backgrounds |
| Primary | `#5D4BE1` | CTAs, active states, links |
| Secondary | `#355CCC` | Alpha-Beta accents |
| Tertiary | `#007070` | Success, start indicators |
| Text Primary | `#373831` | Headlines, body text |
| Shadows | `rgba(55,56,49,0.08)` | Soft neomorphic depth |
| Borders | `rgba(186,186,175,0.15)` | Subtle card outlines |

**Key design principles:**
- Floating pill navigation bar with glass blur
- Neomorphic cards with soft directional shadows
- No hard borders — tonal depth and shadow separation only
- Animated spring interactions on all pressable elements

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Utkarsh](https://github.com/Utkarsh151-glitch)**

</div>
