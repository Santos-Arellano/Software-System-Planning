// src/models/Task.ts
export enum TaskStatus {
    PENDING = 'PENDING',
    ASSIGNED = 'ASSIGNED',
    COMPLETED = 'COMPLETED'
  }
  
  export interface Task {
    id: number;
    title: string;
    description: string;
    critical: boolean;
    status: TaskStatus;
    createdAt: string;
    completedAt?: string;
    assignedToId?: number;
    assignedToName?: string;
  }
  