import React from 'react';

export default function StreakDisplay({ streak, longestStreak }: { streak: number; longestStreak: number }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-wolf-border text-center">
      <p className="text-xl font-bold text-wolf-brown-dark">{streak}</p>
      <p className="text-sm text-wolf-brown-light">Longest: {longestStreak}</p>
    </div>
  );
}
