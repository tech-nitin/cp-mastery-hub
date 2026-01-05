import { useState, useEffect, useCallback } from 'react';

interface Progress {
  solvedProblems: Set<string>;
  attemptedProblems: Set<string>;
  bookmarkedProblems: Set<string>;
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
      bookmarkedProblems: new Set(),
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
        bookmarkedProblems: new Set(parsed.bookmarkedProblems || []),
      };
    }
  } catch (e) {
    console.error('Failed to parse progress from localStorage:', e);
  }

  return {
    solvedProblems: new Set(),
    attemptedProblems: new Set(),
    bookmarkedProblems: new Set(),
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
      bookmarkedProblems: Array.from(progress.bookmarkedProblems),
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

  const toggleBookmark = useCallback((problemId: string) => {
    setProgress(prev => {
      const newBookmarked = new Set(prev.bookmarkedProblems);
      
      if (newBookmarked.has(problemId)) {
        newBookmarked.delete(problemId);
      } else {
        newBookmarked.add(problemId);
      }

      return {
        ...prev,
        bookmarkedProblems: newBookmarked,
      };
    });
  }, []);

  const isSolved = useCallback((problemId: string) => {
    return progress.solvedProblems.has(problemId);
  }, [progress.solvedProblems]);

  const isAttempted = useCallback((problemId: string) => {
    return progress.attemptedProblems.has(problemId);
  }, [progress.attemptedProblems]);

  const isBookmarked = useCallback((problemId: string) => {
    return progress.bookmarkedProblems.has(problemId);
  }, [progress.bookmarkedProblems]);

  const getStats = useCallback(() => {
    // Calculate current streak properly
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      if ((progress.dailySolves[dateStr] || 0) > 0) {
        tempStreak++;
        if (i === 0 || currentStreak > 0) {
          currentStreak = tempStreak;
        }
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        if (i === 0) {
          // Today has no solves, check if yesterday had solves for current streak
          tempStreak = 0;
        } else {
          tempStreak = 0;
        }
      }
    }

    return {
      totalSolved: progress.solvedProblems.size,
      totalAttempted: progress.attemptedProblems.size,
      totalBookmarked: progress.bookmarkedProblems.size,
      streak: currentStreak,
      longestStreak,
      dailySolves: progress.dailySolves,
    };
  }, [progress]);

  const resetProgress = useCallback(() => {
    setProgress({
      solvedProblems: new Set(),
      attemptedProblems: new Set(),
      bookmarkedProblems: new Set(),
      streak: 0,
      lastSolveDate: null,
      dailySolves: {},
    });
  }, []);

  return {
    progress,
    markSolved,
    markAttempted,
    toggleBookmark,
    isSolved,
    isAttempted,
    isBookmarked,
    getStats,
    resetProgress,
  };
};
