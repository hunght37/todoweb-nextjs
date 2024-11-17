export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  deadline?: Date;
  categories: string[];
  progress: number; // 0-100
  priority: Priority;
  template?: boolean;
}

export interface TaskTemplate {
  id: string;
  title: string;
  description?: string;
  categories: string[];
  priority: Priority;
  isTemplate: true;
}

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type TaskStatus = 'all' | 'active' | 'completed';

export interface TaskStatistics {
  total: number;
  completed: number;
  active: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
  byCategory: Record<string, number>;
}
