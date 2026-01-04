import { useState, useEffect, useCallback } from 'react';

interface Progress {
  solvedProblems: Set<string>;
  attemptedProblems: Set<string>;
  streak: number;
  lastSolveDate: string | null;
  dailySolves: Record<string, number>;
}

const STORAGE_KEY = 'cp-tracker-progress';

const getInitialProgress = (): Progress => {
  if (typeof window === 'undefined') {
    return {
      solvedProblems: new Set(),
      attemptedProblems: new Set(),
      streak: 0,
      lastSolveDate: null,
      dailySolves: {},
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        solvedProblems: new Set(parsed.solvedProblems || []),
        attemptedProblems: new Set(parsed.attemptedProblems || []),
      };
    }
  } catch (e) {
    console.error('Failed to parse progress from localStorage:', e);
  }

  return {
    solvedProblems: new Set(),
    attemptedProblems: new Set(),
    streak: 0,
    lastSolveDate: null,
    dailySolves: {},
  };
};

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>(getInitialProgress);

  // Persist to localStorage whenever progress changes
  useEffect(() => {
    const toStore = {
      ...progress,
      solvedProblems: Array.from(progress.solvedProblems),
      attemptedProblems: Array.from(progress.attemptedProblems),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }, [progress]);

  const markSolved = useCallback((problemId: string) => {
    setProgress(prev => {
      const newSolved = new Set(prev.solvedProblems);
      const newAttempted = new Set(prev.attemptedProblems);
      
      // Toggle solved status
      if (newSolved.has(problemId)) {
        newSolved.delete(problemId);
      } else {
        newSolved.add(problemId);
        newAttempted.delete(problemId);
      }

      // Update streak
      const today = new Date().toISOString().split('T')[0];
      const newDailySolves = { ...prev.dailySolves };
      newDailySolves[today] = (newDailySolves[today] || 0) + (newSolved.has(problemId) ? 1 : -1);

      let newStreak = prev.streak;
      if (prev.lastSolveDate !== today && newSolved.has(problemId)) {
        // Check if yesterday was solved
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (prev.lastSolveDate === yesterday) {
          newStreak = prev.streak + 1;
        } else if (prev.lastSolveDate !== today) {
          newStreak = 1;
        }
      }

      return {
        ...prev,
        solvedProblems: newSolved,
        attemptedProblems: newAttempted,
        streak: newStreak,
        lastSolveDate: today,
        dailySolves: newDailySolves,
      };
    });
  }, []);

  const markAttempted = useCallback((problemId: string) => {
    setProgress(prev => {
      const newAttempted = new Set(prev.attemptedProblems);
      
      if (!prev.solvedProblems.has(problemId)) {
        if (newAttempted.has(problemId)) {
          newAttempted.delete(problemId);
        } else {
          newAttempted.add(problemId);
        }
      }

      return {
        ...prev,
        attemptedProblems: newAttempted,
      };
    });
  }, []);

  const isSolved = useCallback((problemId: string) => {
    return progress.solvedProblems.has(problemId);
  }, [progress.solvedProblems]);

  const isAttempted = useCallback((problemId: string) => {
    return progress.attemptedProblems.has(problemId);
  }, [progress.attemptedProblems]);

  const getStats = useCallback(() => {
    return {
      totalSolved: progress.solvedProblems.size,
      totalAttempted: progress.attemptedProblems.size,
      streak: progress.streak,
      dailySolves: progress.dailySolves,
    };
  }, [progress]);

  const resetProgress = useCallback(() => {
    setProgress({
      solvedProblems: new Set(),
      attemptedProblems: new Set(),
      streak: 0,
      lastSolveDate: null,
      dailySolves: {},
    });
  }, []);

  return {
    progress,
    markSolved,
    markAttempted,
    isSolved,
    isAttempted,
    getStats,
    resetProgress,
  };
};
