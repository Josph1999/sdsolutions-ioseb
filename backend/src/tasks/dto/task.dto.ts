import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../enums';

// Using DTO for tasks for frontend apiClient
export class TaskDto {
  @ApiProperty({
    description: 'Unique identifier of the task',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the task',
    example: 'Complete project documentation',
  })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Write comprehensive documentation for the API endpoints',
  })
  description: string;

  @ApiProperty({
    description: 'Priority level of the task',
    enum: TaskPriority,
    example: TaskPriority.HIGH,
  })
  priority: TaskPriority;

  @ApiProperty({
    description: 'Current status of the task',
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Due date for the task in ISO 8601 format',
    example: '2025-12-31T23:59:59.000Z',
  })
  dueDate: string;

  @ApiProperty({
    description: 'Order of the task for drag and drop sorting',
    example: 0,
  })
  order: number;

  @ApiProperty({
    description: 'Timestamp when the task was created',
    example: '2025-12-20T10:00:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Timestamp when the task was last updated',
    example: '2025-12-20T15:30:00.000Z',
  })
  updatedAt: string;
}
