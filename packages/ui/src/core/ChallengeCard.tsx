'use client';

import React from 'react';

interface Challenge {
    id: string;
    title: string;
    xp_reward: number;
    current_progress: number;
    target_value: number;
    completion_status: 'in_progress' | 'pending' | 'complete';
}

interface ChallengeCardProps {
    challenge: Challenge;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
    const progress = Math.min(100, (challenge.current_progress / challenge.target_value) * 100);
    const progressColor = challenge.completion_status === 'complete' ? 'bg-[#4CAF50]' : 'bg-wolf-gold';

    return (
        <div className="bg-white p-4 rounded-xl shadow-md border border-wolf-border space-y-2">
            <div className="font-semibold text-wolf-brown-dark">{challenge.title}</div>
            
            <div className="h-2 bg-[#f0e4d7] rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full ${progressColor} transition-all`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="text-xs text-wolf-brown-light">
                {challenge.xp_reward} XP reward
                {challenge.completion_status === 'complete' && ' - COMPLETED'}
            </div>
        </div>
    );
};