import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  BookmarkCheck,
  FileText,
  MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Problem } from '@/data/problems';

interface ProblemTableProps {
  problems: (Problem & { dayNumber: number })[];
  solvedProblems: Set<string>;
  bookmarkedProblems: Set<string>;
  onToggleSolved: (id: string) => void;
  onToggleBookmark: (id: string) => void;
}

const ProblemTable = ({
  problems,
  solvedProblems,
  bookmarkedProblems,
  onToggleSolved,
  onToggleBookmark,
}: ProblemTableProps) => {
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card overflow-hidden"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Problem</TableHead>
              <TableHead className="w-24 text-center">Rating</TableHead>
              <TableHead className="w-24 text-center">Status</TableHead>
              <TableHead className="w-20 text-center">Bookmark</TableHead>
              <TableHead className="w-20 text-center">Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map((problem, index) => {
              const isSolved = solvedProblems.has(problem.id);
              const isBookmarked = bookmarkedProblems.has(problem.id);
              
              return (
                <TableRow 
                  key={problem.id}
                  className={`border-border/30 transition-colors ${
                    isSolved ? 'bg-emerald-500/5' : 'hover:bg-muted/20'
                  }`}
                >
                  <TableCell className="font-medium text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className={`font-medium ${isSolved ? 'text-muted-foreground line-through' : ''}`}>
                        {problem.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getDifficultyBadge(problem.difficulty)}`}
                        >
                          {problem.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {problem.platform}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {problem.rating ? (
                      <Badge variant="secondary" className="text-xs">
                        {problem.rating}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onToggleSolved(problem.id)}
                      className="h-8 w-8"
                    >
                      {isSolved ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onToggleBookmark(problem.id)}
                      className="h-8 w-8"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <Bookmark className="w-5 h-5 text-muted-foreground hover:text-yellow-500" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default ProblemTable;
