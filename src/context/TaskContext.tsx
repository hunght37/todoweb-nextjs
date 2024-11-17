'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskTemplate, Priority, TaskStatus, TaskStatistics, Category } from '../types/Task';

interface TaskContextType {
  tasks: Task[];
  templates: TaskTemplate[];
  categories: Category[];
  selectedStatus: TaskStatus;
  statistics: TaskStatistics;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addTemplate: (template: Omit<TaskTemplate, 'id'>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  setSelectedStatus: (status: TaskStatus) => void;
  getFilteredTasks: () => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const defaultCategories: Category[] = [
  { id: '1', name: 'Work', color: '#FF5733' },
  { id: '2', name: 'Personal', color: '#33FF57' },
  { id: '3', name: 'Shopping', color: '#3357FF' },
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [templates, setTemplates] = useState<TaskTemplate[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('all');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    const savedTemplates = localStorage.getItem('taskTemplates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('taskTemplates', JSON.stringify(templates));
  }, [tasks, templates]);

  const calculateStatistics = (): TaskStatistics => {
    const completed = tasks.filter(task => task.completed).length;
    const active = tasks.length - completed;

    const byPriority = {
      high: tasks.filter(task => task.priority === 'high').length,
      medium: tasks.filter(task => task.priority === 'medium').length,
      low: tasks.filter(task => task.priority === 'low').length,
    };

    const byCategory = tasks.reduce((acc, task) => {
      task.categories.forEach(cat => {
        acc[cat] = (acc[cat] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return {
      total: tasks.length,
      completed,
      active,
      byPriority,
      byCategory,
    };
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
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

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      if (selectedStatus === 'all') return true;
      if (selectedStatus === 'completed') return task.completed;
      return !task.completed;
    });
  };

  const value = {
    tasks,
    templates,
    categories,
    selectedStatus,
    statistics: calculateStatistics(),
    addTask,
    updateTask,
    deleteTask,
    addTemplate,
    addCategory,
    setSelectedStatus,
    getFilteredTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}
