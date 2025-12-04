import React from 'react';

export default function WolfRankBadge({ rank }: { rank: number }) {
  return (
    <div className="bg-white p-2 rounded-full shadow-sm border border-wolf-border flex items-center justify-center">
      <span className="text-sm font-semibold text-wolf-brown-dark">Wolf Rank {rank}</span>
    </div>
  );
}
