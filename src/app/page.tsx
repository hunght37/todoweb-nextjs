'use client';

import { useState } from 'react';
import { useTask } from '@/context/TaskContext';
import { useTheme } from '@/context/ThemeContext';
import TaskCard from '@/components/TaskCard';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const { tasks, templates, categories, addTask } = useTask();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const template = templates.find(t => t.id === selectedTemplate);
    
    addTask({
      title: newTaskTitle,
      completed: false,
      categories: template ? template.categories : selectedCategories,
      progress: 0,
    });

    setNewTaskTitle('');
    setSelectedTemplate('');
    setSelectedCategories([]);
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <main className="min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Todo App</h1>
          <ThemeToggle />
        </div>

        <form onSubmit={handleAddTask} className="mb-8 space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add Task
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={`category-tag ${
                  selectedCategories.includes(category.id)
                    ? 'ring-2 ring-offset-2 ring-primary-500'
                    : ''
                }`}
                style={{
                  backgroundColor: `${category.color}20`,
                  color: category.color,
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {templates.length > 0 && (
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Select a template...</option>
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.title}
                </option>
              ))}
            </select>
          )}
        </form>

        <div className="space-y-4">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </main>
  );
}
