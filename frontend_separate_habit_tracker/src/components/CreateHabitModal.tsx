import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateHabit: (name: string, description?: string) => Promise<void>;
}

export const CreateHabitModal: React.FC<CreateHabitModalProps> = ({
  isOpen,
  onClose,
  onCreateHabit
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreateHabit(name.trim(), description.trim() || undefined);
      setName('');
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Error creating habit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setName('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" data-testid="create-habit-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Create New Habit</h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="habit-name" className="block text-sm font-medium text-gray-700 mb-2">
              Habit Name *
            </label>
            <input
              id="habit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Drink 2L of water"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              maxLength={100}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="habit-description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              id="habit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any additional details about this habit..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 resize-none"
              rows={3}
              maxLength={200}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Plus size={16} />
              )}
              <span>{isSubmitting ? 'Creating...' : 'Create Habit'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};