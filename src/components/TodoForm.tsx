'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/types';
import { FaPlus, FaFlag } from 'react-icons/fa';

interface TodoFormProps {
  onSubmit: (title: string, description: string, priority: Todo['priority'], deadline?: string) => void;
  initialData?: Todo;
  onCancel?: () => void;
}

export default function TodoForm({ onSubmit, initialData, onCancel }: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Todo['priority']>(initialData?.priority || 'Medium');
  const [deadline, setDeadline] = useState(initialData?.deadline || '');
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(!!initialData);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setPriority(initialData.priority);
      setDeadline(initialData.deadline || '');
      setIsExpanded(true);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (title.length > 60) {
      setError('Title must be less than 60 characters');
      return;
    }

    if (description && description.length > 200) {
      setError('Description must be less than 200 characters');
      return;
    }

    onSubmit(title.trim(), description.trim(), priority, deadline);

    if (!initialData) {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDeadline('');
      setIsExpanded(false);
    }
  };

  const getPriorityColor = (p: Todo['priority']) => {
    switch (p) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className={`bg-white rounded-lg drive-shadow transition-all duration-200 ${isExpanded ? 'p-6' : 'p-4'}`}>
        {!isExpanded ? (
          <div
            onClick={() => setIsExpanded(true)}
            className="flex items-center text-[var(--drive-text)] cursor-pointer hover:bg-[var(--drive-hover)] rounded-lg p-2 -m-2"
          >
            <FaPlus className="w-5 h-5 mr-3 text-[var(--drive-blue)]" />
            <span className="text-sm">Add a task</span>
          </div>
        ) : (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="drive-input mb-4"
              autoFocus
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details"
              rows={3}
              className="drive-input mb-4 resize-none"
            />
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Todo['priority'])}
                    className="drive-input pr-10 appearance-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <FaFlag className={`absolute right-3 top-1/2 -translate-y-1/2 ${getPriorityColor(priority)}`} />
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="drive-input"
                />
              </div>
            </div>
            {error && (
              <p className="text-red-600 text-sm mb-4" role="alert">
                {error}
              </p>
            )}
            <div className="flex justify-end space-x-3">
              {onCancel ? (
                <button
                  type="button"
                  onClick={onCancel}
                  className="drive-button drive-button-secondary"
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="drive-button drive-button-secondary"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="drive-button drive-button-primary"
              >
                {initialData ? 'Save' : 'Add task'}
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
