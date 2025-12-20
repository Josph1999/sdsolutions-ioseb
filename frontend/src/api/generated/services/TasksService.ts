/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskDto } from '../models/CreateTaskDto';
import type { TaskDto } from '../models/TaskDto';
import type { UpdateTaskDto } from '../models/UpdateTaskDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TasksService {
    /**
     * Create a new task
     * @param requestBody
     * @returns TaskDto The task has been successfully created.
     * @throws ApiError
     */
    public static tasksControllerCreate(
        requestBody: CreateTaskDto,
    ): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tasks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request.`,
            },
        });
    }
    /**
     * Get all tasks with optional filters
     * @param title Search by task title
     * @param status Filter by task status
     * @param priority Filter by task priority
     * @returns TaskDto Return all tasks matching the search criteria.
     * @throws ApiError
     */
    public static tasksControllerFindAll(
        title?: string,
        status?: 'pending' | 'in-progress' | 'completed',
        priority?: 'low' | 'medium' | 'high',
    ): CancelablePromise<Array<TaskDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tasks',
            query: {
                'title': title,
                'status': status,
                'priority': priority,
            },
        });
    }
    /**
     * Get a task by id
     * @param id Task ID
     * @returns TaskDto Return the task.
     * @throws ApiError
     */
    public static tasksControllerFindOne(
        id: string,
    ): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Task not found.`,
            },
        });
    }
    /**
     * Update a task
     * @param id Task ID
     * @param requestBody
     * @returns TaskDto The task has been successfully updated.
     * @throws ApiError
     */
    public static tasksControllerUpdate(
        id: string,
        requestBody: UpdateTaskDto,
    ): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/tasks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request.`,
                404: `Task not found.`,
            },
        });
    }
    /**
     * Delete a task
     * @param id Task ID
     * @returns any The task has been successfully deleted.
     * @throws ApiError
     */
    public static tasksControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Task not found.`,
            },
        });
    }
}
