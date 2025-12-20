import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  Button,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useTask } from '../hooks';
import { Task } from '../types';
import {
  PRIORITY_LABELS,
  PRIORITY_COLORS,
  STATUS_LABELS,
  STATUS_COLORS,
  formatDate,
  formatDateTime,
  isOverdue,
} from '../utils';

interface TaskDetailPageProps {
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskDetailPage: React.FC<TaskDetailPageProps> = ({
  onEditTask,
  onDeleteTask,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { task, isLoading } = useTask(id || '');

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    if (task) onEditTask(task);
  };

  const handleDelete = () => {
    if (task) {
      onDeleteTask(task.id);
      navigate('/tasks');
    }
  };

  if (isLoading) {
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

  if (!task) {
    return (
      <Box>
        <Typography variant="h5" color="text.secondary">
          Task not found
        </Typography>
      </Box>
    );
  }

  const overdueStatus = isOverdue(task.dueDate) && task.status !== 'completed';

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }}>
          Task Details
        </Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Stack>

      <Paper
        sx={{
          p: 4,
          borderLeft: overdueStatus ? '4px solid' : 'none',
          borderLeftColor: overdueStatus ? 'error.main' : 'transparent',
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {task.title}
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <Chip
                label={PRIORITY_LABELS[task.priority]}
                color={PRIORITY_COLORS[task.priority]}
                size="small"
              />
              <Chip
                label={STATUS_LABELS[task.status]}
                color={STATUS_COLORS[task.status]}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {task.description}
            </Typography>
          </Box>

          <Divider />

          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon color={overdueStatus ? 'error' : 'action'} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Due Date
                </Typography>
                <Typography
                  variant="body1"
                  color={overdueStatus ? 'error' : 'text.primary'}
                  fontWeight={overdueStatus ? 'bold' : 'normal'}
                >
                  {formatDate(task.dueDate)}
                  {overdueStatus && ' (Overdue)'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimeIcon color="action" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Created
                </Typography>
                <Typography variant="body1">
                  {formatDateTime(task.createdAt)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimeIcon color="action" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Updated
                </Typography>
                <Typography variant="body1">
                  {formatDateTime(task.updatedAt)}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
