import React from 'react';

export default function HabitCard({ habit, onPress }: any) {
  return (
    <button
      onClick={onPress}
      className={`bg-white p-4 rounded-xl shadow-md border-2 ${habit.completed_today ? 'border-[#4CAF50]' : 'border-wolf-border'} text-center`}
    >
      <div className="font-semibold text-wolf-brown-dark">{habit.title}</div>
      <div className="text-xs text-wolf-brown-light">{habit.xp_reward} XP</div>
    </button>
  );
}
