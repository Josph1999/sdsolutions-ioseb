# SDSolutions - TaskMaster

A modern, full-stack task management application built with NestJS backend and React frontend, featuring intuitive drag-and-drop functionality, advanced filtering, and a beautiful Material Design interface.

## Overview

TaskMaster is a comprehensive task management solution designed for productivity and ease of use. It provides a seamless experience for creating, organizing, and tracking tasks with real-time updates, visual feedback, and accessible design patterns.

## Key Features

### Task Management
- **Complete CRUD Operations** - Create, read, update, and delete tasks with validation
- **Smart Organization** - Organize tasks by priority (Low, Medium, High) and status (Pending, In Progress, Completed)
- **Due Date Tracking** - Set due dates with visual overdue indicators and relative time display
- **Detailed Task View** - Dedicated detail pages showing full task information with timestamps

### Drag-and-Drop Reordering
- **Intuitive Reordering** - Drag and drop tasks to reorganize them in your preferred order
- **Keyboard Accessible** - Full keyboard support for accessibility compliance
- **Persistent Order** - Task order is automatically saved to the backend
- **Smooth Animations** - Visual feedback during drag operations with smooth transitions

### Advanced Filtering & Search
- **Real-time Search** - Debounced search functionality for finding tasks by title
- **Multi-level Filtering** - Filter by status, priority, or both simultaneously
- **Smart Queries** - Backend-powered filtering with case-insensitive matching

### Dashboard Analytics
- **Task Statistics** - Visual overview of total, pending, in-progress, and completed tasks
- **Color-coded Cards** - Distinct visual indicators for different task states
- **At-a-glance Insights** - Quick understanding of your task workload

### User Experience
- **Light/Dark Theme** - Toggle between themes with persistent preferences
- **Responsive Design** - Mobile-first approach that works on all screen sizes
- **Loading States** - Clear feedback during async operations
- **Confirmation Dialogs** - Prevent accidental deletions with confirmation modals
- **Empty States** - Helpful messages when no tasks are present

## Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework with TypeScript
- **Swagger/OpenAPI** - Auto-generated API documentation and type definitions
- **Class Validator** - DTO validation with decorators
- **Express** - Fast, unopinionated web framework
- **JSON File Storage** - Lightweight data persistence

### Frontend
- **React 19** - Latest version with modern hooks and concurrent features
- **TypeScript** - Full type safety across the application
- **Vite** - Lightning-fast dev server and optimized builds
- **Material-UI (MUI) v7** - Comprehensive component library
- **TanStack Query v5** - Powerful data synchronization and caching
- **React Router v7** - Client-side routing with nested layouts
- **DnD Kit** - Accessible drag-and-drop primitives
- **Axios** - Promise-based HTTP client
- **date-fns** - Modern date utility library
- **Emotion** - Performant CSS-in-JS styling

### Development Tools
- **openapi-typescript-codegen** - Auto-generate TypeScript API clients from OpenAPI spec
- **concurrently** - Run multiple npm scripts simultaneously
- **wait-on** - Wait for backend to be ready before starting frontend

## Prerequisites

- **Node.js** v16 or higher (v18+ recommended)
- **npm** v7 or higher (comes with Node.js)

## Installation

Install all dependencies for the root, backend, and frontend with a single command:

```bash
npm run install:all
```

This will sequentially install dependencies in:
1. Root directory (concurrently, wait-on)
2. Backend directory (NestJS and dependencies)
3. Frontend directory (React and dependencies)

## Running the Application

### Development Mode (Recommended)

Start both backend and frontend servers concurrently:

```bash
npm run dev
```

This command will:
1. Start the NestJS backend server on `http://localhost:5000`
2. Wait for the backend API to be ready at `/api/docs-json`
3. Auto-generate TypeScript API client from OpenAPI schema
4. Start the Vite frontend dev server on `http://localhost:5173`

Both servers will run with hot-reload enabled. Changes to source files will automatically refresh.

### Running Backend Only

```bash
npm run dev:backend
```

