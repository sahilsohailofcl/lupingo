// packages/utils/src/apiClient.ts

// *** IMPORTANT: This is a placeholder for the Base44 functionality. ***
// All logic involving data creation, fetching, and authentication
// needs to be updated to use this client to call your new Next.js API routes.

// 🔥 IMPORT: Import the necessary types from the new file 🔥
import { UserProfile, Habit } from '@foclupus/types'; 

// Utility to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiClient = {
  auth: {
    me: async () => {
      await delay(100);
      // Mock authenticated user object for now
      return { id: 'user-123', email: 'test@wolfpack.com' };
    },
    logout: () => console.log('LOGOUT: User logged out.'),
    // You will replace redirectToLogin with NextAuth/Custom Auth logic
    redirectToLogin: () => console.log('REDIRECT: Redirecting to login...'),
  },
  
  entities: {
    // CRUD Operations for UserProfile
    UserProfile: {
      create: async (data: any) => {
        await delay(300);
        console.log('API CALL: UserProfile created:', data);
        return { id: `profile-${Date.now()}`, ...data };
      },
      update: async (id: string, data: any) => {
        await delay(300);
        console.log(`API CALL: UserProfile ${id} updated with:`, data);
        return { id, ...data };
      },
      // 🔥 FIX: Added return type and applied UserProfile type to mock data 🔥
      list: async (orderBy: string, limit: number): Promise<UserProfile[]> => {
        await delay(500);
        // MOCK DATA: You'll replace this with TanStack Query calling your Next.js API
        const mockProfile: UserProfile = { 
          id: 'mock-alpha', 
          wolf_name: 'Mock Wolf', 
          xp: 150, 
          level: 12, 
          wolf_rank: 'hunter', 
          current_streak: 5, 
          longest_streak: 10,
          is_premium: false,
          screen_time_saved: '2h 15m', // <-- THE FIX
        };
        return [mockProfile]; 
      },
      // ... list, filter, etc. for all other entities (FocusSession, Habit, etc.)
    },
    // Add placeholders for other entities used in your code (Habit, DetoxLesson, etc.)
    Habit: {
      update: async (id: string, data: any) => {
        await delay(300);
        console.log(`API CALL: Habit ${id} updated.`, data);
      },
      // 🔥 FIX: Added return type of Habit[] 🔥
      list: async (): Promise<Habit[]> => { 
        await delay(300);
        return [{ id: 'h1', title: 'Read 20 min', xp_reward: 5, completed_today: false }];
      }
    },
    // DetoxLesson entity
    DetoxLesson: {
      create: async (data: any) => {
        await delay(300);
        console.log('API CALL: DetoxLesson created:', data);
        return { id: `lesson-${Date.now()}`, ...data };
      },
      update: async (id: string, data: any) => {
        await delay(300);
        console.log(`API CALL: DetoxLesson ${id} updated with:`, data);
        return { id, ...data };
      },
      list: async (): Promise<any[]> => {
        await delay(300);
        return [];
      },
    },
    // FocusSession entity
    FocusSession: {
      create: async (data: any) => {
        await delay(300);
        console.log('API CALL: FocusSession created:', data);
        return { id: `session-${Date.now()}`, ...data };
      },
      update: async (id: string, data: any) => {
        await delay(300);
        console.log(`API CALL: FocusSession ${id} updated with:`, data);
        return { id, ...data };
      },
      list: async (): Promise<any[]> => {
        await delay(300);
        return [];
      },
    },
    // ... Challenge, etc.
  }
};