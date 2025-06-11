import React from 'react';
import { Target, Flame, Calendar, TrendingUp } from 'lucide-react';
import { HabitWithStats } from '../types/habit';

interface StatsOverviewProps {
  habits: HabitWithStats[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ habits }) => {
  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => 
    habit.checkIns.some(checkIn => 
      checkIn.date === new Date().toISOString().split('T')[0] && checkIn.completed
    )
  ).length;
  
  const totalStreak = habits.reduce((sum, habit) => sum + habit.currentStreak, 0);
  const averageCompletion = habits.length > 0 
    ? Math.round(habits.reduce((sum, habit) => sum + habit.completionRate, 0) / habits.length)
    : 0;

  const stats = [
    {
      label: 'Active Habits',
      value: totalHabits,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Completed Today',
      value: completedToday,
      icon: Calendar,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      label: 'Total Streak Days',
      value: totalStreak,
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      label: 'Avg. Completion',
      value: `${averageCompletion}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <IconComponent size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};