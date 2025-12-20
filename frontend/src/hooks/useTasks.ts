import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TasksService } from '../api/services';
import { CreateTaskDto, UpdateTaskDto } from '../api/generated';
import { TaskFilters } from '../types';

export const useTasks = (filters?: TaskFilters) => {
  const queryClient = useQueryClient();

  // Convert enum values from TaskDto.status to the string literals expected by the API
  const convertStatus = (status?: string): 'pending' | 'in-progress' | 'completed' | undefined => {
    if (!status) return undefined;
    return status as 'pending' | 'in-progress' | 'completed';
  };

  const convertPriority = (priority?: string): 'low' | 'medium' | 'high' | undefined => {
    if (!priority) return undefined;
    return priority as 'low' | 'medium' | 'high';
  };

  const tasksQuery = useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => TasksService.tasksControllerFindAll(
      filters?.search,
      convertStatus(filters?.status),
      convertPriority(filters?.priority)
    ),
  });

  const createTaskMutation = useMutation({
    mutationFn: (data: CreateTaskDto) => TasksService.tasksControllerCreate(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDto }) =>
      TasksService.tasksControllerUpdate(id, data),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['tasks'] }),
        queryClient.invalidateQueries({ queryKey: ['tasks', variables.id] }),
      ]);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => TasksService.tasksControllerRemove(id),
    onSuccess: async (_, deletedId) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['tasks'] }),
        queryClient.invalidateQueries({ queryKey: ['tasks', deletedId] }),
      ]);
      queryClient.removeQueries({ queryKey: ['tasks', deletedId] });
    },
  });

  const reorderTasksMutation = useMutation({
    mutationFn: (taskIds: string[]) => {
      return TasksService.tasksControllerReorder({ taskIds });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('Reorder mutation failed:', error);
    },
  });

  return {
    tasks: tasksQuery.data || [],
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    error: tasksQuery.error,
    createTask: createTaskMutation.mutateAsync,
    updateTask: updateTaskMutation.mutateAsync,
    deleteTask: deleteTaskMutation.mutateAsync,
    reorderTasks: reorderTasksMutation.mutateAsync,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
    isReordering: reorderTasksMutation.isPending,
  };
};

export const useTask = (id: string) => {
  const taskQuery = useQuery({
    queryKey: ['tasks', id],
    queryFn: () => TasksService.tasksControllerFindOne(id),
    enabled: !!id,
  });

  return {
    task: taskQuery.data,
    isLoading: taskQuery.isLoading,
    isError: taskQuery.isError,
    error: taskQuery.error,
  };
};
