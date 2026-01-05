import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ActivityHeatmapProps {
  dailySolves: Record<string, number>;
}

const ActivityHeatmap = ({ dailySolves }: ActivityHeatmapProps) => {
  const { weeks, stats } = useMemo(() => {
    const today = new Date();
    const weeks: { date: Date; count: number }[][] = [];
    let currentWeek: { date: Date; count: number }[] = [];
    let totalDays = 0;
    let longestStreak = 0;
    let currentStreak = 0;
    let totalSolves = 0;

    // Generate last 52 weeks of data
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = dailySolves[dateStr] || 0;
      
      if (count > 0) {
        totalDays++;
        totalSolves += count;
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }

      currentWeek.push({ date, count });
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return { 
      weeks, 
      stats: { 
        activeDays: totalDays, 
        longestStreak, 
        currentStreak,
        totalSolves 
      } 
    };
  }, [dailySolves]);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-muted/30';
    if (count === 1) return 'bg-emerald-900/60';
    if (count === 2) return 'bg-emerald-700/70';
    if (count <= 4) return 'bg-emerald-500/80';
    return 'bg-emerald-400';
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 md:p-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{stats.activeDays}</span>
          <span className="text-muted-foreground">Active days</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">🔥</span>
            <span>{stats.currentStreak} Days AC Streak</span>
          </div>
          <div className="text-muted-foreground">
            Longest: {stats.longestStreak}
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[720px]">
          {/* Month labels */}
          <div className="flex mb-1 ml-3">
            {months.map((month, i) => (
              <span key={month} className="text-xs text-muted-foreground flex-1 text-center">
                {month}
              </span>
            ))}
          </div>
          
          {/* Grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-colors hover:ring-1 hover:ring-primary/50`}
                    title={`${day.date.toLocaleDateString()}: ${day.count} problems`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-muted-foreground">
          {stats.totalSolves} problems solved this year
        </span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-muted/30" />
            <div className="w-3 h-3 rounded-sm bg-emerald-900/60" />
            <div className="w-3 h-3 rounded-sm bg-emerald-700/70" />
            <div className="w-3 h-3 rounded-sm bg-emerald-500/80" />
            <div className="w-3 h-3 rounded-sm bg-emerald-400" />
          </div>
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityHeatmap;
