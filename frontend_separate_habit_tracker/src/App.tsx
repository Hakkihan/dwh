import { useState } from 'react';
import { Plus, Target, BarChart3 } from 'lucide-react';
import { useHabits } from './hooks/useHabits';
import { HabitCard } from './components/HabitCard';
import { CreateHabitModal } from './components/CreateHabitModal';
import { StatsOverview } from './components/StatsOverview';
import { HabitStreaks } from './components/HabitStreaks';

function App() {
  const {
    createHabit,
    deleteHabit,
    createCheckIn,
    removeCheckIn,
    getAllHabitsWithStats,
    getHabitStreaks,
    isHabitCheckedToday
  } = useHabits();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedHabitForStreaks, setSelectedHabitForStreaks] = useState<string | null>(null);

  const habits = getAllHabitsWithStats();

  const handleCreateHabit = async (name: string, description?: string) => {
    await createHabit(name, description);
  };

  const handleToggleCheckIn = async (habitId: string) => {
    const isChecked = isHabitCheckedToday(habitId);
    
    if (isChecked) {
      await removeCheckIn(habitId, new Date().toISOString().split('T')[0]);
    } else {
      await createCheckIn(habitId);
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    await deleteHabit(habitId);
    if (selectedHabitForStreaks === habitId) {
      setSelectedHabitForStreaks(null);
    }
  };

  const selectedHabit = selectedHabitForStreaks 
    ? habits.find(h => h.id === selectedHabitForStreaks)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Target className="text-emerald-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Habit Tracker</h1>
                <p className="text-gray-600">Build lasting habits, one day at a time</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-sm"
            >
              <Plus size={18} />
              <span>New Habit</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <StatsOverview habits={habits} />

        {/* Habits Grid */}
        {habits.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 max-w-md mx-auto">
              <Target className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No habits yet</h3>
              <p className="text-gray-600 mb-4">
                Start your journey by creating your first habit
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 mx-auto px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                <Plus size={18} />
                <span>Create Your First Habit</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {habits.map((habit) => (
              <div key={habit.id} className="relative">
                <HabitCard
                  habit={habit}
                  onToggleCheckIn={handleToggleCheckIn}
                  onDelete={handleDeleteHabit}
                  isCheckedToday={isHabitCheckedToday(habit.id)}
                />
                <button
                  onClick={() => setSelectedHabitForStreaks(
                    selectedHabitForStreaks === habit.id ? null : habit.id
                  )}
                  className="absolute top-4 right-12 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  title="View streaks"
                >
                  <BarChart3 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Streak Details */}
        {selectedHabit && (
          <HabitStreaks
            streaks={getHabitStreaks(selectedHabit.id)}
            habitName={selectedHabit.name}
          />
        )}
      </main>

      {/* Create Habit Modal */}
      <CreateHabitModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateHabit={handleCreateHabit}
      />
    </div>
  );
}

export default App;