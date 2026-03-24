import React, { createContext, useContext, useMemo, useState } from 'react';

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
type AlgorithmType = 'A* Pathfinding' | 'Alpha-Beta Pruning';

type AppContextValue = {
  difficulty: Difficulty;
  setDifficulty: (level: Difficulty) => void;
  selectedAlgorithm: AlgorithmType;
  setSelectedAlgorithm: (algo: AlgorithmType) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('Beginner');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('A* Pathfinding');

  const value = useMemo(
    () => ({
      difficulty,
      setDifficulty,
      selectedAlgorithm,
      setSelectedAlgorithm,
    }),
    [difficulty, selectedAlgorithm],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
};
