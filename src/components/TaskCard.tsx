'use client';

import React from 'react';
import { Task, Priority } from '../types/Task';
import { useTask } from '../context/TaskContext';
import CategoryTag from './CategoryTag';
import ProgressBar from './ProgressBar';

const priorityColors = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask } = useTask();

  const handleToggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTask(task.id, { progress: parseInt(e.target.value) });
  };

  const handlePriorityChange = (priority: Priority) => {
    updateTask(task.id, { priority });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="mt-1 form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <div>
            <h3 className={`text-lg font-semibold ${
              task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>
            )}
          </div>
        </div>

        <button
          onClick={() => deleteTask(task.id)}
          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <select
            value={task.priority}
            onChange={(e) => handlePriorityChange(e.target.value as Priority)}
            className="text-sm rounded-full px-3 py-1 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <span className={`text-sm rounded-full px-3 py-1 ${priorityColors[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>

        {task.deadline && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Deadline:</span>
            <span className={`text-sm font-medium ${
              isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {formatDate(task.deadline)}
              {isOverdue && ' (Overdue)'}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {task.categories.map((category) => (
            <CategoryTag key={category} category={category} />
          ))}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <ProgressBar
            progress={task.progress}
            onChange={handleProgressChange}
          />
        </div>
      </div>
    </div>
  );
}
