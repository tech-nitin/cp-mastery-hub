import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, CheckCircle2, Circle, ExternalLink, ChevronDown, ChevronUp, Code2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cp31Sheet, getAllTopics, getProblemStats, type DayPlan } from '@/data/problems';
import { useProgress } from '@/hooks/useProgress';

const Sheet = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const [showFilters, setShowFilters] = useState(false);

  const { markSolved, isSolved, getStats } = useProgress();
  const topics = getAllTopics();
  const problemStats = getProblemStats();
  const userStats = getStats();

  // Filter days based on search and filters
  const filteredDays = useMemo(() => {
    return cp31Sheet.filter((day) => {
      const matchesSearch = searchQuery === '' ||
        day.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        day.problems.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTopic = !selectedTopic || day.topic === selectedTopic;

      const matchesDifficulty = !selectedDifficulty ||
        day.problems.some(p => p.difficulty === selectedDifficulty);

      return matchesSearch && matchesTopic && matchesDifficulty;
    });
  }, [searchQuery, selectedTopic, selectedDifficulty]);

  const toggleDay = (day: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(day)) {
      newExpanded.delete(day);
    } else {
      newExpanded.add(day);
    }
    setExpandedDays(newExpanded);
  };

  const getDayProgress = (day: DayPlan) => {
    const solved = day.problems.filter(p => isSolved(p.id)).length;
    return { solved, total: day.problems.length };
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'badge-easy';
      case 'medium':
        return 'badge-medium';
      case 'hard':
        return 'badge-hard';
      default:
        return '';
    }
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'codeforces':
        return 'platform-codeforces';
      case 'codechef':
        return 'platform-codechef';
      case 'leetcode':
        return 'platform-leetcode';
      default:
        return '';
    }
  };

  const completionPercentage = Math.round((userStats.totalSolved / problemStats.total) * 100);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            CP-31 <span className="gradient-text">Sheet</span>
          </h1>
          <p className="text-muted-foreground">
            A structured 31-day practice plan to master competitive programming
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search & Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-4 mb-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search topics or problems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50 border-border/50"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {(selectedTopic || selectedDifficulty) && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </Button>
              </div>

              {/* Filter Options */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-border/50"
                >
                  {/* Topic Filter */}
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Topic</label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={selectedTopic === null ? 'default' : 'outline'}
                        onClick={() => setSelectedTopic(null)}
                        className="text-xs"
                      >
                        All
                      </Button>
                      {topics.slice(0, 10).map((topic) => (
                        <Button
                          key={topic}
                          size="sm"
                          variant={selectedTopic === topic ? 'default' : 'outline'}
                          onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                          className="text-xs"
                        >
                          {topic}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Difficulty</label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={selectedDifficulty === null ? 'default' : 'outline'}
                        onClick={() => setSelectedDifficulty(null)}
                        className="text-xs"
                      >
                        All
                      </Button>
                      {['easy', 'medium', 'hard'].map((diff) => (
                        <Button
                          key={diff}
                          size="sm"
                          variant={selectedDifficulty === diff ? 'default' : 'outline'}
                          onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                          className={`text-xs capitalize ${selectedDifficulty === diff ? '' : getDifficultyBadge(diff)} border`}
                        >
                          {diff}
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Day Cards */}
            <div className="space-y-4">
              {filteredDays.map((day, index) => {
                const progress = getDayProgress(day);
                const isExpanded = expandedDays.has(day.day);
                const isComplete = progress.solved === progress.total;

                return (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`glass-card overflow-hidden ${isComplete ? 'border-status-solved/30' : ''}`}
                  >
                    {/* Day Header */}
                    <button
                      onClick={() => toggleDay(day.day)}
                      className="w-full p-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                          isComplete ? 'bg-status-solved/20' : 'bg-muted/50'
                        }`}>
                          {day.icon}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Day {day.day}</span>
                            {isComplete && <CheckCircle2 className="w-4 h-4 text-status-solved" />}
                          </div>
                          <h3 className="font-semibold">{day.topic}</h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <div className="text-sm font-medium">
                            {progress.solved}/{progress.total} solved
                          </div>
                          <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                            <div
                              className="h-full bg-status-solved rounded-full transition-all duration-300"
                              style={{ width: `${(progress.solved / progress.total) * 100}%` }}
                            />
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {/* Problems List */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-border/50"
                      >
                        <p className="px-4 pt-4 text-sm text-muted-foreground">
                          {day.description}
                        </p>
                        <div className="p-4 space-y-2">
                          {day.problems.map((problem) => {
                            const solved = isSolved(problem.id);
                            return (
                              <div
                                key={problem.id}
                                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                                  solved ? 'bg-status-solved/10' : 'bg-muted/20 hover:bg-muted/30'
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <button
                                    onClick={() => markSolved(problem.id)}
                                    className="flex-shrink-0 transition-transform hover:scale-110"
                                  >
                                    {solved ? (
                                      <CheckCircle2 className="w-5 h-5 text-status-solved" />
                                    ) : (
                                      <Circle className="w-5 h-5 text-muted-foreground" />
                                    )}
                                  </button>
                                  <span className={`font-medium truncate ${solved ? 'line-through text-muted-foreground' : ''}`}>
                                    {problem.name}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                  <Badge variant="outline" className={`text-xs border ${getDifficultyBadge(problem.difficulty)}`}>
                                    {problem.difficulty}
                                  </Badge>
                                  <Badge variant="outline" className={`text-xs border ${getPlatformBadge(problem.platform)} hidden sm:inline-flex`}>
                                    {problem.platform}
                                  </Badge>
                                  <a
                                    href={problem.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {filteredDays.length === 0 && (
              <div className="text-center py-12">
                <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Sidebar - Progress Overview */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Progress Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <h3 className="font-semibold mb-4">Your Progress</h3>
                
                {/* Circular Progress */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-muted/50"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="url(#progress-gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${completionPercentage * 3.52} 352`}
                        className="transition-all duration-500"
                      />
                      <defs>
                        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" />
                          <stop offset="100%" stopColor="hsl(var(--accent))" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{completionPercentage}%</div>
                        <div className="text-xs text-muted-foreground">Complete</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-xl bg-muted/20">
                    <div className="text-2xl font-bold text-status-solved">{userStats.totalSolved}</div>
                    <div className="text-xs text-muted-foreground">Solved</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-muted/20">
                    <div className="text-2xl font-bold text-primary">{userStats.streak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </motion.div>

              {/* Problem Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6"
              >
                <h3 className="font-semibold mb-4">Problem Distribution</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Easy', count: problemStats.easy, color: 'bg-status-solved' },
                    { label: 'Medium', count: problemStats.medium, color: 'bg-status-attempted' },
                    { label: 'Hard', count: problemStats.hard, color: 'bg-destructive' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Sheet;
