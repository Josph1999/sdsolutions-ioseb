import { TaskDto } from '../api/generated';

export const PRIORITY_LABELS: Record<TaskDto.priority, string> = {
  [TaskDto.priority.LOW]: 'Low',
  [TaskDto.priority.MEDIUM]: 'Medium',
  [TaskDto.priority.HIGH]: 'High',
};

export const PRIORITY_COLORS: Record<TaskDto.priority, 'success' | 'warning' | 'error'> = {
  [TaskDto.priority.LOW]: 'success',
  [TaskDto.priority.MEDIUM]: 'warning',
  [TaskDto.priority.HIGH]: 'error',
};

export const STATUS_LABELS: Record<TaskDto.status, string> = {
  [TaskDto.status.PENDING]: 'Pending',
  [TaskDto.status.IN_PROGRESS]: 'In Progress',
  [TaskDto.status.COMPLETED]: 'Completed',
};

export const STATUS_COLORS: Record<TaskDto.status, 'default' | 'primary' | 'success'> = {
  [TaskDto.status.PENDING]: 'default',
  [TaskDto.status.IN_PROGRESS]: 'primary',
  [TaskDto.status.COMPLETED]: 'success',
};
