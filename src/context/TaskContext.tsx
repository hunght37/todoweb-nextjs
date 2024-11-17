'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, TaskTemplate, Category } from '@/types/Task';

interface TaskContextType {
  tasks: Task[];
  templates: TaskTemplate[];
  categories: Category[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addTemplate: (template: Omit<TaskTemplate, 'id'>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const defaultCategories: Category[] = [
  { id: '1', name: 'Work', color: '#0ea5e9' },
  { id: '2', name: 'Personal', color: '#22c55e' },
  { id: '3', name: 'Shopping', color: '#f59e0b' },
];

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [templates, setTemplates] = useState<TaskTemplate[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedTemplates = localStorage.getItem('templates');
    const savedCategories = localStorage.getItem('categories');

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedTemplates) setTemplates(JSON.parse(savedTemplates));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('templates', JSON.stringify(templates));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [tasks, templates, categories]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const addTemplate = (templateData: Omit<TaskTemplate, 'id'>) => {
    const newTemplate: TaskTemplate = {
      ...templateData,
      id: Date.now().toString(),
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      templates,
      categories,
      addTask,
      updateTask,
      deleteTask,
      addTemplate,
      addCategory,
      deleteCategory,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}
