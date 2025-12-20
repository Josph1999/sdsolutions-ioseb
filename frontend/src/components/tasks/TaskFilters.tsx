import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Box,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { TaskDto } from "../../api/generated";
import { TaskFilters as TaskFiltersType } from "../../types";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFilterChange: (filters: TaskFiltersType) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [searchInput, setSearchInput] = useState(filters.search || "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({
        ...filters,
        search: searchInput,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      status:
        e.target.value === "all"
          ? undefined
          : (e.target.value as TaskDto.status),
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      priority:
        e.target.value === "all"
          ? undefined
          : (e.target.value as TaskDto.priority),
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            placeholder="Search tasks..."
            value={searchInput}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3, sm: 6 }}>
          <TextField
            fullWidth
            select
            label="Status"
            value={filters.status || "all"}
            onChange={handleStatusChange}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value={TaskDto.status.PENDING}>Pending</MenuItem>
            <MenuItem value={TaskDto.status.IN_PROGRESS}>In Progress</MenuItem>
            <MenuItem value={TaskDto.status.COMPLETED}>Completed</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 3, sm: 6 }}>
          <TextField
            fullWidth
            select
            label="Priority"
            value={filters.priority || "all"}
            onChange={handlePriorityChange}
          >
            <MenuItem value="all">All Priorities</MenuItem>
            <MenuItem value={TaskDto.priority.LOW}>Low</MenuItem>
            <MenuItem value={TaskDto.priority.MEDIUM}>Medium</MenuItem>
            <MenuItem value={TaskDto.priority.HIGH}>High</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
};
