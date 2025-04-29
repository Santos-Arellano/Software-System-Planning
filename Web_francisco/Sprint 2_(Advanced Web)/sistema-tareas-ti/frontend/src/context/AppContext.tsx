// src/context/AppContext.tsx
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Task } from '../models/Task';
import { User } from '../models/User';
import { getTasks, getUsers } from '../api/api';
import { connectWebSocket, disconnectWebSocket, subscribe } from '../websocket';

interface AppContextType {
    users: User[];
    tasks: Task[];
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    loading: boolean;
    refreshData: () => Promise<void>; // Añade esta propiedad
}

const AppContext = createContext<AppContextType>({
  users: [],
  tasks: [],
  currentUser: null,
  setCurrentUser: () => {},
  loading: true,
  refreshData: async () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, tasksData] = await Promise.all([
          getUsers(),
          getTasks(),
        ]);
        
        setUsers(usersData);
        setTasks(tasksData);
        
        // Set first user as default (can be changed later by user selection)
        if (usersData.length > 0) {
          setCurrentUser(usersData[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    connectWebSocket();

    // Setup WebSocket subscriptions
    const unsubscribeTasks = subscribe('tasks', (updatedTasks: Task[]) => {
      setTasks(updatedTasks);
    });

    const unsubscribeUsers = subscribe('users', (updatedUsers: User[]) => {
      setUsers(updatedUsers);
      // Update current user if it exists in the updated list
      if (currentUser) {
        const updatedCurrentUser = updatedUsers.find(u => u.id === currentUser.id);
        if (updatedCurrentUser) {
          setCurrentUser(updatedCurrentUser);
        }
      }
    });

    return () => {
      unsubscribeTasks();
      unsubscribeUsers();
      disconnectWebSocket();
    };
  }, []);

  // If current user changes, update its data when users are updated
  useEffect(() => {
    if (currentUser && users.length > 0) {
      const updatedUser = users.find(u => u.id === currentUser.id);
      if (updatedUser && JSON.stringify(updatedUser) !== JSON.stringify(currentUser)) {
        setCurrentUser(updatedUser);
      }
    }
  }, [users, currentUser]);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [usersData, tasksData] = await Promise.all([
        getUsers(),
        getTasks(),
      ]);
      setUsers(usersData);
      setTasks(tasksData);
      if (usersData.length > 0) {
        setCurrentUser(usersData[0]);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = useMemo(() => ({
    users,
    tasks,
    currentUser, 
    setCurrentUser,
    loading,
    refreshData
  }), [users, tasks, currentUser, loading, refreshData]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};