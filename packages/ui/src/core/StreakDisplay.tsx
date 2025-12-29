'use client';

import React from 'react';
import { Flame } from 'lucide-react';

interface StreakDisplayProps {
  streak: number;
  longestStreak: number;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ streak }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-wolf-border flex flex-col items-center">
      <Flame className="w-6 h-6 text-[#FF4500] mb-1" />
      <div className="text-2xl font-bold text-wolf-red">{streak}</div>
      <div className="text-sm text-wolf-brown-light">Daily Streak</div>
    </div>
  );
};