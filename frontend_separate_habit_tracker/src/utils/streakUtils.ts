import { CheckIn, Streak } from '../types/habit';
import { formatDate, getDaysDifference } from './dateUtils';

export const calculateStreaks = (checkIns: CheckIn[]): Streak[] => {
  if (checkIns.length === 0) return [];
  
  // Sort check-ins by date
  const sortedCheckIns = checkIns
    .filter(checkIn => checkIn.completed)
    .sort((a, b) => a.date.localeCompare(b.date));
  
  if (sortedCheckIns.length === 0) return [];
  
  const streaks: Streak[] = [];
  let currentStreak: { first: string; last: string } | null = null;
  
  for (let i = 0; i < sortedCheckIns.length; i++) {
    const currentDate = sortedCheckIns[i].date;
    
    if (currentStreak === null) {
      // Start new streak
      currentStreak = { first: currentDate, last: currentDate };
    } else {
      const daysDiff = getDaysDifference(currentStreak.last, currentDate);
      
      if (daysDiff === 1) {
        // Continue streak
        currentStreak.last = currentDate;
      } else {
        // End current streak and start new one
        const days = getDaysDifference(currentStreak.first, currentStreak.last) + 1;
        streaks.push({
          first: currentStreak.first,
          last: currentStreak.last,
          days
        });
        currentStreak = { first: currentDate, last: currentDate };
      }
    }
  }
  
  // Add the last streak
  if (currentStreak) {
    const days = getDaysDifference(currentStreak.first, currentStreak.last) + 1;
    streaks.push({
      first: currentStreak.first,
      last: currentStreak.last,
      days
    });
  }
  
  return streaks;
};

export const getCurrentStreak = (checkIns: CheckIn[]): number => {
  const streaks = calculateStreaks(checkIns);
  if (streaks.length === 0) return 0;
  
  const lastStreak = streaks[streaks.length - 1];
  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
  
  // Check if the last streak continues until today or yesterday
  if (lastStreak.last === today || lastStreak.last === yesterday) {
    return lastStreak.days;
  }
  
  return 0;
};

export const getLongestStreak = (checkIns: CheckIn[]): number => {
  const streaks = calculateStreaks(checkIns);
  return streaks.length > 0 ? Math.max(...streaks.map(s => s.days)) : 0;
};