import { useState, useCallback } from 'react';
import { Habit, CheckIn, HabitWithStats } from '../types/habit';
import { useLocalStorage } from './useLocalStorage';
import { formatDate } from '../utils/dateUtils';
import { getCurrentStreak, getLongestStreak, calculateStreaks } from '../utils/streakUtils';

export const useHabits = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', []);
  const [checkIns, setCheckIns] = useLocalStorage<CheckIn[]>('checkIns', []);
  const [loading, setLoading] = useState(false);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const createHabit = useCallback(async (name: string, description?: string): Promise<Habit> => {
    setLoading(true);
    
    const newHabit: Habit = {
      id: generateId(),
      name: name.trim(),
      description: description?.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setHabits(prev => [...prev, newHabit]);
    setLoading(false);
    
    return newHabit;
  }, [setHabits]);

  const updateHabit = useCallback(async (id: string, updates: Partial<Habit>): Promise<Habit | null> => {
    setLoading(true);
    
    const updatedHabits = habits.map(habit => 
      habit.id === id 
        ? { ...habit, ...updates, updated_at: new Date().toISOString() }
        : habit
    );
    
    const updatedHabit = updatedHabits.find(h => h.id === id);
    
    if (updatedHabit) {
      setHabits(updatedHabits);
    }
    
    setLoading(false);
    return updatedHabit || null;
  }, [habits, setHabits]);

  const deleteHabit = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    
    setHabits(prev => prev.filter(habit => habit.id !== id));
    setCheckIns(prev => prev.filter(checkIn => checkIn.habit_id !== id));
    
    setLoading(false);
    return true;
  }, [setHabits, setCheckIns]);

  const createCheckIn = useCallback(async (habitId: string, date?: string): Promise<CheckIn> => {
    const checkInDate = date || formatDate(new Date());
    const today = formatDate(new Date());
    
    if (checkInDate > today) {
      throw new Error('Cannot create check-in for future dates');
    }

    // Check if check-in already exists for this date
    const existingCheckIn = checkIns.find(
      checkIn => checkIn.habit_id === habitId && checkIn.date === checkInDate
    );

    if (existingCheckIn) {
      // Update existing check-in
      const updatedCheckIn = {
        ...existingCheckIn,
        completed: true,
        updated_at: new Date().toISOString()
      };

      setCheckIns(prev => 
        prev.map(checkIn => 
          checkIn.id === existingCheckIn.id ? updatedCheckIn : checkIn
        )
      );

      return updatedCheckIn;
    }

    // Create new check-in
    const newCheckIn: CheckIn = {
      id: generateId(),
      habit_id: habitId,
      date: checkInDate,
      completed: true,
      created_at: new Date().toISOString()
    };

    setCheckIns(prev => [...prev, newCheckIn]);
    return newCheckIn;
  }, [checkIns, setCheckIns]);

  const removeCheckIn = useCallback(async (habitId: string, date: string): Promise<boolean> => {
    setCheckIns(prev => 
      prev.filter(checkIn => 
        !(checkIn.habit_id === habitId && checkIn.date === date)
      )
    );
    return true;
  }, [setCheckIns]);

  const getHabitWithStats = useCallback((habitId: string): HabitWithStats | null => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return null;

    const habitCheckIns = checkIns.filter(checkIn => checkIn.habit_id === habitId);
    const completedCheckIns = habitCheckIns.filter(checkIn => checkIn.completed);
    
    const currentStreak = getCurrentStreak(completedCheckIns);
    const longestStreak = getLongestStreak(completedCheckIns);
    const totalCheckIns = completedCheckIns.length;
    
    // Calculate completion rate for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = formatDate(thirtyDaysAgo);
    
    const recentCheckIns = completedCheckIns.filter(
      checkIn => checkIn.date >= thirtyDaysAgoStr
    );
    
    const completionRate = recentCheckIns.length > 0 ? (recentCheckIns.length / 30) * 100 : 0;

    return {
      ...habit,
      checkIns: habitCheckIns,
      currentStreak,
      longestStreak,
      totalCheckIns,
      completionRate: Math.round(completionRate)
    };
  }, [habits, checkIns]);

  const getAllHabitsWithStats = useCallback((): HabitWithStats[] => {
    return habits.map(habit => getHabitWithStats(habit.id)).filter(Boolean) as HabitWithStats[];
  }, [habits, getHabitWithStats]);

  const getHabitStreaks = useCallback((habitId: string) => {
    const habitCheckIns = checkIns.filter(
      checkIn => checkIn.habit_id === habitId && checkIn.completed
    );
    return calculateStreaks(habitCheckIns);
  }, [checkIns]);

  const isHabitCheckedToday = useCallback((habitId: string): boolean => {
    const today = formatDate(new Date());
    return checkIns.some(
      checkIn => 
        checkIn.habit_id === habitId && 
        checkIn.date === today && 
        checkIn.completed
    );
  }, [checkIns]);

  return {
    habits,
    checkIns,
    loading,
    createHabit,
    updateHabit,
    deleteHabit,
    createCheckIn,
    removeCheckIn,
    getHabitWithStats,
    getAllHabitsWithStats,
    getHabitStreaks,
    isHabitCheckedToday
  };
};