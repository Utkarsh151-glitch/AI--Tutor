/**
 * useAStar Hook
 * Manages A* pathfinding state, step progression, and explanation history.
 * Supports Manual (Next Step), Auto-play, and Pause modes.
 */
import React from 'react';
import { explainStep, getOllamaStatus } from '../services/api';
import {
  AStarStep,
  GridState,
  describeAStarStep,
  generateAStarSteps,
  generateDefaultGrid,
} from '../utils/astar';

export type ExplanationEntry = {
  step: number;
  label: string;
  explanation: string;
};

type PlayMode = 'manual' | 'auto' | 'paused';

const AUTO_STEP_DELAY_MS = 2000;

export const useAStar = (level: string) => {
  const [grid, setGrid] = React.useState<GridState>(() => generateDefaultGrid());
  const [steps, setSteps] = React.useState<AStarStep[]>(() => generateAStarSteps(generateDefaultGrid()));
  const [currentStepIndex, setCurrentStepIndex] = React.useState(-1);
  const [currentStep, setCurrentStep] = React.useState<AStarStep | null>(null);
  const [explanations, setExplanations] = React.useState<ExplanationEntry[]>([]);
  const [loadingExplanation, setLoadingExplanation] = React.useState(false);
  const [playMode, setPlayMode] = React.useState<PlayMode>('manual');
  const [statusText, setStatusText] = React.useState('Ready – tap Next Step to begin');
  const [ollamaStatus, setOllamaStatus] = React.useState<{
    reachable: boolean;
    modelConfigured: string;
    modelAvailable: boolean;
    availableModels: string[];
    error?: string;
  } | null>(null);

  const runIdRef = React.useRef(0);
  const explainAbortRef = React.useRef<AbortController | null>(null);
  const autoTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelExplanation = React.useCallback(() => {
    if (explainAbortRef.current) {
      explainAbortRef.current.abort();
      explainAbortRef.current = null;
    }
  }, []);

  const stopAutoTimer = React.useCallback(() => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  // Fetch AI explanation for a step
  const fetchExplanation = React.useCallback(
    async (step: AStarStep, stepIndex: number, runId: number, prevStep?: AStarStep) => {
      cancelExplanation();
      const controller = new AbortController();
      explainAbortRef.current = controller;
      setLoadingExplanation(true);

      try {
        const response = await explainStep(
          {
            algorithm: 'A* Pathfinding',
            level,
            step: {
              type: step.type,
              node: step.node,
              g: step.g,
              h: step.h,
              f: step.f,
              openSetSize: step.openSet.length,
              closedSetSize: step.closedSet.length,
              pathLength: step.path.length,
              description: step.description,
            },
            previousStep: prevStep
              ? {
                  type: prevStep.type,
                  node: prevStep.node,
                  description: prevStep.description,
                }
              : undefined,
          },
          controller.signal,
        );

        if (runIdRef.current !== runId) return;

        setExplanations((prev) => [
          ...prev,
          { step: stepIndex + 1, label: step.type, explanation: response.explanation },
        ]);
      } catch (error) {
        if (controller.signal.aborted || runIdRef.current !== runId) return;
        setExplanations((prev) => [
          ...prev,
          { step: stepIndex + 1, label: step.type, explanation: describeAStarStep(step) },
        ]);
      } finally {
        if (runIdRef.current === runId) {
          setLoadingExplanation(false);
        }
        if (explainAbortRef.current === controller) {
          explainAbortRef.current = null;
        }
      }
    },
    [cancelExplanation, level],
  );

  // Advance to next step
  const advanceStep = React.useCallback(async () => {
    if (loadingExplanation) return;
    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= steps.length) {
      setPlayMode('paused');
      setStatusText('Algorithm complete');
      return;
    }

    const step = steps[nextIndex];
    const prevStep = nextIndex > 0 ? steps[nextIndex - 1] : undefined;
    const runId = runIdRef.current;

    setCurrentStepIndex(nextIndex);
    setCurrentStep(step);
    setStatusText(`Step ${nextIndex + 1} of ${steps.length}`);

    await fetchExplanation(step, nextIndex, runId, prevStep);
  }, [currentStepIndex, fetchExplanation, loadingExplanation, steps]);

  // Auto-play effect
  React.useEffect(() => {
    if (playMode !== 'auto' || loadingExplanation) return;

    if (currentStepIndex >= steps.length - 1) {
      setPlayMode('paused');
      setStatusText('Algorithm complete');
      return;
    }

    autoTimerRef.current = setTimeout(() => {
      advanceStep();
    }, AUTO_STEP_DELAY_MS);

    return () => stopAutoTimer();
  }, [playMode, loadingExplanation, currentStepIndex, steps.length, advanceStep, stopAutoTimer]);

  // Reset
  const reset = React.useCallback(() => {
    stopAutoTimer();
    cancelExplanation();
    runIdRef.current += 1;

    const newGrid = generateDefaultGrid();
    setGrid(newGrid);
    setSteps(generateAStarSteps(newGrid));
    setCurrentStepIndex(-1);
    setCurrentStep(null);
    setExplanations([]);
    setLoadingExplanation(false);
    setPlayMode('manual');
    setStatusText('Ready – tap Next Step to begin');
  }, [cancelExplanation, stopAutoTimer]);

  // Ollama status check
  React.useEffect(() => {
    let active = true;
    const loadStatus = async () => {
      try {
        const status = await getOllamaStatus();
        if (active) setOllamaStatus(status);
      } catch {
        if (active) {
          setOllamaStatus({
            reachable: false,
            modelConfigured: 'llama3',
            modelAvailable: false,
            availableModels: [],
            error: 'Backend or Ollama is not reachable',
          });
        }
      }
    };
    void loadStatus();
    return () => { active = false; };
  }, []);

  // Cleanup on unmount
  React.useEffect(() => () => {
    stopAutoTimer();
    cancelExplanation();
  }, [cancelExplanation, stopAutoTimer]);

  return {
    grid,
    steps,
    currentStepIndex,
    currentStep,
    explanations,
    loadingExplanation,
    playMode,
    statusText,
    ollamaStatus,
    nextStep: advanceStep,
    startAutoPlay: () => {
      runIdRef.current += 1;
      setPlayMode('auto');
      setStatusText('Auto-playing...');
    },
    pause: () => {
      stopAutoTimer();
      cancelExplanation();
      setPlayMode('manual');
      setLoadingExplanation(false);
      setStatusText('Paused');
    },
    reset,
  };
};
