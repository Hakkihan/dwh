import React from 'react';
import { CheckCircle2, Circle, Flame, Calendar, TrendingUp, Trash2 } from 'lucide-react';
import { HabitWithStats } from '../types/habit';

interface HabitCardProps {
  habit: HabitWithStats;
  onToggleCheckIn: (habitId: string) => void;
  onDelete: (habitId: string) => void;
  isCheckedToday: boolean;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggleCheckIn,
  onDelete,
  isCheckedToday
}) => {
  const handleCheckIn = () => {
    onToggleCheckIn(habit.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${habit.name}"?`)) {
      onDelete(habit.id);
    }
  };

  return (
    <div data-testid="habit-card" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{habit.name}</h3>
          {habit.description && (
            <p className="text-sm text-gray-600">{habit.description}</p>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
          title="Delete habit"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleCheckIn}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isCheckedToday
              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
          }`}
        >
          {isCheckedToday ? (
            <CheckCircle2 size={18} className="text-emerald-600" />
          ) : (
            <Circle size={18} />
          )}
          <span>{isCheckedToday ? 'Completed Today' : 'Mark Complete'}</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
            <Flame size={16} />
            <span className="text-lg font-bold">{habit.currentStreak}</span>
          </div>
          <p className="text-xs text-gray-500">Current Streak</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
            <Calendar size={16} />
            <span className="text-lg font-bold">{habit.totalCheckIns}</span>
          </div>
          <p className="text-xs text-gray-500">Total Days</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
            <TrendingUp size={16} />
            <span className="text-lg font-bold">{habit.completionRate}%</span>
          </div>
          <p className="text-xs text-gray-500">30-day Rate</p>
        </div>
      </div>
    </div>
  );
};