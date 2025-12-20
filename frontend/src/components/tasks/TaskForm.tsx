import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
import { Task, TaskFormData, TaskPriority, TaskStatus } from "../../types";
import { TaskDto } from "../../api/generated";

interface TaskFormProps {
  open: boolean;
  task?: Task | null;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  loading?: boolean;
}

const initialFormData: TaskFormData = {
  title: "",
  description: "",
  priority: TaskDto.priority.MEDIUM,
  status: TaskDto.status.PENDING,
  dueDate: new Date().toISOString().split("T")[0],
};

export const TaskForm: React.FC<TaskFormProps> = ({
  open,
  task,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState<TaskFormData>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof TaskFormData, string>>
  >({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate.split("T")[0],
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [task, open]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
      });
    }
  };

  const handleChange =
    (field: keyof TaskFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{task ? "Edit Task" : "Create New Task"}</DialogTitle>

        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={handleChange("title")}
                  error={!!errors.title}
                  helperText={errors.title}
                  disabled={loading}
                  autoFocus
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={handleChange("description")}
                  error={!!errors.description}
                  helperText={errors.description}
                  disabled={loading}
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  label="Priority"
                  value={formData.priority}
                  onChange={handleChange("priority")}
                  disabled={loading}
                >
                  <MenuItem value={TaskDto.priority.LOW}>Low</MenuItem>
                  <MenuItem value={TaskDto.priority.MEDIUM}>Medium</MenuItem>
                  <MenuItem value={TaskDto.priority.HIGH}>High</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={formData.status}
                  onChange={handleChange("status")}
                  disabled={loading}
                >
                  <MenuItem value={TaskDto.status.PENDING}>Pending</MenuItem>
                  <MenuItem value={TaskDto.status.IN_PROGRESS}>
                    In Progress
                  </MenuItem>
                  <MenuItem value={TaskDto.status.COMPLETED}>
                    Completed
                  </MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Due Date"
                  value={formData.dueDate}
                  onChange={handleChange("dueDate")}
                  error={!!errors.dueDate}
                  helperText={errors.dueDate}
                  disabled={loading}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? (task ? "Updating..." : "Creating...") : (task ? "Update" : "Create")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
