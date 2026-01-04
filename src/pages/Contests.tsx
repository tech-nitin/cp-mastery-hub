import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, Calendar, Timer, Trophy, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { contests, platformInfo, formatDuration, getTimeUntil, type Contest } from '@/data/contests';

const Contests = () => {
  const [countdown, setCountdown] = useState<Record<string, ReturnType<typeof getTimeUntil>>>({});
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  // Update countdowns every second
  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns: Record<string, ReturnType<typeof getTimeUntil>> = {};
      contests.forEach((contest) => {
        newCountdowns[contest.id] = getTimeUntil(contest.startTime);
      });
      setCountdown(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredContests = selectedPlatform
    ? contests.filter((c) => c.platform === selectedPlatform)
    : contests;

  const sortedContests = [...filteredContests].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime()
  );

  const formatCountdown = (time: ReturnType<typeof getTimeUntil>) => {
    if (time.days > 0) {
      return `${time.days}d ${time.hours}h`;
    }
    if (time.hours > 0) {
      return `${time.hours}h ${time.minutes}m`;
    }
    return `${time.minutes}m ${time.seconds}s`;
  };

  const platforms = Object.entries(platformInfo);

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
            Contest <span className="gradient-text">Tracker</span>
          </h1>
          <p className="text-muted-foreground">
            Never miss a competitive programming contest across all major platforms
          </p>
        </motion.div>

        {/* Platform Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 mb-8"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filter by platform:
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant={selectedPlatform === null ? 'default' : 'outline'}
                onClick={() => setSelectedPlatform(null)}
              >
                All
              </Button>
              {platforms.map(([key, info]) => (
                <Button
                  key={key}
                  size="sm"
                  variant={selectedPlatform === key ? 'default' : 'outline'}
                  onClick={() => setSelectedPlatform(selectedPlatform === key ? null : key)}
                  className="gap-2"
                >
                  <span>{info.icon}</span>
                  {info.name}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {platforms.map(([key, info], index) => {
            const platformContests = contests.filter((c) => c.platform === key);
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="glass-card p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{info.icon}</span>
                  <div>
                    <div className="text-2xl font-bold">{platformContests.length}</div>
                    <div className="text-xs text-muted-foreground">{info.name}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Upcoming Contests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Upcoming Contests
          </h2>

          <div className="space-y-4">
            {sortedContests.map((contest, index) => {
              const time = countdown[contest.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
              const info = platformInfo[contest.platform];
              const isImminent = time.days === 0 && time.hours < 24;

              return (
                <motion.div
                  key={contest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={`glass-card-hover p-6 ${
                    isImminent ? 'border-primary/30 glow-sm' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    {/* Platform Icon */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-2xl">
                        {info.icon}
                      </div>
                    </div>

                    {/* Contest Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <h3 className="font-semibold truncate">{contest.name}</h3>
                        <Badge variant="outline" className={`${info.color} border flex-shrink-0`}>
                          {info.name}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{contest.startTime.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{contest.startTime.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Timer className="w-4 h-4" />
                          <span>{formatDuration(contest.duration)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Countdown & Action */}
                    <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
                      {/* Countdown */}
                      <div className={`text-right ${isImminent ? 'animate-pulse' : ''}`}>
                        <div className="text-sm text-muted-foreground mb-1">Starts in</div>
                        <div className={`text-xl font-bold ${isImminent ? 'text-primary' : ''}`}>
                          {formatCountdown(time)}
                        </div>
                      </div>

                      {/* Register Button */}
                      <Button
                        asChild
                        variant={isImminent ? 'default' : 'outline'}
                        className={isImminent ? 'gradient-primary text-primary-foreground glow-sm' : ''}
                      >
                        <a
                          href={contest.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-2"
                        >
                          Register
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Countdown Timer Bar for Imminent Contests */}
                  {isImminent && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="grid grid-cols-4 gap-4">
                        {[
                          { value: time.days, label: 'Days' },
                          { value: time.hours, label: 'Hours' },
                          { value: time.minutes, label: 'Minutes' },
                          { value: time.seconds, label: 'Seconds' },
                        ].map((unit) => (
                          <div key={unit.label} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold gradient-text">
                              {String(unit.value).padStart(2, '0')}
                            </div>
                            <div className="text-xs text-muted-foreground">{unit.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Platform Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platforms.map(([key, info]) => (
              <a
                key={key}
                href={info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-hover p-4 flex items-center gap-3 group"
              >
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <div className="font-semibold group-hover:text-primary transition-colors">
                    {info.name}
                  </div>
                  <div className="text-xs text-muted-foreground">View all contests</div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contests;
