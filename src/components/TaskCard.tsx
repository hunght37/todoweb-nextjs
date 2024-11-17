'use client';

import { Task } from '@/types/Task';
import { useTask } from '@/context/TaskContext';
import CategoryTag from './CategoryTag';
import ProgressBar from './ProgressBar';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { categories, updateTask, deleteTask } = useTask();

  const taskCategories = categories.filter(cat => 
    task.categories.includes(cat.id)
  );

  const toggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const updateProgress = (newProgress: number) => {
    updateTask(task.id, { progress: newProgress });
  };

  return (
    <div className="task-card">
      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
          className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <h3 className={`flex-1 text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-gray-400 hover:text-red-500"
          aria-label="Delete task"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {taskCategories.map(category => (
          <CategoryTag
            key={category.id}
            name={category.name}
            color={category.color}
          />
        ))}
      </div>

      <div className="space-y-2">
        <ProgressBar progress={task.progress} />
        <input
          type="range"
          min="0"
          max="100"
          value={task.progress}
          onChange={(e) => updateProgress(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
    </div>
  );
}
