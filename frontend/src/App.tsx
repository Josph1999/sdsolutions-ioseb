import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './theme/ThemeProvider';
import { MainLayout } from './components/layout';
import { TaskForm } from './components/tasks';
import { ConfirmDialog } from './components/common';
import { Dashboard, TaskDetailPage } from './pages';
import { Task, TaskFormData } from './types';
import { useTasks } from './hooks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const { createTask, updateTask, deleteTask, isCreating, isUpdating, isDeleting } = useTasks();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    taskId: string | null;
  }>({
    open: false,
    taskId: null,
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedTask(null);
  };

  const handleFormSubmit = async (data: TaskFormData) => {
    try {
      if (selectedTask) {
        await updateTask({ id: selectedTask.id, data });
        showSnackbar('Task updated successfully');
      } else {
        await createTask(data);
        showSnackbar('Task created successfully');
      }
      handleFormClose();
    } catch (error) {
      showSnackbar(
        `Failed to ${selectedTask ? 'update' : 'create'} task`,
        'error'
      );
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setConfirmDialog({ open: true, taskId });
  };

  const handleConfirmDelete = async () => {
    if (confirmDialog.taskId) {
      try {
        await deleteTask(confirmDialog.taskId);
        showSnackbar('Task deleted successfully');
        navigate('/')
      } catch (error) {
        showSnackbar('Failed to delete task', 'error');
      }
    }
    setConfirmDialog({ open: false, taskId: null });
  };

  const handleCancelDelete = () => {
    setConfirmDialog({ open: false, taskId: null });
  };

  const handleTaskClick = (task: Task) => {
    navigate(`/tasks/${task.id}`);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                onCreateTask={handleCreateTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onTaskClick={handleTaskClick}
              />
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <TaskDetailPage
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            }
          />
        </Routes>
      </MainLayout>

      <TaskForm
        open={formOpen}
        task={selectedTask}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        loading={isCreating || isUpdating}
      />

      <ConfirmDialog
        open={confirmDialog.open}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={isDeleting}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
