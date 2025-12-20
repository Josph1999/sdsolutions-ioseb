/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateTaskDto = {
    /**
     * The title of the task
     */
    title?: string;
    /**
     * The description of the task
     */
    description?: string;
    /**
     * The priority level of the task
     */
    priority?: UpdateTaskDto.priority;
    /**
     * The current status of the task
     */
    status?: UpdateTaskDto.status;
    /**
     * The due date of the task
     */
    dueDate?: string;
};
export namespace UpdateTaskDto {
    /**
     * The priority level of the task
     */
    export enum priority {
        LOW = 'low',
        MEDIUM = 'medium',
        HIGH = 'high',
    }
    /**
     * The current status of the task
     */
    export enum status {
        PENDING = 'pending',
        IN_PROGRESS = 'in-progress',
        COMPLETED = 'completed',
    }
}

