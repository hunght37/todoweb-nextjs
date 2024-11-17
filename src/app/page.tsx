'use client';

import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskStatistics from '../components/TaskStatistics';
import TaskFilter from '../components/TaskFilter';
import { Priority } from '../types/Task';

export default function Home() {
  const { addTask, getFilteredTasks } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [deadline, setDeadline] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      progress: 0,
      categories: selectedCategories,
      priority,
      deadline: deadline ? new Date(deadline) : undefined,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setDeadline('');
    setSelectedCategories([]);
  };

  const tasks = getFilteredTasks();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Todo App</h1>

        <TaskStatistics />

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description (optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={3}
                placeholder="Enter task description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Priority
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Deadline (optional)
                </label>
                <input
                  type="date"
                  id="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Task
            </button>
          </div>
        </form>

        <TaskFilter />

        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">No tasks found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
