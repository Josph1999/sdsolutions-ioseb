import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TasksService {
  private readonly dataPath = path.join(__dirname, '../../data/tasks.json');
  private tasks: TaskDto[] = [];

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    try {
      const dataDir = path.dirname(this.dataPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      if (fs.existsSync(this.dataPath)) {
        const data = fs.readFileSync(this.dataPath, 'utf-8');
        this.tasks = JSON.parse(data) as TaskDto[];
      } else {
        this.tasks = [];
        this.saveTasks();
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      this.tasks = [];
    }
  }

  private saveTasks(): void {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.tasks, null, 2));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  create(createTaskDto: CreateTaskDto): TaskDto {
    const maxOrder =
      this.tasks.length > 0
        ? Math.max(...this.tasks.map((t) => t.order || 0))
        : -1;

    const newTask: TaskDto = {
      id: Date.now().toString(),
      ...createTaskDto,
      order: maxOrder + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.push(newTask);
    this.saveTasks();
    return newTask;
  }

  findAll(searchTaskDto?: SearchTaskDto): TaskDto[] {
    let filteredTasks = this.tasks;

    if (searchTaskDto && Object.keys(searchTaskDto).length > 0) {
      filteredTasks = this.tasks.filter((task) => {
        // Filter by title (case-insensitive partial match)
        if (searchTaskDto.title) {
          const titleMatch = task.title
            .toLowerCase()
            .includes(searchTaskDto.title.toLowerCase());
          if (!titleMatch) {
            return false;
          }
        }

        if (searchTaskDto.status && task.status !== searchTaskDto.status) {
          return false;
        }

        if (
          searchTaskDto.priority &&
          task.priority !== searchTaskDto.priority
        ) {
          return false;
        }

        return true;
      });
    }

    return filteredTasks.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  findOne(id: string): TaskDto {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): TaskDto {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updateTaskDto,
      updatedAt: new Date().toISOString(),
    };

    this.saveTasks();
    return this.tasks[taskIndex];
  }

  remove(id: string): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.tasks.splice(taskIndex, 1);
    this.saveTasks();
  }

  reorder(taskIds: string[]): TaskDto[] {
    // Update the order of each task based on its position in taskIds
    taskIds.forEach((id, index) => {
      const taskIndex = this.tasks.findIndex((t) => t.id === id);
      if (taskIndex === -1) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      this.tasks[taskIndex] = {
        ...this.tasks[taskIndex],
        order: index,
        updatedAt: new Date().toISOString(),
      };
    });

    // Sort tasks by order
    this.tasks.sort((a, b) => (a.order || 0) - (b.order || 0));

    this.saveTasks();
    return this.tasks;
  }
}
