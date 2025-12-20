import React, { useState } from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onTaskClick?: (task: Task) => void;
  onReorderTasks?: (taskIds: string[]) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading = false,
  onEditTask,
  onDeleteTask,
  onTaskClick,
  onReorderTasks,
}) => {
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  React.useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = localTasks.findIndex((task) => task.id === active.id);
      const newIndex = localTasks.findIndex((task) => task.id === over.id);

      const newTasks = arrayMove(localTasks, oldIndex, newIndex);
      setLocalTasks(newTasks);

      const taskIds = newTasks.map((task) => task.id);

      if (onReorderTasks) {
        onReorderTasks(taskIds);
      }
    }
  };
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

  if (localTasks.length === 0) {
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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={localTasks.map((task) => task.id)}
        strategy={rectSortingStrategy}
      >
        <Grid container spacing={3}>
          {localTasks.map((task) => (
            <Grid size={{xs: 12, sm: 6, md: 4}} key={task.id}>
              <TaskCard
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onClick={onTaskClick}
              />
            </Grid>
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};
