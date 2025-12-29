'use client';

import React from 'react';
import { Target } from 'lucide-react';

interface Habit {
    id: string;
    title: string;
    xp_reward: number;
    completed_today: boolean;
}

interface HabitCardProps {
    habit: Habit;
    onPress: () => void; 
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onPress }) => {
    const borderColor = habit.completed_today ? 'border-[#4CAF50]' : 'border-wolf-border';

    return (
        <button
            onClick={onPress}
            className={`bg-white p-4 rounded-xl shadow-md border-2 ${borderColor} text-center transition hover:shadow-lg active:opacity-90 w-full`}
        >
            <Target className="w-6 h-6 text-wolf-brown-dark mx-auto mb-2" />
            <div className="font-semibold text-wolf-brown-dark text-base text-center">{habit.title}</div>
            <div className="text-xs text-wolf-brown-light text-center">{habit.xp_reward} XP</div>
        </button>
    );
};