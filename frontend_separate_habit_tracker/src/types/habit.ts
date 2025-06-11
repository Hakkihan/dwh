export interface Habit {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CheckIn {
  id: string;
  habit_id: string;
  date: string;
  completed: boolean;
  created_at: string;
}

export interface Streak {
  first: string;
  last: string;
  days: number;
}

export interface HabitWithStats extends Habit {
  checkIns: CheckIn[];
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  completionRate: number;
}