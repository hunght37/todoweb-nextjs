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
  priority: Priority;
  completed: boolean;
  progress: number;
  categories: string[];
  deadline?: Date;
  estimatedTime?: number;
  createdAt: Date;
  updatedAt: Date;
  template?: string; // template id if created from template
  subtasks?: SubTask[];
  order?: number;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
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
  completionRate: number;
  upcomingDeadlines: number;
}
