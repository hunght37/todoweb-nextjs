'use client';

import React from 'react';
import { useTask } from '../context/TaskContext';
import { Priority, TaskStatus } from '../types/Task';

export default function TaskFilter() {
  const { selectedStatus, setSelectedStatus, categories } = useTask();

  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'all', label: 'All Tasks' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  const priorityOptions: { value: Priority; label: string; color: string }[] = [
    { value: 'high', label: 'High Priority', color: 'text-red-500' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-500' },
    { value: 'low', label: 'Low Priority', color: 'text-green-500' }
  ];

  return (
    <div className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div>
        <h3 className="text-sm font-medium text-[var(--theme-text)] mb-3">Filter by Status</h3>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSelectedStatus(value)}
              className={`
                px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200
                ${selectedStatus === value
                  ? 'bg-[var(--theme-primary)] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-[var(--theme-text)] mb-3">Filter by Priority</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {priorityOptions.map(({ value, label, color }) => (
            <button
              key={value}
              onClick={() => {/* TODO: Implement priority filter */}}
              className={`
                px-3 py-2 rounded-md text-sm font-medium border transition-colors duration-200
                border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700
                flex items-center justify-center gap-2
              `}
            >
              <span className={color}>●</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-[var(--theme-text)] mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {/* TODO: Implement category filter */}}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200
                  bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                  hover:bg-gray-200 dark:hover:bg-gray-600
                  flex items-center gap-2
                `}
                style={{ 
                  backgroundColor: `${category.color}20`,
                  color: category.color 
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