- Backend API: `http://localhost:5000/api`
- Swagger Documentation: `http://localhost:5000/api/docs`
- OpenAPI JSON: `http://localhost:5000/api/docs-json`

### Running Frontend Only

```bash
npm run dev:frontend
```

- Frontend App: `http://localhost:5173`

**Important:** The frontend requires the backend to be running first because it generates TypeScript API clients from the backend's OpenAPI specification.

## Available Scripts

### Root Level Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both backend and frontend in development mode |
| `npm run dev:backend` | Start only the backend server |
| `npm run dev:frontend` | Start only the frontend server (requires backend running) |
| `npm run install:all` | Install dependencies for root, backend, and frontend |

### Backend Scripts

Navigate to `backend/` directory first:

| Script | Description |
|--------|-------------|
| `npm run start:dev` | Start backend in watch mode |
| `npm run build` | Build backend for production |
| `npm run start:prod` | Start production build |
| `npm run lint` | Lint backend code with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests with Jest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Run tests with coverage report |

### Frontend Scripts

Navigate to `frontend/` directory first:

| Script | Description |
|--------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build locally |
| `npm run generate:api` | Generate TypeScript API client from OpenAPI spec |

## Project Structure

```
sdsolutions-ioseb/
├── backend/                    # NestJS backend application
│   ├── src/
│   │   ├── main.ts            # Bootstrap with Swagger config
│   │   ├── app.module.ts      # Root module
│   │   └── tasks/             # Tasks feature module
│   │       ├── tasks.controller.ts   # API endpoints
│   │       ├── tasks.service.ts      # Business logic
│   │       ├── dto/           # Data transfer objects
│   │       ├── entities/      # Data models
│   │       └── enums/         # Task enums (priority, status)
│   ├── data/                  # JSON file storage
│   │   └── tasks.json        # Persisted tasks
│   └── package.json
│
├── frontend/                   # React frontend application
│   ├── src/
│   │   ├── main.tsx          # Entry point
│   │   ├── App.tsx           # Root component with routing
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.tsx        # Main dashboard
│   │   │   └── TaskDetailPage.tsx   # Task detail view
│   │   ├── components/       # Reusable components
│   │   │   ├── layout/       # Layout components (AppBar, MainLayout)
│   │   │   ├── tasks/        # Task components (TaskList, TaskCard, TaskForm)
│   │   │   └── common/       # Common components (ConfirmDialog)
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useTasks.ts   # Tasks data management hook
│   │   ├── api/              # API integration
│   │   │   ├── client.ts     # Axios configuration
│   │   │   ├── services/     # API service functions
│   │   │   └── generated/    # Auto-generated from OpenAPI
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Utility functions (date formatting, constants)
│   │   └── theme/            # Theme configuration and provider
│   └── package.json
│
├── package.json               # Root package with monorepo scripts
└── README.md                 # This file
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Interactive Documentation
Visit `http://localhost:5000/api/docs` for the full Swagger UI interface with interactive API testing.

### Endpoints

#### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "priority": "high",
  "status": "pending",
  "dueDate": "2025-12-25T10:00:00.000Z"
}

Response: 201 Created
```

#### Get All Tasks
```http
GET /api/tasks?title=search&status=pending&priority=high

Response: 200 OK
[
  {
    "id": "uuid",
    "title": "Task title",
    "description": "Task description",
    "priority": "high",
    "status": "pending",
    "dueDate": "2025-12-25T10:00:00.000Z",
    "order": 0,
    "createdAt": "2025-12-20T10:00:00.000Z",
    "updatedAt": "2025-12-20T10:00:00.000Z"
  }
]
```

#### Get Task by ID
```http
GET /api/tasks/:id

Response: 200 OK or 404 Not Found
```

#### Update Task
```http
PATCH /api/tasks/:id
Content-Type: application/json

{
  "status": "in_progress",
  "priority": "medium"
}

Response: 200 OK
```

#### Delete Task
```http
DELETE /api/tasks/:id

Response: 200 OK
{ "message": "Task deleted successfully" }
```

#### Reorder Tasks
```http
POST /api/tasks/reorder
Content-Type: application/json

