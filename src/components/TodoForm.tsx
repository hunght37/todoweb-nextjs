'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaFlag } from 'react-icons/fa';
import { Task, Priority } from '../types/Task';

interface TodoFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Task;
  onCancel?: () => void;
}

export default function TodoForm({ onSubmit, initialData, onCancel }: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority || 'medium');
  const [deadline, setDeadline] = useState(initialData?.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '');
  const [categories, setCategories] = useState<string[]>(initialData?.categories || []);
  const [estimatedTime, setEstimatedTime] = useState<number | undefined>(initialData?.estimatedTime);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(!!initialData);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setPriority(initialData.priority);
      setDeadline(initialData.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '');
      setCategories(initialData.categories);
      setEstimatedTime(initialData.estimatedTime);
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

    const newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
      progress: 0,
      categories,
      deadline: deadline ? new Date(deadline) : undefined,
      estimatedTime,
    };

    onSubmit(newTask);

    if (!initialData) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDeadline('');
      setCategories([]);
      setEstimatedTime(undefined);
      setIsExpanded(false);
    }
  };

  const getPriorityColor = (p: Priority): string => {
    switch (p) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className={`bg-white dark:bg-gray-800 rounded-lg drive-shadow transition-all duration-200 ${isExpanded ? 'p-6' : 'p-4'}`}>
        {!isExpanded ? (
          <div
            onClick={() => setIsExpanded(true)}
            className="flex items-center text-[var(--theme-text)] cursor-pointer hover:bg-[var(--theme-hover)] rounded-lg p-2 -m-2"
          >
            <FaPlus className="w-5 h-5 mr-3 text-[var(--theme-primary)]" />
            <span className="text-sm">Add a task</span>
          </div>
        ) : (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
              autoFocus
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4 resize-none"
            />
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-[var(--theme-text)] mb-1">Priority</label>
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <FaFlag className={`absolute right-3 top-3 ${getPriorityColor(priority)}`} />
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-[var(--theme-text)] mb-1">Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-[var(--theme-text)] mb-1">Estimated Time (hours)</label>
                <input
                  type="number"
                  value={estimatedTime || ''}
                  onChange={(e) => setEstimatedTime(e.target.value ? Number(e.target.value) : undefined)}
                  min="0"
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end space-x-2">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-primary)] dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--theme-primary)] rounded-md hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-primary)]"
              >
                {initialData ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
