import { useState, createContext, useContext, ReactNode, useCallback } from 'react';

// Admin context for managing daily tasks
export interface AdminTask {
  id: string;
  problemLink: string;
  problemName: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  platform: 'codeforces' | 'codechef' | 'leetcode' | 'atcoder';
  dateAdded: string;
  notes?: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  dailyTasks: AdminTask[];
  login: (password: string) => boolean;
  logout: () => void;
  addTask: (task: Omit<AdminTask, 'id' | 'dateAdded'>) => void;
  updateTask: (id: string, task: Partial<AdminTask>) => void;
  deleteTask: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock password for demo purposes
const ADMIN_PASSWORD = 'admin123';

// Initial mock daily tasks
const initialTasks: AdminTask[] = [
  {
    id: '1',
    problemLink: 'https://leetcode.com/problems/two-sum/',
    problemName: 'Two Sum',
    topic: 'Arrays',
    difficulty: 'easy',
    platform: 'leetcode',
    dateAdded: new Date().toISOString(),
    notes: 'Great starter problem for hash map practice',
  },
  {
    id: '2',
    problemLink: 'https://codeforces.com/problemset/problem/4/A',
    problemName: 'Watermelon',
    topic: 'Math',
    difficulty: 'easy',
    platform: 'codeforces',
    dateAdded: new Date().toISOString(),
    notes: 'Classic beginner problem',
  },
  {
    id: '3',
    problemLink: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    problemName: 'Longest Substring Without Repeating Characters',
    topic: 'Sliding Window',
    difficulty: 'medium',
    platform: 'leetcode',
    dateAdded: new Date().toISOString(),
  },
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('cp-admin-auth') === 'true';
  });

  const [dailyTasks, setDailyTasks] = useState<AdminTask[]>(() => {
    const stored = localStorage.getItem('cp-admin-tasks');
    return stored ? JSON.parse(stored) : initialTasks;
  });

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('cp-admin-auth', 'true');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem('cp-admin-auth');
  }, []);

  const saveTasks = (tasks: AdminTask[]) => {
    localStorage.setItem('cp-admin-tasks', JSON.stringify(tasks));
    setDailyTasks(tasks);
  };

  const addTask = useCallback((task: Omit<AdminTask, 'id' | 'dateAdded'>) => {
    const newTask: AdminTask = {
      ...task,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
    };
    const updated = [...dailyTasks, newTask];
    saveTasks(updated);
  }, [dailyTasks]);

  const updateTask = useCallback((id: string, updates: Partial<AdminTask>) => {
    const updated = dailyTasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    );
    saveTasks(updated);
  }, [dailyTasks]);

  const deleteTask = useCallback((id: string) => {
    const updated = dailyTasks.filter((task) => task.id !== id);
    saveTasks(updated);
  }, [dailyTasks]);

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        dailyTasks,
        login,
        logout,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
