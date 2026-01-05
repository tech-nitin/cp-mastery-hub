import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProgressCardProps {
  title: string;
  current: number;
  total: number;
  subtitle?: string;
  showLink?: boolean;
  linkHref?: string;
}

const ProgressCard = ({ title, current, total, subtitle, showLink, linkHref }: ProgressCardProps) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-4 flex items-center justify-between"
    >
      <div>
        <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{current}</span>
          <span className="text-muted-foreground">/{total}</span>
        </div>
        {subtitle && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-primary">{subtitle}</span>
            {showLink && linkHref && (
              <a href={linkHref} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 text-primary" />
              </a>
            )}
          </div>
        )}
      </div>
      
      {/* Circular Progress */}
      <div className="relative w-16 h-16">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted/30"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="url(#progress-gradient-card)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 1.76} 176`}
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="progress-gradient-card" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{percentage}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressCard;
