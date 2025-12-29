// packages/types/src/domain/index.ts

export interface UserProfile {
  id: string;
  wolf_name: string;
  xp: number;
  level: number;
  // Note: Using 'string' allows for the mock data 'hunter' which is lowercase
  wolf_rank: 'Pup' | 'Scout' | 'Hunter' | 'Alpha' | string;
  current_streak: number;
  longest_streak: number;
  is_premium: boolean;
  // 🔥 FIX: Added the missing property 🔥
  screen_time_saved: string;
}

export interface Habit {
  id: string;
  title: string;
  xp_reward: number;
  completed_today: boolean;
}

// Interfaces for other entities used in your screens
export interface DetoxLesson {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  is_complete: boolean;
  is_locked: boolean;
}

export type ChallengeCompletionStatus = 'pending' | 'in_progress' | 'complete';

export interface Challenge {
  id: string;
  title: string;
  xp_reward: number;
  current_progress: number;
  target_value: number;
  completion_status: ChallengeCompletionStatus;
}