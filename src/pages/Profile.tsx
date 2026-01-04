import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Trophy, Flame, Target, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCodeforcesAPI } from '@/hooks/useCodeforcesAPI';

const Profile = () => {
  const [handle, setHandle] = useState('');
  const { loading, error, userInfo, stats, fetchUserData } = useCodeforcesAPI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserData(handle);
  };

  const getRankColor = (rank: string) => {
    const colors: Record<string, string> = {
      newbie: 'text-gray-400',
      pupil: 'text-green-400',
      specialist: 'text-cyan-400',
      expert: 'text-blue-400',
      'candidate master': 'text-violet-400',
      master: 'text-orange-400',
      'international master': 'text-orange-500',
      grandmaster: 'text-red-400',
      'international grandmaster': 'text-red-500',
      'legendary grandmaster': 'text-red-600',
    };
    return colors[rank?.toLowerCase()] || 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Your <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-muted-foreground">Connect your Codeforces account to see your stats</p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-card p-6 mb-8"
        >
          <label className="text-sm font-medium mb-2 block">Codeforces Handle</label>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Enter your Codeforces handle..."
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            <Button type="submit" disabled={loading} className="gradient-primary text-primary-foreground">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetch Stats'}
            </Button>
          </div>
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center gap-2 text-destructive">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </motion.form>

        {/* User Info */}
        {userInfo && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-6">
                <img src={userInfo.avatar} alt={userInfo.handle} className="w-20 h-20 rounded-2xl" />
                <div>
                  <h2 className="text-2xl font-bold">{userInfo.handle}</h2>
                  <p className={`font-semibold capitalize ${getRankColor(userInfo.rank)}`}>{userInfo.rank}</p>
                  <p className="text-sm text-muted-foreground">Rating: {userInfo.rating} (Max: {userInfo.maxRating})</p>
                </div>
              </div>
            </div>

            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Target, label: 'Problems Solved', value: stats.solvedProblems, color: 'text-primary' },
                  { icon: Trophy, label: 'Total Submissions', value: stats.totalSubmissions, color: 'text-secondary' },
                  { icon: Flame, label: 'Easy', value: stats.solvedByDifficulty.easy, color: 'text-status-solved' },
                  { icon: User, label: 'Hard', value: stats.solvedByDifficulty.hard, color: 'text-destructive' },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-4 text-center">
                    <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {!userInfo && !loading && (
          <div className="text-center py-16 text-muted-foreground">
            <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Enter your Codeforces handle to view your statistics</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