{
  "taskIds": ["uuid1", "uuid2", "uuid3"]
}

Response: 200 OK
```

### Query Parameters

| Parameter | Type | Values | Description |
|-----------|------|--------|-------------|
| `title` | string | Any text | Case-insensitive search by task title |
| `status` | enum | `pending`, `in-progress`, `completed` | Filter by task status |
| `priority` | enum | `low`, `medium`, `high` | Filter by priority level |

### Data Models

**Task Object:**
```typescript
{
  id: string;              // UUID
  title: string;           // Required, max 200 chars
  description: string;     // Required
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;         // ISO 8601 datetime
  order: number;           // Display order (0-based)
  createdAt: string;       // ISO 8601 datetime
  updatedAt: string;       // ISO 8601 datetime
}
```

## Technology Choices & Reasoning

### Why NestJS?
- **Structured Architecture** - Built-in modules, dependency injection, and decorators
- **TypeScript First** - Native TypeScript support with excellent type inference
- **Swagger Integration** - Auto-generated API documentation reduces maintenance
- **Scalability** - Easy to extend with new features and modules
- **Testing Support** - Built-in testing utilities and patterns

### Why React 19?
- **Modern Features** - Latest concurrent rendering and hooks improvements
- **Performance** - Automatic batching and optimized reconciliation
- **Ecosystem** - Vast library ecosystem and community support
- **Developer Experience** - Excellent tooling, debugging, and documentation

### Why TanStack Query?
- **Automatic Caching** - Reduces unnecessary API calls
- **Background Refetching** - Keeps data fresh automatically
- **Optimistic Updates** - Instant UI feedback before server confirmation
- **Error Handling** - Built-in retry logic and error states
- **DevTools** - Powerful debugging capabilities

### Why DnD Kit?
- **Accessibility First** - Full keyboard and screen reader support
- **Flexible** - Works with any layout (grid, list, etc.)
- **Performant** - Optimized for smooth 60fps animations
- **Modern** - Built with React hooks, no class components
- **Small Bundle** - Modular architecture, import only what you need

### Why Material-UI?
- **Complete Component Library** - Pre-built, accessible components
- **Theming System** - Easy customization and dark mode support
- **Responsive Utilities** - Grid system and breakpoints built-in
- **Active Maintenance** - Regular updates and improvements
- **Design Consistency** - Follows Material Design guidelines

### Trade-offs

**JSON File Storage vs Database:**
- **Chosen:** JSON file storage
- **Rationale:** Simplicity for prototype/demo, no external dependencies, easy to inspect
- **Trade-off:** Not suitable for production with multiple users or concurrent writes
- **Future:** Easily migrated to PostgreSQL, MongoDB, or other databases

**Client-Side Routing vs Server-Side:**
- **Chosen:** Client-side with React Router
- **Rationale:** Better UX with instant navigation, SPA benefits
- **Trade-off:** Initial bundle size, SEO challenges (solvable with SSR)

**Auto-generated API Client vs Manual:**
- **Chosen:** Auto-generated from OpenAPI
- **Rationale:** Reduces manual typing errors, stays in sync with backend
- **Trade-off:** Build step dependency, requires backend to be running

## Development Workflow

1. **Install dependencies:** `npm run install:all`
2. **Start development servers:** `npm run dev`
3. **Make changes** to backend or frontend code
4. **Servers auto-reload** on file changes
5. **Test in browser** at `http://localhost:5173`
6. **View API docs** at `http://localhost:5000/api/docs`

### Tips for Development
- Use browser DevTools for debugging frontend issues
- Check backend console for API errors and logs
- TanStack Query DevTools available in bottom-left corner (development only)
- Changes to OpenAPI spec require regenerating frontend types (`npm run generate:api` in frontend folder)

## Building for Production

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
npm run preview  # Preview production build locally
```

Production builds are optimized and minified for deployment.

## Contributing

See [PRODUCT_DECISIONS.md](PRODUCT_DECISIONS.md) for architectural decisions, UX choices, and development guidelines.

## Demo Video

**Working Demo:**

[Add Loom link here]

---

Built with by Ioseb for SDSolutions
