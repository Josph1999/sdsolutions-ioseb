import React from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import { TaskCard } from './TaskCard';
import { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onTaskClick?: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading = false,
  onEditTask,
  onDeleteTask,
  onTaskClick,
}) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No tasks found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create a new task to get started
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {tasks.map((task) => (
        <Grid item xs={12} sm={6} md={4} key={task.id}>
          <TaskCard
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onClick={onTaskClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};
