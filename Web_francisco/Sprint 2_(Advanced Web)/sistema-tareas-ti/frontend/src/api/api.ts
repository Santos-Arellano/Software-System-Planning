// src/api/api.ts
import axios from 'axios';
import { Task } from '../models/Task';
import { User } from '../models/User';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await api.post('/users', user);
  return response.data;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const getAvailableUsers = async (): Promise<User[]> => {
  const response = await api.get('/users/available');
  return response.data;
};

// Task API
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks');
  return response.data;
};

export const getTaskById = async (id: number): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await api.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const assignTask = async (taskId: number, userId: number): Promise<Task> => {
  const response = await api.post('/tasks/assign', { taskId, userId });
  return response.data;
};

export const completeTask = async (id: number): Promise<Task> => {
  const response = await api.post(`/tasks/${id}/complete`);
  return response.data;
};

export const getTasksByStatus = async (status: string): Promise<Task[]> => {
  const response = await api.get(`/tasks/status/${status}`);
  return response.data;
};

export const getTasksByUserId = async (userId: number): Promise<Task[]> => {
  const response = await api.get(`/tasks/user/${userId}`);
  return response.data;
};

// Agent API
export const runAgent = async (): Promise<string> => {
  const response = await api.post('/agent/run');
  return response.data;
};