'use client';

import React from 'react';

interface WolfRankBadgeProps {
  rank: string;
}

export const WolfRankBadge: React.FC<WolfRankBadgeProps> = ({ rank }) => {
  return (
    <div className="inline-block p-2 bg-wolf-red rounded-full shadow-md">
      <span className="text-white text-xs font-bold uppercase">{rank} Rank</span>
    </div>
  );
};