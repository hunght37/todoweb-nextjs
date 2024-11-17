'use client';

import React from 'react';
import { Task, Priority } from '../types/Task';
import { useTask } from '../context/TaskContext';
import CategoryTag from './CategoryTag';
import ProgressBar from './ProgressBar';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask } = useTask();

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value);
    updateTask(task.id, { ...task, progress: newProgress });
  };

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTask(task.id, { ...task, completed: e.target.checked });
  };

  const priorityColors = {
    low: 'text-green-600 dark:text-green-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    high: 'text-red-600 dark:text-red-400'
  };

  return (
    <div className="drive-shadow bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleCompletedChange}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
              {task.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${priorityColors[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {task.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            {task.description}
          </p>
        )}

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {task.categories.map((category) => (
              <CategoryTag key={category} category={category} />
            ))}
          </div>

          {task.deadline && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {new Date(task.deadline).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <ProgressBar progress={task.progress} />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {task.progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
