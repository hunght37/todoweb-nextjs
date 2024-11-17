'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TaskTemplate } from '../types/Task';

interface TemplateContextType {
  templates: TaskTemplate[];
  addTemplate: (template: Omit<TaskTemplate, 'id'>) => void;
  updateTemplate: (id: string, template: Partial<TaskTemplate>) => void;
  deleteTemplate: (id: string) => void;
  getTemplate: (id: string) => TaskTemplate | undefined;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

const defaultTemplates: TaskTemplate[] = [
  {
    id: '1',
    name: 'Quick Task',
    description: 'A simple task with basic details',
    categories: ['general'],
    priority: 'medium',
    estimatedTime: 30,
  },
  {
    id: '2',
    name: 'Detailed Project',
    description: 'A comprehensive project template with multiple categories',
    categories: ['project', 'work'],
    priority: 'high',
    estimatedTime: 480,
  },
];

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [templates, setTemplates] = useState<TaskTemplate[]>(defaultTemplates);

  useEffect(() => {
    const savedTemplates = localStorage.getItem('taskTemplates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  const addTemplate = (template: Omit<TaskTemplate, 'id'>) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
    };
    setTemplates(prev => {
      const updated = [...prev, newTemplate];
      localStorage.setItem('taskTemplates', JSON.stringify(updated));
      return updated;
    });
  };

  const updateTemplate = (id: string, template: Partial<TaskTemplate>) => {
    setTemplates(prev => {
      const updated = prev.map(t => 
        t.id === id ? { ...t, ...template } : t
      );
      localStorage.setItem('taskTemplates', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => {
      const updated = prev.filter(t => t.id !== id);
      localStorage.setItem('taskTemplates', JSON.stringify(updated));
      return updated;
    });
  };

  const getTemplate = (id: string) => {
    return templates.find(t => t.id === id);
  };

  return (
    <TemplateContext.Provider
      value={{
        templates,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        getTemplate,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
}
