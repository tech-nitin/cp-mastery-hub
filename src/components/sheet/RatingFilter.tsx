import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface RatingFilterProps {
  selectedRating: number | null;
  onSelectRating: (rating: number | null) => void;
}

const RATINGS = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900];

const RatingFilter = ({ selectedRating, onSelectRating }: RatingFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2"
    >
      <span className="text-sm font-medium text-muted-foreground mr-2">Rating</span>
      {RATINGS.map((rating) => (
        <Button
          key={rating}
          variant={selectedRating === rating ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectRating(selectedRating === rating ? null : rating)}
          className={`min-w-[60px] text-xs transition-all ${
            selectedRating === rating 
              ? 'bg-primary text-primary-foreground' 
              : 'border-border/50 hover:border-primary/50'
          }`}
        >
          {rating}
        </Button>
      ))}
    </motion.div>
  );
};

export default RatingFilter;
