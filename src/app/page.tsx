'use client';

import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskStatistics from '../components/TaskStatistics';
import TaskFilter from '../components/TaskFilter';
import TodoForm from '../components/TodoForm';
import { Task } from '../types/Task';

export default function Home() {
  const { addTask, getFilteredTasks } = useTask();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    addTask(taskData);
    setIsFormOpen(false);
  };

  const tasks = getFilteredTasks();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your tasks and stay organized
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-primary)]"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Task
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Task Filter */}
            <TaskFilter />

            {/* Task List */}
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Get started by creating a new task
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-primary)]"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      New Task
                    </button>
                  </div>
                </div>
              ) : (
                tasks.map((task) => <TaskCard key={task.id} task={task} />)
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TaskStatistics />
          </div>
        </div>
      </div>

      {/* New Task Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">New Task</h2>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <TodoForm onSubmit={handleAddTask} onCancel={() => setIsFormOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
