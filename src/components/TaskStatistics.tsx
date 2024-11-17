'use client';

import React from 'react';
import { useTask } from '../context/TaskContext';

export default function TaskStatistics() {
  const { statistics } = useTask();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Task Statistics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-200">Total Tasks</p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-100">{statistics.total}</p>
        </div>
        
        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-200">Completed</p>
          <p className="text-2xl font-bold text-green-700 dark:text-green-100">{statistics.completed}</p>
        </div>
        
        <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
          <p className="text-sm text-yellow-600 dark:text-yellow-200">Active</p>
          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-100">{statistics.active}</p>
        </div>
        
        <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
          <p className="text-sm text-purple-600 dark:text-purple-200">Completion Rate</p>
          <p className="text-2xl font-bold text-purple-700 dark:text-purple-100">
            {statistics.total > 0 ? Math.round((statistics.completed / statistics.total) * 100) : 0}%
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">By Priority</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded">
            <p className="text-sm text-red-600 dark:text-red-200">High</p>
            <p className="font-semibold text-red-700 dark:text-red-100">{statistics.byPriority.high}</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/30 p-2 rounded">
            <p className="text-sm text-orange-600 dark:text-orange-200">Medium</p>
            <p className="font-semibold text-orange-700 dark:text-orange-100">{statistics.byPriority.medium}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded">
            <p className="text-sm text-green-600 dark:text-green-200">Low</p>
            <p className="font-semibold text-green-700 dark:text-green-100">{statistics.byPriority.low}</p>
          </div>
        </div>
      </div>

      {Object.keys(statistics.byCategory).length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">By Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(statistics.byCategory).map(([category, count]) => (
              <div key={category} className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-200">{category}</p>
                <p className="font-semibold text-gray-700 dark:text-gray-100">{count}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
