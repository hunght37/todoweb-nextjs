'use client';

import React from 'react';
import { useTask } from '../context/TaskContext';
import { Task, Priority, TaskStatistics as TaskStatsType } from '../types/Task';

export default function TaskStatistics() {
  const { tasks } = useTask();

  const stats = React.useMemo<TaskStatsType>(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const active = total - completed;

    const byPriority = {
      high: tasks.filter((task) => task.priority === 'high').length,
      medium: tasks.filter((task) => task.priority === 'medium').length,
      low: tasks.filter((task) => task.priority === 'low').length,
    };

    const byCategory = tasks.reduce((acc, task) => {
      task.categories.forEach(cat => {
        acc[cat] = (acc[cat] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const upcomingDeadlines = tasks.filter((task) => {
      if (!task.deadline || task.completed) return false;
      const deadline = new Date(task.deadline);
      const today = new Date();
      const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0;
    }).length;

    return {
      total,
      completed,
      active,
      byPriority,
      byCategory,
      completionRate,
      upcomingDeadlines,
    };
  }, [tasks]);

  const getPriorityColor = (priority: Priority): string => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  if (!tasks) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg drive-shadow p-4">
        <p className="text-center text-[var(--theme-text)]">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg drive-shadow p-4">
      <h2 className="text-lg font-semibold text-[var(--theme-text)] mb-4">Task Statistics</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--theme-text)]">Completion Rate</span>
          <div className="flex items-center">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--theme-primary)] transition-all"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
            <span className="ml-2 text-sm text-[var(--theme-text)]">{stats.completionRate}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-[var(--theme-background)] rounded-lg">
            <div className="text-2xl font-bold text-[var(--theme-primary)]">{stats.active}</div>
            <div className="text-sm text-[var(--theme-text)]">Active Tasks</div>
          </div>
          <div className="text-center p-3 bg-[var(--theme-background)] rounded-lg">
            <div className="text-2xl font-bold text-[var(--theme-secondary)]">{stats.completed}</div>
            <div className="text-sm text-[var(--theme-text)]">Completed</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-[var(--theme-text)]">Priority Distribution</h3>
          <div className="space-y-1">
            {Object.entries(stats.byPriority).map(([priority, count]) => (
              <div key={priority} className="flex justify-between items-center">
                <span className={`text-sm capitalize ${getPriorityColor(priority as Priority)}`}>
                  {priority}
                </span>
                <span className="text-sm font-medium text-[var(--theme-text)]">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {stats.upcomingDeadlines > 0 && (
          <div className="p-3 bg-[var(--theme-background)] rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--theme-accent)]">
                {stats.upcomingDeadlines}
              </div>
              <div className="text-sm text-[var(--theme-text)]">Upcoming Deadlines</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
