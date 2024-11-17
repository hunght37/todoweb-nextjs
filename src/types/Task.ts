export type Priority = 'high' | 'medium' | 'low';

export type TaskStatus = 'all' | 'active' | 'completed';

export type TaskTemplate = {
  id: string;
  name: string;
  description?: string;
  categories: string[];
  priority: Priority;
  estimatedTime?: number;
};

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  progress: number;
  priority: Priority;
  categories: string[];
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
  template?: string; // template id if created from template
  estimatedTime?: number;
}

export type Category = {
  id: string;
  name: string;
  color: string;
};

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
