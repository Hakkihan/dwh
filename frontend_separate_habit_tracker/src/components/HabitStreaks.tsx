import React from 'react';
import { Calendar, Flame } from 'lucide-react';
import { Streak } from '../types/habit';

interface HabitStreaksProps {
  streaks: Streak[];
  habitName: string;
}

export const HabitStreaks: React.FC<HabitStreaksProps> = ({ streaks, habitName }) => {
  if (streaks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="text-orange-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">Streaks for {habitName}</h3>
        </div>
        <p className="text-gray-500">No streaks yet. Start checking in to build your first streak!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="text-orange-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-900">Streaks for {habitName}</h3>
      </div>
      
      <div className="space-y-3">
        {streaks.slice().reverse().map((streak, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar size={16} className="text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {streak.days} day{streak.days !== 1 ? 's' : ''}
                </p>
                <p className="text-sm text-gray-600">
                  {streak.first} to {streak.last}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-orange-600">
              <Flame size={16} />
              <span className="font-bold">{streak.days}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};