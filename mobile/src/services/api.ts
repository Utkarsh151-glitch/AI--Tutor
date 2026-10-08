/**
 * API Service Layer
 * Handles all communication with the Express backend.
 */
import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const README_SETUP_URL = 'https://github.com/Utkarsh151-glitch/ai-algorithm-tutor#-getting-started';
export const AI_OFFLINE_MESSAGE =
  'AI explanations need the Express backend and Ollama running on your own machine (see the README). The visualizers and built-in step descriptions still work.';

// A hosted web build has no backend to talk to, so only call one when it is configured
// (EXPO_PUBLIC_API_URL), on native, or when the web page itself runs on this machine.
export const AI_BACKEND_AVAILABLE =
  Boolean(process.env.EXPO_PUBLIC_API_URL) ||
  Platform.OS !== 'web' ||
  (typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname));

const requireBackend = () => {
  if (!AI_BACKEND_AVAILABLE) {
    throw new Error(AI_OFFLINE_MESSAGE);
  }
};

const inferBaseUrl = () => {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl;
  }

  const constants = Constants as typeof Constants & {
    manifest2?: { extra?: { expoGo?: { debuggerHost?: string } } };
    manifest?: { debuggerHost?: string };
    expoConfig?: { hostUri?: string };
  };

  const debuggerHost =
    constants.expoConfig?.hostUri ||
    constants.manifest2?.extra?.expoGo?.debuggerHost ||
    constants.manifest?.debuggerHost;

  if (debuggerHost) {
    const host = debuggerHost.split(':')[0];
    return `http://${host}:4000/api`;
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:4000/api';
  }

  return 'http://127.0.0.1:4000/api';
};

export const getApiBaseUrl = () => inferBaseUrl();

export const api = axios.create({
  baseURL: inferBaseUrl(),
  timeout: 50000,
});

export type ExplainPayload = {
  algorithm: string;
  level: string;
  step: Record<string, unknown>;
  previousStep?: Record<string, unknown>;
};

export const explainStep = async (payload: ExplainPayload, signal?: AbortSignal) => {
  requireBackend();
  const response = await api.post('/explain', payload, { signal });
  return response.data;
};

export const askDoubt = async (question: string, signal?: AbortSignal) => {
  requireBackend();
  const response = await api.post('/doubt', { question }, { signal });
  return response.data;
};

export const getOllamaStatus = async () => {
  requireBackend();
  const response = await api.get('/ollama-status');
  return response.data;
};
