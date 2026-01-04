import { useState, useCallback } from 'react';

export interface CodeforcesSubmission {
  id: number;
  contestId: number;
  problem: {
    contestId: number;
    index: string;
    name: string;
    rating?: number;
    tags: string[];
  };
  verdict: string;
  programmingLanguage: string;
  creationTimeSeconds: number;
}

export interface CodeforcesUserInfo {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  avatar: string;
  contribution: number;
  friendOfCount: number;
  registrationTimeSeconds: number;
}

export interface CodeforcesStats {
  totalSubmissions: number;
  solvedProblems: number;
  uniqueProblems: Set<string>;
  ratingDistribution: Record<string, number>;
  topicDistribution: Record<string, number>;
  verdictDistribution: Record<string, number>;
  languageDistribution: Record<string, number>;
  solvedByDifficulty: { easy: number; medium: number; hard: number };
}

export const useCodeforcesAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<CodeforcesUserInfo | null>(null);
  const [stats, setStats] = useState<CodeforcesStats | null>(null);
  const [submissions, setSubmissions] = useState<CodeforcesSubmission[]>([]);

  const fetchUserData = useCallback(async (handle: string) => {
    if (!handle.trim()) {
      setError('Please enter a valid Codeforces handle');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch user info
      const userResponse = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      const userData = await userResponse.json();

      if (userData.status !== 'OK') {
        throw new Error(userData.comment || 'Failed to fetch user info');
      }

      const user = userData.result[0];
      setUserInfo({
        handle: user.handle,
        rating: user.rating || 0,
        maxRating: user.maxRating || 0,
        rank: user.rank || 'unrated',
        maxRank: user.maxRank || 'unrated',
        avatar: user.titlePhoto || user.avatar,
        contribution: user.contribution || 0,
        friendOfCount: user.friendOfCount || 0,
        registrationTimeSeconds: user.registrationTimeSeconds,
      });

      // Fetch submissions
      const submissionsResponse = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`);
      const submissionsData = await submissionsResponse.json();

      if (submissionsData.status !== 'OK') {
        throw new Error(submissionsData.comment || 'Failed to fetch submissions');
      }

      const subs: CodeforcesSubmission[] = submissionsData.result;
      setSubmissions(subs);

      // Calculate statistics
      const uniqueProblems = new Set<string>();
      const ratingDistribution: Record<string, number> = {};
      const topicDistribution: Record<string, number> = {};
      const verdictDistribution: Record<string, number> = {};
      const languageDistribution: Record<string, number> = {};
      let easy = 0, medium = 0, hard = 0;

      subs.forEach((sub) => {
        // Count verdicts
        verdictDistribution[sub.verdict] = (verdictDistribution[sub.verdict] || 0) + 1;

        // Count languages
        const lang = sub.programmingLanguage.split(' ')[0]; // Simplify language name
        languageDistribution[lang] = (languageDistribution[lang] || 0) + 1;

        // Only count accepted submissions for solved problems
        if (sub.verdict === 'OK') {
          const problemKey = `${sub.problem.contestId}-${sub.problem.index}`;
          
          if (!uniqueProblems.has(problemKey)) {
            uniqueProblems.add(problemKey);
            
            // Rating distribution
            if (sub.problem.rating) {
              const ratingBucket = `${Math.floor(sub.problem.rating / 100) * 100}`;
              ratingDistribution[ratingBucket] = (ratingDistribution[ratingBucket] || 0) + 1;
              
              // Difficulty classification
              if (sub.problem.rating <= 1200) easy++;
              else if (sub.problem.rating <= 1800) medium++;
              else hard++;
            }

            // Topic distribution
            sub.problem.tags.forEach((tag) => {
              topicDistribution[tag] = (topicDistribution[tag] || 0) + 1;
            });
          }
        }
      });

      setStats({
        totalSubmissions: subs.length,
        solvedProblems: uniqueProblems.size,
        uniqueProblems,
        ratingDistribution,
        topicDistribution,
        verdictDistribution,
        languageDistribution,
        solvedByDifficulty: { easy, medium, hard },
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUserInfo(null);
      setStats(null);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearData = useCallback(() => {
    setUserInfo(null);
    setStats(null);
    setSubmissions([]);
    setError(null);
  }, []);

  return {
    loading,
    error,
    userInfo,
    stats,
    submissions,
    fetchUserData,
    clearData,
  };
};
