'use client'; 

import React from 'react';
import Link from 'next/link';
import { 
  WolfRankBadge, 
  StreakDisplay, 
  HabitCard, 
  ChallengeCard,
  Card, 
  WolfButton 
} from '@foclupus/ui'; 

import { apiClient } from '@foclupus/utils/apiClient';
import { UserProfile, Habit, Challenge } from '@foclupus/types'; 
import { createPageUrl } from '@foclupus/utils';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  Sparkles, 
  Zap, 
  Leaf, 
  Target, 
  ChevronRight, 
  Brain, 
  TrendingUp, 
  Flame,
  Clock,
  Shield
} from 'lucide-react';

const MOCK_CHALLENGES: Challenge[] = [
  { id: 'c1', title: 'Morning Focus Sprint', xp_reward: 15, current_progress: 0, target_value: 10, completion_status: 'in_progress' },
  { id: 'c2', title: 'Screen-Free Hour', xp_reward: 20, current_progress: 0, target_value: 60, completion_status: 'pending' },
  { id: 'c3', title: 'Complete 3 Habits', xp_reward: 25, current_progress: 0, target_value: 3, completion_status: 'pending' },
];

export default function AppHome() {
  const queryClient = useQueryClient();
  
  const { data: userProfile, isLoading: isProfileLoading, refetch } = useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: () => apiClient.entities.UserProfile.list('-created_date', 1).then(data => data[0]), 
  });

  const { data: habits = [], isLoading: isHabitsLoading } = useQuery<Habit[]>({
    queryKey: ['dailyHabits'],
    queryFn: () => apiClient.entities.Habit.list(),
  });
  
  const handleHabitCompletion = async (habitId: string) => {
    await apiClient.entities.Habit.update(habitId, { completed_today: true });
    await refetch();
    queryClient.invalidateQueries({ queryKey: ['dailyHabits'] });
  };
  
  const screenTimeSaved = userProfile?.screen_time_saved || '2h 15m'; 

  if (isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf4]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-wolf-gold/20 rounded-full mb-4"></div>
          <div className="text-wolf-brown-light font-medium">Summoning the pack...</div>
        </div>
      </div>
    );
  }
  
  if (!userProfile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#fffaf4] text-center">
        <h2 className="text-3xl font-extrabold text-wolf-brown-dark mb-2">Profile Missing?</h2>
        <p className="text-wolf-brown-light mb-8 max-w-md">It seems your wolf profile got lost in the woods. Let's get you set up.</p>
        <Link href={createPageUrl('Onboarding')}>
          <WolfButton size="lg" className="wolf-gradient shadow-xl">Create Profile</WolfButton>
        </Link>
      </div>
    );
  }

  const xpForNextLevel = 100 + (userProfile.level * 50);
  const xpProgress = Math.min(userProfile.xp, xpForNextLevel);
  const progressPercent = (xpProgress / xpForNextLevel) * 100;

  return (
    <div className="min-h-screen bg-[#fffaf4] pb-20">
      
      {/* --- HERO HEADER --- */}
      <div className="bg-white border-b border-[#e8d5c4] px-4 pt-8 pb-6 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-wolf-brown-dark">
                Welcome back, {userProfile.wolf_name}! 🐺
              </h1>
              <p className="text-wolf-brown-light text-sm">Ready to lead the pack today?</p>
            </div>
            {/* User Avatar / Profile Link could go here */}
          </div>

          {/* Stats Bar (Pill-shaped containers) */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            
            {/* Streak Pill */}
            <div className="flex items-center bg-orange-50 border border-orange-100 rounded-full px-4 py-2 shadow-sm min-w-fit">
              <Flame className="w-5 h-5 text-orange-500 mr-2 fill-orange-500" />
              <div>
                <span className="font-bold text-wolf-brown-dark text-lg">{userProfile.current_streak}</span>
                <span className="text-xs text-wolf-brown-light ml-1 font-semibold uppercase">Day Streak</span>
              </div>
            </div>

            {/* Rank Pill */}
            <div className="flex items-center bg-yellow-50 border border-yellow-100 rounded-full px-4 py-2 shadow-sm min-w-fit">
              <Shield className="w-5 h-5 text-yellow-600 mr-2 fill-yellow-100" />
              <div>
                <span className="font-bold text-wolf-brown-dark text-lg capitalize">{userProfile.wolf_rank}</span>
                <span className="text-xs text-wolf-brown-light ml-1 font-semibold uppercase">Rank</span>
              </div>
            </div>

            {/* XP Pill */}
            <div className="flex items-center bg-blue-50 border border-blue-100 rounded-full px-4 py-2 shadow-sm min-w-fit flex-grow">
              <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
              <div className="flex-1">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-bold text-blue-700">Level {userProfile.level}</span>
                  <span className="text-[10px] text-blue-400 font-bold">{xpProgress}/{xpForNextLevel} XP</span>
                </div>
                <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        
        {/* --- START YOUR DAY (Action Cards) --- */}
        <section>
          <h2 className="text-xl font-extrabold text-wolf-brown-dark mb-4">Start Your Day</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <Link href={createPageUrl('FocusMode')}>
              <Card className="p-6 h-full border-2 border-transparent hover:border-orange-200 transition-all hover:shadow-lg group cursor-pointer bg-white">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg text-wolf-brown-dark mb-1">Focus Mode</h3>
                <p className="text-sm text-wolf-brown-light">Start a timed focus session to build discipline.</p>
              </Card>
            </Link>

            <Link href={createPageUrl('DetoxPath')}>
              <Card className="p-6 h-full border-2 border-transparent hover:border-purple-200 transition-all hover:shadow-lg group cursor-pointer bg-white">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg text-wolf-brown-dark mb-1">Detox Path</h3>
                <p className="text-sm text-wolf-brown-light">Continue your lessons to reclaim your attention.</p>
              </Card>
            </Link>

            <Link href={createPageUrl('Mindfulness')}>
              <Card className="p-6 h-full border-2 border-transparent hover:border-blue-200 transition-all hover:shadow-lg group cursor-pointer bg-white">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-wolf-brown-dark mb-1">Mindfulness</h3>
                <p className="text-sm text-wolf-brown-light">Quick clarity check-in to reset your mind.</p>
              </Card>
            </Link>

          </div>
        </section>

        {/* --- TODAY'S CHALLENGES --- */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-row justify-center items-center gap-2">
              <h2 className="text-xl font-extrabold text-wolf-brown-dark">Today's Challenges</h2>
              <span className="text-sm font-semibold text-wolf-gold bg-orange-50 px-3 py-1 rounded-full">
                {MOCK_CHALLENGES.length} Active
              </span>
            </div>            
            <Link href={createPageUrl('Challenges')} className="text-sm font-bold text-wolf-red hover:text-wolf-gold flex items-center transition-colors">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_CHALLENGES.map(challenge => (
              // Custom styled challenge row
              <div key={challenge.id} className="bg-white rounded-2xl p-4 border-2 border-[#f0e4d7] flex items-center justify-between shadow-sm">
                <div className="flex-1">
                  <h4 className="font-bold text-wolf-brown-dark">{challenge.title}</h4>
                  <div className="mt-2 w-full bg-gray-100 h-2 rounded-full overflow-hidden max-w-[200px]">
                    <div className="bg-wolf-gold h-full rounded-full" style={{ width: '0%' }} />
                  </div>
                  <p className="text-xs text-wolf-brown-light mt-1">0 / {challenge.target_value}</p>
                </div>
                <div className="flex flex-col items-end pl-4">
                  <span className="font-bold text-wolf-red text-sm">+{challenge.xp_reward} XP</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- HEALTHY HABITS --- */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-extrabold text-wolf-brown-dark">Healthy Habits</h2>
            <Link href={createPageUrl('Habits')} className="text-sm font-bold text-wolf-red hover:text-wolf-gold flex items-center transition-colors">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {habits.slice(0, 4).map(habit => (
              <HabitCard 
                key={habit.id} 
                habit={habit} 
                onPress={() => handleHabitCompletion(habit.id)}
                // Assuming HabitCard accepts a variant prop for this new look, or styled internally
              /> 
            ))}
          </div>
        </section>

        {/* --- PROMO BANNER --- */}
        {!userProfile.is_premium && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#b22d15] to-[#de8538] p-8 shadow-lg text-white">
            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold mb-2">Unlock Your Full Potential 🚀</h3>
              <p className="mb-6 opacity-90 max-w-lg">Get unlimited focus sessions, advanced insights, and exclusive content to accelerate your growth.</p>
              <WolfButton className="bg-white text-wolf-red hover:bg-gray-100 border-0 font-bold px-8">
                Start Free Trial
              </WolfButton>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" />
            <div className="absolute bottom-0 right-20 -mb-16 w-32 h-32 rounded-full bg-white opacity-10" />
          </div>
        )}

      </div>
    </div>
  );
}