import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Check, User, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCodeforcesAPI } from '@/hooks/useCodeforcesAPI';

interface CodeforcesConnectProps {
  onSync?: (solvedProblems: Set<string>) => void;
}

const CodeforcesConnect = ({ onSync }: CodeforcesConnectProps) => {
  const [handle, setHandle] = useState(() => {
    return localStorage.getItem('cf-handle') || '';
  });
  const [isEditing, setIsEditing] = useState(!handle);
  const { loading, error, userInfo, stats, fetchUserData } = useCodeforcesAPI();

  useEffect(() => {
    if (handle && !userInfo) {
      fetchUserData(handle);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (handle.trim()) {
      localStorage.setItem('cf-handle', handle.trim());
      await fetchUserData(handle.trim());
      setIsEditing(false);
      if (stats?.uniqueProblems && onSync) {
        onSync(stats.uniqueProblems);
      }
    }
  };

  const handleRefresh = async () => {
    if (handle) {
      await fetchUserData(handle);
      if (stats?.uniqueProblems && onSync) {
        onSync(stats.uniqueProblems);
      }
    }
  };

  if (isEditing || !handle) {
    return (
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className="flex items-center gap-2"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50">
          <img 
            src="https://codeforces.org/s/0/favicon-96x96.png" 
            alt="CF" 
            className="w-4 h-4"
          />
          <Input
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="CF Handle"
            className="h-7 w-28 bg-transparent border-0 p-0 text-sm focus-visible:ring-0"
          />
        </div>
        <Button 
          type="submit" 
          size="sm" 
          disabled={loading || !handle.trim()}
          className="h-9"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
        </Button>
      </motion.form>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2"
    >
      <div 
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50 cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => setIsEditing(true)}
      >
        <img 
          src="https://codeforces.org/s/0/favicon-96x96.png" 
          alt="CF" 
          className="w-4 h-4"
        />
        <span className="text-sm font-medium">{handle}</span>
        <Check className="w-3 h-3 text-emerald-500" />
      </div>
      
      <Button 
        variant="default" 
        size="sm"
        onClick={handleRefresh}
        disabled={loading}
        className="gap-2"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        Refresh
      </Button>

      {userInfo && (
        <a
          href={`https://codeforces.com/profile/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </motion.div>
  );
};

export default CodeforcesConnect;
