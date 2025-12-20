import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useTasks } from '../hooks';
import { TaskList, TaskFilters } from '../components/tasks';
import { Task, TaskFilters as TaskFiltersType } from '../types';

interface TasksPageProps {
  onCreateTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onTaskClick: (task: Task) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({
  onCreateTask,
  onEditTask,
  onDeleteTask,
  onTaskClick,
}) => {
  const [filters, setFilters] = useState<TaskFiltersType>({});
  const { tasks, isLoading } = useTasks(filters);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          All Tasks
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateTask}
          size="large"
        >
          New Task
        </Button>
      </Stack>

      <TaskFilters filters={filters} onFilterChange={setFilters} />

      <TaskList
        tasks={tasks}
        loading={isLoading}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        onTaskClick={onTaskClick}
      />
    </Box>
  );
};
