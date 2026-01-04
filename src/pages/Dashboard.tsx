import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Flame, Award, Calendar, BarChart3 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { useProgress } from '@/hooks/useProgress';
import { cp31Sheet, getProblemStats } from '@/data/problems';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { progress, getStats, isSolved } = useProgress();
  const userStats = getStats();
  const problemStats = getProblemStats();

  // Calculate topic-wise progress
  const topicProgress = useMemo(() => {
    const topicMap: Record<string, { solved: number; total: number }> = {};
    
    cp31Sheet.forEach((day) => {
      if (!topicMap[day.topic]) {
        topicMap[day.topic] = { solved: 0, total: 0 };
      }
      day.problems.forEach((problem) => {
        topicMap[day.topic].total++;
        if (isSolved(problem.id)) {
          topicMap[day.topic].solved++;
        }
      });
    });

    return Object.entries(topicMap).map(([topic, data]) => ({
      topic,
      ...data,
      percentage: Math.round((data.solved / data.total) * 100),
    }));
  }, [isSolved]);

  // Calculate difficulty distribution of solved problems
  const solvedByDifficulty = useMemo(() => {
    let easy = 0, medium = 0, hard = 0;
    
    cp31Sheet.forEach((day) => {
      day.problems.forEach((problem) => {
        if (isSolved(problem.id)) {
          if (problem.difficulty === 'easy') easy++;
          else if (problem.difficulty === 'medium') medium++;
          else hard++;
        }
      });
    });

    return { easy, medium, hard };
  }, [isSolved]);

  // Generate last 7 days data
  const last7Days = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        count: userStats.dailySolves[dateStr] || 0,
      });
    }
    return days;
  }, [userStats.dailySolves]);

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
        },
      },
    },
  };

  // Line chart data - Daily progress
  const lineChartData = {
    labels: last7Days.map((d) => d.label),
    datasets: [
      {
        label: 'Problems Solved',
        data: last7Days.map((d) => d.count),
        borderColor: 'hsl(190, 95%, 50%)',
        backgroundColor: 'hsla(190, 95%, 50%, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'hsl(190, 95%, 50%)',
        pointBorderColor: 'hsl(222, 47%, 6%)',
        pointBorderWidth: 2,
      },
    ],
  };

  // Doughnut chart data - Difficulty distribution
  const doughnutChartData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [solvedByDifficulty.easy, solvedByDifficulty.medium, solvedByDifficulty.hard],
        backgroundColor: [
          'hsl(160, 84%, 50%)',
          'hsl(45, 93%, 58%)',
          'hsl(0, 84%, 60%)',
        ],
        borderColor: 'hsl(222, 47%, 8%)',
        borderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };

  // Bar chart data - Topic progress
  const barChartData = {
    labels: topicProgress.slice(0, 8).map((t) => t.topic.split(' ')[0]),
    datasets: [
      {
        label: 'Solved',
        data: topicProgress.slice(0, 8).map((t) => t.solved),
        backgroundColor: 'hsl(190, 95%, 50%)',
        borderRadius: 8,
      },
      {
        label: 'Remaining',
        data: topicProgress.slice(0, 8).map((t) => t.total - t.solved),
        backgroundColor: 'hsla(217, 33%, 17%, 0.5)',
        borderRadius: 8,
      },
    ],
  };

  const barChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    scales: {
      ...chartOptions.scales,
      x: {
        ...chartOptions.scales.x,
        stacked: true,
      },
      y: {
        ...chartOptions.scales.y,
        stacked: true,
      },
    },
  };

  const completionPercentage = Math.round((userStats.totalSolved / problemStats.total) * 100);

  // Find best day
  const bestDay = useMemo(() => {
    let max = 0;
    let bestDate = '';
    Object.entries(userStats.dailySolves).forEach(([date, count]) => {
      if (count > max) {
        max = count;
        bestDate = date;
      }
    });
    return { date: bestDate, count: max };
  }, [userStats.dailySolves]);

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
            Analytics <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Track your competitive programming journey with detailed insights
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Target,
              label: 'Total Solved',
              value: userStats.totalSolved,
              subtext: `of ${problemStats.total} problems`,
              color: 'text-primary',
              bgColor: 'bg-primary/10',
            },
            {
              icon: Flame,
              label: 'Current Streak',
              value: `${userStats.streak} days`,
              subtext: 'Keep it up!',
              color: 'text-status-attempted',
              bgColor: 'bg-status-attempted/10',
            },
            {
              icon: Award,
              label: 'Best Day',
              value: `${bestDay.count || 0} solved`,
              subtext: bestDay.date ? new Date(bestDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No data yet',
              color: 'text-secondary',
              bgColor: 'bg-secondary/10',
            },
            {
              icon: TrendingUp,
              label: 'Completion',
              value: `${completionPercentage}%`,
              subtext: 'Overall progress',
              color: 'text-accent',
              bgColor: 'bg-accent/10',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.subtext}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Problems Solved (Last 7 Days)</h3>
            </div>
            <div className="h-64">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Difficulty Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Difficulty Breakdown</h3>
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="w-48 h-48">
                <Doughnut
                  data={doughnutChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: 'rgba(255, 255, 255, 0.7)',
                          usePointStyle: true,
                          padding: 20,
                        },
                      },
                    },
                    cutout: '60%',
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                { label: 'Easy', value: solvedByDifficulty.easy, color: 'text-status-solved' },
                { label: 'Medium', value: solvedByDifficulty.medium, color: 'text-status-attempted' },
                { label: 'Hard', value: solvedByDifficulty.hard, color: 'text-destructive' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Topic Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Topic-wise Progress</h3>
          </div>
          <div className="h-72">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </motion.div>

        {/* All Topics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h3 className="font-semibold mb-6">All Topics Overview</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {topicProgress.map((topic, index) => (
              <motion.div
                key={topic.topic}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.02 }}
                className="p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm truncate">{topic.topic}</span>
                  <span className="text-sm text-muted-foreground flex-shrink-0 ml-2">
                    {topic.solved}/{topic.total}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.02 }}
                    className={`h-full rounded-full ${
                      topic.percentage === 100
                        ? 'bg-status-solved'
                        : topic.percentage >= 50
                        ? 'bg-primary'
                        : 'bg-secondary'
                    }`}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{topic.percentage}% complete</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
