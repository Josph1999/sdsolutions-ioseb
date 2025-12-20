import React, { useMemo } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  PendingActions as PendingIcon,
  PlayArrow as InProgressIcon,
  CheckCircle as CompletedIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useTasks } from '../hooks';
import { TaskList } from '../components/tasks';
import { Task } from '../types';
import { TaskDto } from '../api/generated';

interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, count, icon, color }) => (
  <Card>
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            color: color,
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {count}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

interface DashboardProps {
  onCreateTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onTaskClick: (task: Task) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onCreateTask,
  onEditTask,
  onDeleteTask,
  onTaskClick,
}) => {
  const { tasks, isLoading } = useTasks();

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === TaskDto.status.PENDING).length,
      inProgress: tasks.filter((t) => t.status === TaskDto.status.IN_PROGRESS).length,
      completed: tasks.filter((t) => t.status === TaskDto.status.COMPLETED).length,
    };
  }, [tasks]);

  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  }, [tasks]);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Dashboard
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

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Tasks"
            count={stats.total}
            icon={<AssignmentIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Pending"
            count={stats.pending}
            icon={<PendingIcon />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="In Progress"
            count={stats.inProgress}
            icon={<InProgressIcon />}
            color="#0288d1"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Completed"
            count={stats.completed}
            icon={<CompletedIcon />}
            color="#2e7d32"
          />
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Recent Tasks
        </Typography>
        <TaskList
          tasks={recentTasks}
          loading={isLoading}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onTaskClick={onTaskClick}
        />
      </Paper>
    </Box>
  );
};
