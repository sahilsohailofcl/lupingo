// @ts-nocheck
'use client'; 

import React from 'react';
// 1. Use lightweight web implementations of shared UI components
import WolfRankBadge from './components/web-ui/WolfRankBadge';
import StreakDisplay from './components/web-ui/StreakDisplay';
import HabitCard from './components/web-ui/HabitCard';
import ChallengeCard from './components/web-ui/ChallengeCard';

import { apiClient } from '@foclupus/utils/apiClient'; 
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Sparkles, Zap, Leaf, Target, RefreshCw, ChevronRight, Brain, TrendingUp, Flame } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@foclupus/utils';

export default function HomePage() {
  
  const queryClient = useQueryClient(); // Add useQueryClient
  
  const { data: userProfile, isLoading: isProfileLoading, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => apiClient.entities.UserProfile.list('-created_date', 1).then(data => data[0]), 
  });

  const { data: habits = [], isLoading: isHabitsLoading } = useQuery({
    queryKey: ['dailyHabits'],
    queryFn: () => apiClient.entities.Habit.list(),
  });
  
  // Mock function for habit completion (needed for HabitCard)
  const handleHabitCompletion = async (habitId: string) => {
    console.log(`Toggling habit ${habitId}`);
    // Implement API call here to update habit status and XP
    // For now, just trigger refetch to simulate state change
    await refetch();
    queryClient.invalidateQueries({ queryKey: ['dailyHabits'] });
  };
  
  // MOCK DATA for other entities (Challenges, Metrics)
  const challenges = [
      { id: 'c1', title: '30 min Deep Focus', xp_reward: 10, current_progress: 20, target_value: 30, completion_status: 'in_progress' as const },
      { id: 'c2', title: 'Finish 1 Detox Lesson', xp_reward: 0, current_progress: 1, target_value: 1, completion_status: 'complete' as const },
      { id: 'c3', title: 'Read 10 mins', xp_reward: 10, current_progress: 0, target_value: 10, completion_status: 'pending' as const },
  ];
  const screenTimeSaved = userProfile?.screen_time_saved || '2h 15m'; 

  if (isProfileLoading) {
    return <div className="text-center py-10 text-[#8b7355]">Loading your wolf profile...</div>;
  }
  
  if (!userProfile) {
    return (
      <div className="text-center py-10 p-4">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Profile Not Found</h2>
        <p className="text-[#8b7355] mb-6">It looks like your profile didn't load.</p>
      </div>
    );
  }

  const xpForNextLevel = 100 + (userProfile.level * 50);
  const xpProgress = Math.min(userProfile.xp, xpForNextLevel);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        {/* ----------------- */}
        {/* Welcome & Stats */}
        {/* ----------------- */}
        <section className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-wolf-brown-dark">Welcome back, {userProfile.wolf_name}!</h1>
              <p className="text-wolf-brown-light">Day {userProfile.current_streak} streak. Keep going!</p>
            </div>
            {/* 2. Use Shared WolfRankBadge */}
            <WolfRankBadge rank={userProfile.wolf_rank} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 3. Use Shared StreakDisplay */}
            <StreakDisplay streak={userProfile.current_streak} longestStreak={userProfile.longest_streak} />
          
          <div className="bg-white p-4 rounded-xl shadow-md border border-wolf-border flex flex-col items-center">
            <Sparkles className="w-6 h-6 text-wolf-gold mb-1" />
            <p className="text-2xl font-bold text-wolf-red">{userProfile.xp}</p>
            <p className="text-sm text-wolf-brown-light">Total XP</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-wolf-border flex flex-col items-center">
            <Target className="w-6 h-6 text-[#4a90e2] mb-1" />
            <p className="text-2xl font-bold text-wolf-brown-dark">{userProfile.level}</p>
            <p className="text-sm text-wolf-brown-light">Level</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-wolf-border flex flex-col items-center">
            <Leaf className="w-6 h-6 text-[#4CAF50] mb-1" />
            <p className="text-lg font-bold text-wolf-brown-dark">{screenTimeSaved}</p>
            <p className="text-sm text-wolf-brown-light">Screen Time Saved</p>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="bg-white p-4 rounded-xl shadow-md border border-wolf-border">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-wolf-brown-dark">Level {userProfile.level} Progress</p>
            <p className="text-sm text-wolf-brown-light">{xpProgress} / {xpForNextLevel} XP</p>
          </div>
          <div className="h-2 bg-[#f0e4d7] rounded-full overflow-hidden">
            <div
              className="h-full wolf-gradient-bar rounded-full"
              style={{ width: `${(xpProgress / xpForNextLevel) * 100}%` }}
            />
          </div>
        </div>
      </section>

      {/* ----------------- */}
      {/* Daily Challenges */}
      {/* ----------------- */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-wolf-brown-dark">Daily Challenges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} /> 
          ))}
        </div>
      </section>

      {/* ----------------- */}
      {/* Today's Habits */}
      {/* ----------------- */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-wolf-brown-dark">Today's Habits</h2>
            <Link href={createPageUrl('Habits')} className="text-sm text-wolf-red hover:text-wolf-gold flex items-center">
                All Habits <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {habits.slice(0, 4).map(habit => (
            /* 5. Use Shared HabitCard with simulated onPress handler */
            <HabitCard 
              key={habit.id} 
              habit={habit} 
              onPress={() => handleHabitCompletion(habit.id)}
            /> 
          ))}
        </div>
      </section>
      
      {/* ----------------- */}
      {/* Quick Access */}
      {/* ----------------- */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-wolf-brown-dark">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Note: Keeping these as Next.js Links with Tailwind classes for layout consistency */}
          <Link href={createPageUrl('FocusMode')} className="bg-[#f0f6ff] p-5 rounded-xl border border-[#d2e3f5] text-center transition hover:shadow-lg">
            <Zap className="w-8 h-8 text-[#4a90e2] mx-auto mb-2" />
            <p className="font-semibold text-wolf-brown-dark">Start Focus</p>
          </Link>
          <Link href={createPageUrl('Mindfulness')} className="bg-[#f2fcf2] p-5 rounded-xl border border-[#d2f5d2] text-center transition hover:shadow-lg">
            <Flame className="w-8 h-8 text-[#4CAF50] mx-auto mb-2" />
            <p className="font-semibold text-wolf-brown-dark">Mindfulness</p>
          </Link>
          <Link href={createPageUrl('DetoxPath')} className="bg-[#fff7f0] p-5 rounded-xl border border-[#f5e3d2] text-center transition hover:shadow-lg">
            <Brain className="w-8 h-8 text-wolf-gold mx-auto mb-2" />
            <p className="font-semibold text-wolf-brown-dark">Detox Lesson</p>
          </Link>
          <Link href={createPageUrl('Progress')} className="bg-[#f5f0ff] p-5 rounded-xl border border-[#d9d2f5] text-center transition hover:shadow-lg">
            <TrendingUp className="w-8 h-8 text-[#9b59b6] mx-auto mb-2" />
            <p className="font-semibold text-wolf-brown-dark">View Progress</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
// 6. Removed all placeholder components from the bottom of this file.