'use client';

import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskStatistics from '../components/TaskStatistics';
import TaskFilter from '../components/TaskFilter';
import TodoForm from '../components/TodoForm';
import { Task } from '../types/Task';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

export default function Home() {
  const { addTask, getFilteredTasks, reorderTasks } = useTask();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [groupBy, setGroupBy] = useState<'day' | 'week' | 'month' | null>(null);
  const [sortBy, setSortBy] = useState<'priority' | 'deadline' | 'created' | 'order'>('order');

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    addTask(taskData);
    setIsFormOpen(false);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  const tasks = getFilteredTasks();

  const groupTasks = (tasks: Task[]) => {
    if (!groupBy) return { 'All Tasks': tasks };

    const grouped: Record<string, Task[]> = {};
    const now = new Date();

    tasks.forEach(task => {
      let groupKey = 'No Date';
      
      if (task.deadline) {
        const deadline = new Date(task.deadline);
        
        if (groupBy === 'day') {
          groupKey = deadline.toLocaleDateString();
        } else if (groupBy === 'week') {
          const weekStart = new Date(deadline);
          weekStart.setDate(deadline.getDate() - deadline.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          groupKey = `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
        } else if (groupBy === 'month') {
          groupKey = deadline.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        }
      }

      grouped[groupKey] = [...(grouped[groupKey] || []), task];
    });

    return grouped;
  };

  const sortTasks = (tasks: Task[]) => {
    return [...tasks].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'deadline':
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return (a.order || 0) - (b.order || 0);
      }
    });
  };

  const groupedTasks = groupTasks(sortTasks(tasks));

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

            {/* Group and Sort Controls */}
            <div className="flex flex-wrap gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Group by
                </label>
                <select
                  value={groupBy || ''}
                  onChange={(e) => setGroupBy(e.target.value as any)}
                  className="block w-40 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">No Grouping</option>
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="block w-40 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="order">Custom Order</option>
                  <option value="priority">Priority</option>
                  <option value="deadline">Deadline</option>
                  <option value="created">Creation Date</option>
                </select>
              </div>
            </div>

            {/* Task List */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="space-y-4">
                {Object.entries(groupedTasks).map(([group, groupTasks]) => (
                  <div key={group} className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {group}
                    </h3>
                    <Droppable droppableId={group}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="space-y-4"
                        >
                          {groupTasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
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
