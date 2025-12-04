import React from 'react';

export default function ChallengeCard({ challenge }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-wolf-border">
      <div className="font-semibold text-wolf-brown-dark">{challenge.title}</div>
      <div className="text-xs text-wolf-brown-light">{challenge.xp_reward} XP</div>
    </div>
  );
}
