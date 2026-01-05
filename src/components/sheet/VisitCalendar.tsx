import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VisitCalendarProps {
  dailySolves: Record<string, number>;
  currentStreak: number;
  longestStreak: number;
}

const VisitCalendar = ({ dailySolves, currentStreak, longestStreak }: VisitCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { days, monthLabel } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = (firstDay.getDay() + 6) % 7; // Monday start
    
    const days: { date: Date | null; isActive: boolean }[] = [];
    
    // Add padding for days before the first of the month
    for (let i = 0; i < startPadding; i++) {
      days.push({ date: null, isActive: false });
    }
    
    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      days.push({ date, isActive: (dailySolves[dateStr] || 0) > 0 });
    }
    
    const monthLabel = currentDate.toLocaleString('default', { month: 'short', year: 'numeric' });
    
    return { days, monthLabel };
  }, [currentDate, dailySolves]);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const weekDays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-4"
    >
      {/* Streak Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20">
          <span className="text-lg">⚡</span>
          <div>
            <div className="text-xs text-muted-foreground">Current Streak</div>
            <div className="font-bold">{currentStreak} days</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20">
          <span className="text-lg">🔥</span>
          <div>
            <div className="text-xs text-muted-foreground">Longest Streak</div>
            <div className="font-bold">{longestStreak} days</div>
          </div>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="font-semibold">Visit Streak Calendar</span>
        </div>
        <Info className="w-4 h-4 text-muted-foreground cursor-help" />
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">{monthLabel}</span>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs text-muted-foreground font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`aspect-square flex items-center justify-center rounded-full text-xs ${
              day.date
                ? day.isActive
                  ? 'bg-emerald-500 text-white font-medium'
                  : 'text-muted-foreground hover:bg-muted/30'
                : ''
            }`}
          >
            {day.date?.getDate()}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default VisitCalendar;
