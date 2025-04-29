
// src/models/User.ts
import { Task } from './Task';

export enum Role {
  PROGRAMADOR = 'PROGRAMADOR'
}

export enum Level {
  JUNIOR = 'JUNIOR',
  SENIOR = 'SENIOR'
}

export interface User {
  id: number;
  name: string;
  role: Role;
  level: Level;
  available: boolean;
  isLeader: boolean;
  tasks?: Task[];
  taskCount: number;
}
