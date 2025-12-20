/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TaskDto = {
    /**
     * Unique identifier of the task
     */
    id: string;
    /**
     * Title of the task
     */
    title: string;
    /**
     * Detailed description of the task
     */
    description: string;
    /**
     * Priority level of the task
     */
    priority: TaskDto.priority;
    /**
     * Current status of the task
     */
    status: TaskDto.status;
    /**
     * Due date for the task in ISO 8601 format
     */
    dueDate: string;
    /**
     * Timestamp when the task was created
     */
    createdAt: string;
    /**
     * Timestamp when the task was last updated
     */
    updatedAt: string;
};
export namespace TaskDto {
    /**
     * Priority level of the task
     */
    export enum priority {
        LOW = 'low',
        MEDIUM = 'medium',
        HIGH = 'high',
    }
    /**
     * Current status of the task
     */
    export enum status {
        PENDING = 'pending',
        IN_PROGRESS = 'in-progress',
        COMPLETED = 'completed',
    }
}

