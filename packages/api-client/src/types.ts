import { UserProfile, Habit, Challenge, DetoxLesson } from '@foclupus/types';

// API request/response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// Re-export domain types for convenience
export type { UserProfile, Habit, Challenge, DetoxLesson };