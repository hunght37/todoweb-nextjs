'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Task, TaskTemplate, Priority, TaskStatus, TaskStatistics, Category, SubTask } from '../types/Task';

interface TaskContextType {
  tasks: Task[];
  templates: TaskTemplate[];
  categories: Category[];
  selectedStatus: TaskStatus;
  isLoading: boolean;
  statistics: TaskStatistics;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addTemplate: (template: Omit<TaskTemplate, 'id'>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  setSelectedStatus: (status: TaskStatus) => void;
  getFilteredTasks: () => Task[];
  addSubTask: (taskId: string, title: string) => void;
  updateSubTask: (taskId: string, subTaskId: string, completed: boolean) => void;
  deleteSubTask: (taskId: string, subTaskId: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
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
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      setIsLoading(true);
      const savedTasks = localStorage.getItem('tasks');
      const savedTemplates = localStorage.getItem('taskTemplates');
      const savedCategories = localStorage.getItem('categories');

      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        // Convert string dates back to Date objects
        const tasksWithDates = parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          deadline: task.deadline ? new Date(task.deadline) : undefined,
        }));
        setTasks(tasksWithDates);
      }

      if (savedTemplates) {
        setTemplates(JSON.parse(savedTemplates));
      }

      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      localStorage.setItem('taskTemplates', JSON.stringify(templates));
      localStorage.setItem('categories', JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [tasks, templates, categories]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      updatedAt: now,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const addTemplate = (templateData: Omit<TaskTemplate, 'id'>) => {
    const newTemplate: TaskTemplate = {
      ...templateData,
      id: `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: `category-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const addSubTask = (taskId: string, title: string) => {
    const now = new Date();
    const newSubTask: SubTask = {
      id: `subtask-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      completed: false,
      createdAt: now,
    };

    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            subtasks: [...(task.subtasks || []), newSubTask],
            updatedAt: now 
          }
        : task
    ));
  };

  const updateSubTask = (taskId: string, subTaskId: string, completed: boolean) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            subtasks: task.subtasks?.map(subtask =>
              subtask.id === subTaskId 
                ? { ...subtask, completed }
                : subtask
            ),
            updatedAt: new Date()
          }
        : task
    ));
  };

  const deleteSubTask = (taskId: string, subTaskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            subtasks: task.subtasks?.filter(subtask => subtask.id !== subTaskId),
            updatedAt: new Date()
          }
        : task
    ));
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    setTasks(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      
      // Update order for all tasks
      return result.map((task, index) => ({
        ...task,
        order: index,
        updatedAt: new Date()
      }));
    });
  };

  const calculateStatistics = useCallback(() => {
    const completed = tasks.filter(task => task.completed).length;
    const active = tasks.length - completed;
    const total = tasks.length;

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

  const getFilteredTasks = useCallback(() => {
    return tasks.filter(task => {
      switch (selectedStatus) {
        case 'active':
          return !task.completed;
        case 'completed':
          return task.completed;
        default:
          return true;
      }
    });
  }, [tasks, selectedStatus]);

  const value = {
    tasks,
    templates,
    categories,
    selectedStatus,
    isLoading,
    statistics: calculateStatistics(),
    addTask,
    updateTask,
    deleteTask,
    addTemplate,
    addCategory,
    setSelectedStatus,
    getFilteredTasks,
    addSubTask,
    updateSubTask,
    deleteSubTask,
    reorderTasks,
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
