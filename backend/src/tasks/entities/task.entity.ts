import { TaskPriority, TaskStatus } from '../enums';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}
