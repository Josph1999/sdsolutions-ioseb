import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Box,
  Stack,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { Task } from '../../types';
import {
  PRIORITY_LABELS,
  PRIORITY_COLORS,
  STATUS_LABELS,
  STATUS_COLORS,
  formatDate,
  formatRelativeTime,
  isOverdue,
} from '../../utils';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onClick?: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onClick,
}) => {
  const handleCardClick = () => {
    if (onClick) onClick(task);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit(task);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete(task.id);
  };

  const overdueStatus = isOverdue(task.dueDate) && task.status !== 'completed';

  return (
    <Card
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderLeft: overdueStatus ? '4px solid' : 'none',
        borderLeftColor: overdueStatus ? 'error.main' : 'transparent',
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              {task.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {task.description}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TimeIcon fontSize="small" color={overdueStatus ? 'error' : 'action'} />
            <Typography
              variant="caption"
              color={overdueStatus ? 'error' : 'text.secondary'}
            >
              {formatDate(task.dueDate)}
              {' • '}
              {formatRelativeTime(task.dueDate)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <IconButton
          size="small"
          color="primary"
          onClick={handleEdit}
          aria-label="edit task"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={handleDelete}
          aria-label="delete task"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};
