import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Bookmark, List, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cp31Sheet, getProblemStats, type Problem } from '@/data/problems';
import { useProgress } from '@/hooks/useProgress';
import ActivityHeatmap from '@/components/sheet/ActivityHeatmap';
import ProgressCard from '@/components/sheet/ProgressCard';
import ProblemTable from '@/components/sheet/ProblemTable';
import RatingFilter from '@/components/sheet/RatingFilter';
import VisitCalendar from '@/components/sheet/VisitCalendar';
import CodeforcesConnect from '@/components/sheet/CodeforcesConnect';

const Sheet = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [focusMode, setFocusMode] = useState(false);

  const { progress, markSolved, toggleBookmark, getStats } = useProgress();
  const problemStats = getProblemStats();
  const userStats = getStats();

  // Flatten all problems with day info
  const allProblems = useMemo(() => {
    return cp31Sheet.flatMap(day => 
      day.problems.map(problem => ({
        ...problem,
        dayNumber: day.day,
      }))
    );
  }, []);

  // Filter problems based on search, rating, and tab
  const filteredProblems = useMemo(() => {
    return allProblems.filter((problem) => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        problem.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Rating filter
      const matchesRating = !selectedRating || 
        (problem.rating && problem.rating >= selectedRating && problem.rating < selectedRating + 100);

      // Tab filter
      let matchesTab = true;
      if (activeTab === 'bookmarked') {
        matchesTab = progress.bookmarkedProblems.has(problem.id);
      } else if (activeTab === 'unsolved') {
        matchesTab = !progress.solvedProblems.has(problem.id);
      }

      // Focus mode - show only unsolved
      if (focusMode && progress.solvedProblems.has(problem.id)) {
        return false;
      }

      return matchesSearch && matchesRating && matchesTab;
    });
  }, [searchQuery, selectedRating, activeTab, focusMode, allProblems, progress]);

  // Calculate rating-specific progress
  const ratingProgress = useMemo(() => {
    if (!selectedRating) {
      return { current: userStats.totalSolved, total: problemStats.total };
    }
    const ratingProblems = allProblems.filter(
      p => p.rating && p.rating >= selectedRating && p.rating < selectedRating + 100
    );
    const solvedInRating = ratingProblems.filter(p => progress.solvedProblems.has(p.id)).length;
    return { current: solvedInRating, total: ratingProblems.length };
  }, [selectedRating, allProblems, progress.solvedProblems, userStats.totalSolved, problemStats.total]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            CP-31 <span className="gradient-text">Sheet</span>
          </h1>
          <p className="text-muted-foreground">
            A structured 31-day practice plan inspired by TLE Eliminators
          </p>
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Rating Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-4"
            >
              <RatingFilter 
                selectedRating={selectedRating} 
                onSelectRating={setSelectedRating} 
              />
            </motion.div>

            {/* Progress Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ProgressCard
                title="Rating Progress"
                current={ratingProgress.current}
                total={ratingProgress.total}
                subtitle="Problems Solved"
              />
              <ProgressCard
                title="Overall Progress"
                current={userStats.totalSolved}
                total={problemStats.total}
                subtitle="Problems Solved"
              />
              <ProgressCard
                title="Bookmarked"
                current={userStats.totalBookmarked}
                total={problemStats.total}
                subtitle="For Later"
              />
            </div>

            {/* Activity Heatmap */}
            <ActivityHeatmap dailySolves={userStats.dailySolves} />

            {/* Problem Table Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {/* Tabs and Controls */}
              <div className="glass-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-muted/30">
                      <TabsTrigger value="all" className="gap-2">
                        <List className="w-4 h-4" />
                        All
                      </TabsTrigger>
                      <TabsTrigger value="bookmarked" className="gap-2">
                        <Bookmark className="w-4 h-4" />
                        Bookmarked
                      </TabsTrigger>
                      <TabsTrigger value="unsolved" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Unsolved
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="focus-mode" className="text-sm text-muted-foreground">
                        Focus Mode
                      </Label>
                      <Switch
                        id="focus-mode"
                        checked={focusMode}
                        onCheckedChange={setFocusMode}
                      />
                    </div>
                    
                    <CodeforcesConnect />
                  </div>
                </div>

                {/* Search */}
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search problems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50 border-border/50"
                  />
                </div>
              </div>

              {/* Problem Table */}
              {filteredProblems.length > 0 ? (
                <ProblemTable
                  problems={filteredProblems}
                  solvedProblems={progress.solvedProblems}
                  bookmarkedProblems={progress.bookmarkedProblems}
                  onToggleSolved={markSolved}
                  onToggleBookmark={toggleBookmark}
                />
              ) : (
                <div className="glass-card p-12 text-center">
                  <p className="text-muted-foreground">No problems found matching your criteria</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="xl:w-80 flex-shrink-0">
            <div className="xl:sticky xl:top-24 space-y-6">
              <VisitCalendar
                dailySolves={userStats.dailySolves}
                currentStreak={userStats.streak}
                longestStreak={userStats.longestStreak}
              />

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-4"
              >
                <h3 className="font-semibold mb-4">Problem Distribution</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Easy', count: problemStats.easy, color: 'bg-emerald-500' },
                    { label: 'Medium', count: problemStats.medium, color: 'bg-yellow-500' },
                    { label: 'Hard', count: problemStats.hard, color: 'bg-red-500' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
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
