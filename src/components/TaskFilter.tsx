'use client';

import React from 'react';
import { useTask } from '../context/TaskContext';
import { TaskStatus } from '../types/Task';

export default function TaskFilter() {
  const { selectedStatus, setSelectedStatus } = useTask();

  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'all', label: 'All Tasks' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex items-center space-x-4 mb-6">
      <span className="text-gray-700 dark:text-gray-300">Filter:</span>
      <div className="flex space-x-2">
        {statusOptions.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSelectedStatus(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${selectedStatus === value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
