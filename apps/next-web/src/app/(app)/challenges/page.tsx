'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trophy, Target, Sparkles, X, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// NOTE: The mock types/components are kept to ensure the file is self-contained and runnable.

// --- MOCK API Client/Types ---
interface Challenge {
  id: string;
  title: string;
  xp_reward: number;
  current_progress: number;
  target_value: number;
  completion_status: 'in_progress' | 'complete' | 'pending';
}

// MOCK DATA for all challenges
const INITIAL_MOCK_CHALLENGES: Challenge[] = [
  { id: 'c1', title: '30 min Deep Focus', xp_reward: 10, current_progress: 20, target_value: 30, completion_status: 'in_progress' },
  { id: 'c2', title: 'Finish 1 Detox Lesson', xp_reward: 15, current_progress: 1, target_value: 1, completion_status: 'complete' },
  { id: 'c3', title: 'Read 10 mins', xp_reward: 10, current_progress: 0, target_value: 10, completion_status: 'pending' },
  { id: 'c4', title: 'No Social Media Day', xp_reward: 50, current_progress: 0, target_value: 1, completion_status: 'pending' },
  { id: 'c5', title: 'Meditate for 5 min', xp_reward: 5, current_progress: 5, target_value: 5, completion_status: 'complete' },
];

// --- MOCK UI Components (Placeholders) ---

// FIX: Changed icon type to React.ElementType to resolve Vercel build conflict
const SectionHeader = ({ title, icon: Icon }: { title: string, icon: React.ElementType }) => (
  <header className="text-center space-y-2">
    <Icon className="w-10 h-10 text-wolf-gold mx-auto fill-wolf-gold/10" />
    <h1 className="text-3xl font-extrabold text-wolf-brown-dark">{title}</h1>
  </header>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-3xl border-2 border-wolf-border shadow-lg ${className}`}>
    {children}
  </div>
);

const WolfButton = ({ children, onClick, disabled, className, size = "md" }: { children: React.ReactNode, onClick: () => void, disabled?: boolean, className?: string, size?: 'sm' | 'md' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`wolf-gradient text-white rounded-xl font-bold shadow-md transition-opacity hover:opacity-90 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className} ${size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3'}`}
  >
    {children}
  </button>
);

// --- Challenge Card Component (Interactive Placeholder) ---
const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  const isComplete = challenge.completion_status === 'complete';
  const progressPercent = Math.min(100, (challenge.current_progress / challenge.target_value) * 100);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: isComplete ? 1 : 1.03, rotate: isComplete ? 0 : 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card
        className={`p-5 space-y-3 ${
          isComplete
            ? 'border-4 border-green-300 bg-green-50/50'
            : challenge.completion_status === 'in_progress'
            ? 'border-4 border-wolf-red/50'
            : 'border-2 border-wolf-border hover:border-wolf-gold'
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${isComplete ? 'text-green-700 line-through' : 'text-wolf-brown-dark'}`}>
            {challenge.title}
          </h3>
          <div className="flex items-center text-sm font-bold text-wolf-red">
            <Trophy className="w-4 h-4 mr-1 text-wolf-gold fill-wolf-gold/50" />
            +{challenge.xp_reward} XP
          </div>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isComplete ? 'bg-green-500' : 'bg-wolf-red'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <p className="text-xs text-wolf-brown-light">
          {isComplete ? 'Completed!' : `${challenge.current_progress} / ${challenge.target_value} ${challenge.target_value > 1 ? 'units' : 'unit'}`}
        </p>

        {!isComplete && challenge.completion_status === 'in_progress' && (
          <WolfButton onClick={() => alert(`Tracking progress for ${challenge.title}`)} size="sm" className="w-full mt-2 bg-wolf-red">
            Update Progress
          </WolfButton>
        )}
      </Card>
    </motion.div>
  );
};

