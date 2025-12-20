import { TaskDto } from '../api/generated';

export type Task = TaskDto;
export type TaskPriority = TaskDto.priority;
export type TaskStatus = TaskDto.status;

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
}
