// Mock contest data for the Contest Tracker
export interface Contest {
  id: string;
  name: string;
  platform: 'codeforces' | 'codechef' | 'leetcode' | 'atcoder';
  startTime: Date;
  duration: number; // in minutes
  url: string;
  status: 'upcoming' | 'live' | 'finished';
}

// Generate mock contests based on current date
const generateContests = (): Contest[] => {
  const now = new Date();
  
  return [
    {
      id: '1',
      name: 'Codeforces Round #923 (Div. 2)',
      platform: 'codeforces',
      startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      duration: 120,
      url: 'https://codeforces.com/contests',
      status: 'upcoming',
    },
    {
      id: '2',
      name: 'LeetCode Weekly Contest 381',
      platform: 'leetcode',
      startTime: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      duration: 90,
      url: 'https://leetcode.com/contest/',
      status: 'upcoming',
    },
    {
      id: '3',
      name: 'CodeChef Starters 171',
      platform: 'codechef',
      startTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      duration: 180,
      url: 'https://www.codechef.com/contests',
      status: 'upcoming',
    },
    {
      id: '4',
      name: 'AtCoder Beginner Contest 342',
      platform: 'atcoder',
      startTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      duration: 100,
      url: 'https://atcoder.jp/contests',
      status: 'upcoming',
    },
    {
      id: '5',
      name: 'Codeforces Educational Round 160',
      platform: 'codeforces',
      startTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      duration: 120,
      url: 'https://codeforces.com/contests',
      status: 'upcoming',
    },
    {
      id: '6',
      name: 'LeetCode Biweekly Contest 122',
      platform: 'leetcode',
      startTime: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      duration: 90,
      url: 'https://leetcode.com/contest/',
      status: 'upcoming',
    },
    {
      id: '7',
      name: 'CodeChef Long Challenge January 2026',
      platform: 'codechef',
      startTime: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
      duration: 10080, // 7 days
      url: 'https://www.codechef.com/contests',
      status: 'upcoming',
    },
    {
      id: '8',
      name: 'Codeforces Div. 1 Round #924',
      platform: 'codeforces',
      startTime: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      duration: 150,
      url: 'https://codeforces.com/contests',
      status: 'upcoming',
    },
  ];
};

export const contests: Contest[] = generateContests();

// Platform metadata
export const platformInfo = {
  codeforces: {
    name: 'Codeforces',
    color: 'platform-codeforces',
    icon: '🔵',
    website: 'https://codeforces.com',
  },
  codechef: {
    name: 'CodeChef',
    color: 'platform-codechef',
    icon: '🟠',
    website: 'https://codechef.com',
  },
  leetcode: {
    name: 'LeetCode',
    color: 'platform-leetcode',
    icon: '🟡',
    website: 'https://leetcode.com',
  },
  atcoder: {
    name: 'AtCoder',
    color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    icon: '🔷',
    website: 'https://atcoder.jp',
  },
};

// Format duration
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days}d`;
  }
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// Get time until contest
export const getTimeUntil = (date: Date): { days: number; hours: number; minutes: number; seconds: number } => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
};