// --- Add Challenge Modal Component ---
const AddChallengeModal: React.FC<{ onClose: () => void, onAdd: (title: string, xp: number) => void }> = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [xp, setXp] = useState(25);
  const isFormValid = title.trim().length > 3 && xp > 0;

  const handleSubmit = () => {
    onAdd(title.trim(), xp);
    onClose();
  };

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
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative border-4 border-wolf-gold/50"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-wolf-brown-light hover:text-wolf-red transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <Sparkles className="w-8 h-8 text-wolf-gold mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-wolf-brown-dark">Set a New Wolf Goal</h2>
          <p className="text-wolf-brown-light text-sm">Create a micro-challenge to boost your focus and XP.</p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-wolf-brown-dark">Challenge Name:</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., No Phone in Bedroom, 1hr Code Block"
              className="w-full mt-1 p-3 border border-wolf-border rounded-lg focus:ring-wolf-red focus:border-wolf-red transition"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-wolf-brown-dark">XP Reward: ({xp})</span>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={xp}
              onChange={(e) => setXp(parseInt(e.target.value))}
              className="w-full mt-1 accent-wolf-red"
            />
          </label>
        </div>

        <WolfButton
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full mt-6"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Challenge
        </WolfButton>
      </motion.div>
    </motion.div>
  );
};


// ------------------------------------------------
// 2. Main Challenges Page Component
// ------------------------------------------------

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_MOCK_CHALLENGES);
  const [showAddModal, setShowAddModal] = useState(false);
  const isLoading = false; // Mock loading state

  // Simulate fetching data, which would happen via useQuery in a real app
  // const { data: challenges, isLoading } = useQuery<Challenge[]>({ ... });

  const handleAddChallenge = (title: string, xp: number) => {
    const newChallenge: Challenge = {
      id: `c${Date.now()}`,
      title,
      xp_reward: xp,
      current_progress: 0,
      target_value: 1, // Default to a simple 1-step challenge
      completion_status: 'pending',
    };
    setChallenges(prev => [newChallenge, ...prev]);
  };

  if (isLoading) {
    return <div className="text-center py-10 text-wolf-brown-light">Fetching challenges...</div>;
  }
  
  const activeChallenges = challenges.filter(c => c.completion_status !== 'complete');
  const completedChallenges = challenges.filter(c => c.completion_status === 'complete');

  return (
    <div className="min-h-screen bg-[#fffaf4] p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
      
      {/* Add Challenge Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddChallengeModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddChallenge}
          />
        )}
      </AnimatePresence>

      <SectionHeader title="Your Wolf Pack Challenges" icon={Trophy} />

      {/* --- Active Challenges Header --- */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-wolf-border shadow-sm">
        <h2 className="text-xl font-bold text-wolf-brown-dark flex items-center">
          <Target className="w-6 h-6 mr-2 text-wolf-red" /> Active Goals ({activeChallenges.length})
        </h2>
        <WolfButton onClick={() => setShowAddModal(true)} size="sm">
          <Plus className="w-4 h-4 mr-1" /> New Goal
        </WolfButton>
      </div>

      {/* --- Active Challenges List --- */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {activeChallenges.length > 0 ? (
            activeChallenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))
          ) : (
            <Card className="col-span-full p-6 text-center text-wolf-brown-light border-dashed">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-wolf-brown-light opacity-50" />
              <p className="font-medium">No active challenges. Click 'New Goal' to start one!</p>
            </Card>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- Completed Challenges Header --- */}
      <h2 className="text-xl font-bold text-wolf-brown-dark flex items-center pt-4 border-t border-wolf-border">
        <Trophy className="w-6 h-6 mr-2 text-wolf-gold" /> Completed Hunts ({completedChallenges.length})
      </h2>
      
      {/* --- Completed Challenges List --- */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-70">
        <AnimatePresence>
          {completedChallenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* Global CSS for Wolf colors/gradient */}
      <style dangerouslySetInnerHTML={{ __html: `
        .wolf-brown-dark { color: #2d1810; }
        .wolf-brown-light { color: #8b7355; }
        .wolf-red { color: #b22d15; }
        .wolf-gold { color: #de8538; }
        .wolf-border { border-color: #e8d5c4; }
        .wolf-gradient { background: linear-gradient(135deg, #b22d15, #de8538); }
      ` }} />
    </div>
  );
}