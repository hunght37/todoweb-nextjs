export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}
