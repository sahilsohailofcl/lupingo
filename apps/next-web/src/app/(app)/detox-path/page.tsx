'use client';

import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@foclupus/utils/apiClient';
import { 
  CheckCircle2, 
  Lock, 
  Brain, 
  ChevronRight, 
  Sparkles, 
  Trophy,
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Enhanced Mock Entity Type ---
interface DetoxLesson {
  id: string;
  lesson_number: number;
  title: string;
  subtitle: string;
  content: string;
  xp_reward: number;
  duration_minutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  is_complete: boolean;
  is_locked: boolean;
}

// ------------------------------------------------
// 1. Mock Data Setup (Enhanced)
// ------------------------------------------------
const MOCK_LESSONS: DetoxLesson[] = [
  { id: 'l1', lesson_number: 1, title: 'The Dopamine Loop', subtitle: 'Understand how habits form in your brain.', content: "Dopamine isn't the 'pleasure' hormone; it's the 'seeking' hormone. It drives you to check notifications, scroll, and start the next task. Our first lesson helps you identify your personal dopamine triggers and how to replace them with healthier, high-value behaviors. Remember, the goal is not zero dopamine, but **better** dopamine.", xp_reward: 10, duration_minutes: 5, difficulty: 'beginner', is_complete: true, is_locked: false },
  { id: 'l2', lesson_number: 2, title: 'Digital Boundaries', subtitle: 'Strategies for screen limits and app control.', content: "Time to tame the digital beast! We'll cover practical techniques like creating 'app fences,' using grayscale mode, and setting hard limits on distracting apps. Start with a 30-minute block of 'app-free' time today.", xp_reward: 15, duration_minutes: 7, difficulty: 'beginner', is_complete: false, is_locked: false },
  { id: 'l3', lesson_number: 3, title: 'Embracing Boredom', subtitle: 'Turning discomfort into creative fuel.', content: 'Boredom is your brain asking for quality input. When you feel the urge to grab your phone, stop. Just sit for 5 minutes and let your mind wander. This space is where true creativity and self-awareness emerge.', xp_reward: 20, duration_minutes: 10, difficulty: 'intermediate', is_complete: false, is_locked: true },
  { id: 'l4', lesson_number: 4, title: 'Wolfpack Mindset', subtitle: 'Leveraging community and accountability.', content: 'Focus isn\'t just a solo game. In this lesson, we discuss how sharing your focus goals with others (your "Wolfpack") creates social pressure and motivation, significantly increasing your success rate.', xp_reward: 25, duration_minutes: 8, difficulty: 'intermediate', is_complete: false, is_locked: true },
];

async function fetchDetoxLessons(): Promise<DetoxLesson[]> {
  // Simulate fetching data with progression logic
  const completedLessons = MOCK_LESSONS.filter(l => l.is_complete).length;
  return MOCK_LESSONS.map((lesson, index) => ({
    ...lesson,
    // Unlock the next lesson after the last one is complete
    is_locked: index > completedLessons,
    is_complete: lesson.id === 'l1' // Keep 'l1' complete for initial view
  }));
}

// ------------------------------------------------
// 2. Main Component
// ------------------------------------------------
export default function DetoxPathPage() {
  const queryClient = useQueryClient();
  const [selectedLesson, setSelectedLesson] = useState<DetoxLesson | null>(null);
  const [showXP, setShowXP] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  
  // Use TanStack Query
  const { data: lessons = [], isLoading, error } = useQuery({
    queryKey: ['detoxLessons'],
    queryFn: fetchDetoxLessons,
  });

  const completedCount = lessons.filter(l => l.is_complete).length;
  const totalXP = lessons.reduce((sum, l) => sum + (l.is_complete ? l.xp_reward : 0), 0);
  const nextLesson = lessons.find(l => !l.is_complete && !l.is_locked);
  
  // --- Mutation to Mark Lesson Complete ---
  const completeLessonMutation = useMutation({
    mutationFn: async (lesson: DetoxLesson) => {
      // MOCK API UPDATE
      console.log(`[API MOCK] Completing lesson ${lesson.id}`);
      
      // Assume success and return the XP reward
      return lesson.xp_reward;
    },
    onSuccess: (xp, lesson) => {
      setEarnedXP(xp);
      setShowXP(true);
      setSelectedLesson(null); // Close the modal
      
      // Manually update cache to simulate completion before full refetch
      queryClient.setQueryData<DetoxLesson[]>(['detoxLessons'], (oldLessons) => {
        if (!oldLessons) return [];
        const newLessons = oldLessons.map(l => l.id === lesson.id ? { ...l, is_complete: true, is_locked: false } : l);
        
        // Re-run the progression logic to unlock the next one immediately
        const completed = newLessons.filter(l => l.is_complete).length;
        return newLessons.map((l, index) => ({
          ...l,
          is_locked: index >= completed
        }));
      });
      
      // Invalidate to update progress bar and ensure state is fresh
      queryClient.invalidateQueries({ queryKey: ['detoxLessons'] });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] }); // For XP update
    },
  });
  
  const handleLessonClick = (lesson: DetoxLesson) => {
    if (!lesson.is_locked) {
      setSelectedLesson(lesson);
    }
  };

  const handleCompleteLesson = (lesson: DetoxLesson) => {
    completeLessonMutation.mutate(lesson);
  };

  if (isLoading) return <div className="text-center py-10 text-wolf-brown-light">Loading the Detox Path...</div>;
  if (error) return <div className="text-center py-10 text-red-700">An error occurred: {(error as Error).message}</div>;

  return (
    <div className="min-h-screen bg-[#fffaf4] p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
      
      {/* XP Celebration (Placeholder for external component) */}
      <AnimatePresence>
        {showXP && <XPCelebrationModal xp={earnedXP} onClose={() => setShowXP(false)} />}
      </AnimatePresence>
      
      {/* Lesson Modal */}
      <AnimatePresence>
        {selectedLesson && (
          <LessonModal
            lesson={selectedLesson}
            onClose={() => setSelectedLesson(null)}
            onComplete={handleCompleteLesson}
            isCompleting={completeLessonMutation.isPending}
          />
        )}
      </AnimatePresence>

      {/* --- Header & Progress Card --- */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 border-4 border-purple-200 shadow-xl">
        <header className="space-y-2 mb-4">
          <Brain className="w-8 h-8 text-purple-600 mx-auto" />
          <h1 className="text-3xl font-extrabold text-wolf-brown-dark">
            Dopamine Detox Path
          </h1>
          <p className="text-wolf-brown-light font-medium">
            Reset your reward system with mindful lessons.
          </p>
        </header>
        
        <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-purple-200/50">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-wolf-brown-dark font-semibold">
              {completedCount} / {lessons.length} Lessons
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="w-5 h-5 text-wolf-red" />
            <span className="text-wolf-brown-dark font-semibold">
              {totalXP} Total XP
            </span>
          </div>
        </div>
        
        {/* Simple Progress Bar */}
        <div className="mt-4 h-3 bg-purple-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / lessons.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      {/* --- Lesson List --- */}
      <div className="space-y-4">
        {lessons.map((lesson, index) => {
          const isCompleted = lesson.is_complete;
          const isNext = !isCompleted && !lesson.is_locked;
          const isLocked = lesson.is_locked;

          return (
            <motion.button
              key={lesson.id}
              whileHover={!isLocked ? { scale: 1.01 } : {}}
              whileTap={!isLocked ? { scale: 0.99 } : {}}
              onClick={() => handleLessonClick(lesson)}
              disabled={isLocked || isCompleted}
              className={`w-full text-left rounded-2xl p-5 border-2 transition-all duration-300 ${
                isCompleted
                  ? 'bg-green-50 border-green-300 shadow-lg'
                  : isNext
                    ? 'bg-white border-wolf-red ring-4 ring-wolf-red/30 pulse-glow'
                    : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isCompleted
                    ? 'bg-green-500'
                    : isNext
                      ? 'wolf-gradient'
                      : 'bg-gray-300'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : isLocked ? (
                    <Lock className="w-6 h-6 text-white" />
                  ) : (
                    <Brain className="w-6 h-6 text-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold uppercase ${isLocked ? 'text-gray-400' : isCompleted ? 'text-green-600' : 'text-wolf-brown-light'}`}>
                    Lesson {lesson.lesson_number}
                  </p>
                  <h3 className={`text-xl font-bold truncate ${isLocked ? 'text-gray-500' : 'text-wolf-brown-dark'}`}>
                    {lesson.title}
                  </h3>
                  <p className={`text-sm mt-1 truncate ${isLocked ? 'text-gray-400' : 'text-wolf-brown-light'}`}>
                    {lesson.subtitle}
                  </p>
                </div>

                {/* Metadata & Arrow */}
                <div className="flex flex-col items-end flex-shrink-0 space-y-1">
                  <div className={`text-sm font-bold ${isLocked ? 'text-gray-500' : 'text-wolf-red'}`}>
                    +{lesson.xp_reward} XP
                  </div>
                  <div className={`text-xs ${isLocked ? 'text-gray-400' : 'text-wolf-brown-light'}`}>
                    {lesson.duration_minutes} min
                  </div>
                  {!isLocked && (
                    <ChevronRight className={`w-5 h-5 mt-2 ${isCompleted ? 'text-green-600' : 'text-wolf-red'}`} />
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      
      {/* Styling for pulse-glow (requires CSS injection or a utility class) */}
      <style>{`
        .pulse-glow {
          animation: pulse-ring 2s infinite;
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(178, 45, 21, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(178, 45, 21, 0); }
          100% { box-shadow: 0 0 0 0 rgba(178, 45, 21, 0); }
        }
        .wolf-gradient {
          background: linear-gradient(135deg, #b22d15, #de8538);
          color: white;
        }
        .wolf-brown-dark { color: #2d1810; }
        .wolf-brown-light { color: #8b7355; }
        .wolf-red { color: #b22d15; }
      `}</style>
    </div>
  );
}


// ------------------------------------------------
// 3. Lesson Modal Component (Inline for simplicity)
// ------------------------------------------------

interface LessonModalProps {
  lesson: DetoxLesson;
  onClose: () => void;
  onComplete: (lesson: DetoxLesson) => void;
  isCompleting: boolean;
}

const LessonModal: React.FC<LessonModalProps> = ({ lesson, onClose, onComplete, isCompleting }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-wolf-brown-light hover:text-wolf-red transition-colors">
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 border-b pb-4 border-gray-100">
          <div className="flex items-center justify-center gap-2 text-sm text-wolf-brown-light mb-1">
            <Brain className="w-4 h-4" />
            LESSON {lesson.lesson_number}
          </div>
          <h2 className="text-3xl font-extrabold text-wolf-brown-dark mb-2">
            {lesson.title}
          </h2>
          <p className="text-wolf-brown-light">{lesson.subtitle}</p>
        </div>

        {/* Content (Use a real markdown parser for production) */}
        <div className="prose max-w-none mb-8 text-lg text-wolf-brown-dark leading-relaxed">
          <p>{lesson.content}</p>
          <p className="mt-4 font-semibold text-wolf-red">
            Challenge: Practice this concept for 2 hours today!
          </p>
        </div>

        {/* Footer/Action */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="text-sm text-wolf-brown-light font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-wolf-red" />
            Reward: +{lesson.xp_reward} XP
          </div>
          
          <button
            onClick={() => onComplete(lesson)}
            disabled={isCompleting || lesson.is_complete}
            className={`wolf-gradient px-6 py-3 text-white rounded-xl font-bold shadow-md transition-opacity ${
              isCompleting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {isCompleting ? 'Completing...' : 'I Did It! Claim XP'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};


// ------------------------------------------------
// 4. XP Celebration Modal (Placeholder)
// ------------------------------------------------

interface XPCelebrationModalProps {
  xp: number;
  onClose: () => void;
}

const XPCelebrationModal: React.FC<XPCelebrationModalProps> = ({ xp, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-wolf-red/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.5, rotate: 10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="bg-white rounded-3xl p-10 text-center shadow-2xl relative border-4 border-wolf-gold"
      >
        <Trophy className="w-20 h-20 text-wolf-gold mx-auto mb-4 fill-wolf-gold animate-bounce" />
        <h3 className="text-4xl font-black text-wolf-brown-dark mb-2">XP Earned!</h3>
        <p className="text-wolf-brown-light text-xl mb-6">
          You gained <span className="text-wolf-red font-extrabold">+{xp} XP</span> for completing the lesson.
        </p>
        <button
          onClick={onClose}
          className="wolf-gradient px-8 py-3 text-lg rounded-xl font-bold shadow-lg"
        >
          Keep Learning
        </button>
      </motion.div>
    </motion.div>
  );
};