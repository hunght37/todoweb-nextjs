export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  categories: string[];
  progress: number; // 0-100
  template?: boolean;
}

export interface TaskTemplate {
  id: string;
  title: string;
  categories: string[];
  isTemplate: true;
}

export type Category = {
  id: string;
  name: string;
  color: string;
};
