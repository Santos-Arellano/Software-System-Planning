// src/context/AppContext.tsx
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Task } from '../models/Task';
import { User, Role, Level } from '../models/User';
import { getTasks, getUsers, checkBackendHealth } from '../api/api';
import { connectWebSocket, disconnectWebSocket, subscribe } from '../websocket';

interface AppContextType {
    users: User[];
    tasks: Task[];
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    loading: boolean;
    refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType>({
  users: [],
  tasks: [],
  currentUser: null,
  setCurrentUser: () => {},
  loading: true,
  refreshData: async () => {},
});

// Función para parsear de manera segura
const safeParse = (value: string | null) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error parsing localStorage:', error);
    return null;
  }
};

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return safeParse(localStorage.getItem('user')); // Inicializa desde localStorage
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isBackendHealthy = await checkBackendHealth();
        
        if (!isBackendHealthy) {
          // Agregar datos de ejemplo si el backend no está disponible
          console.log('Backend no disponible, usando datos de ejemplo');
          setUsers([{
            id: 1,
            name: 'Usuario Demo',
            role: Role.PROGRAMADOR,
            level: Level.SENIOR,
            available: true,
            isLeader: true,
            taskCount: 0,
            tasks: []
          }]);
          setCurrentUser({
            id: 1,
            name: 'Usuario Demo',
            role: Role.PROGRAMADOR,
            level: Level.SENIOR,
            available: true,
            isLeader: true,
            taskCount: 0,
            tasks: []
          });
          setLoading(false);
          return;
        }
        
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
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Modificación del efecto de WebSocket
    const setupWS = async () => {
      if (await checkBackendHealth()) {
        connectWebSocket();
        const cleanup = setupSubscriptions();
        return () => {
          cleanup();
          disconnectWebSocket();
        };
      }
    };

    setupWS();
    
    return () => {
      disconnectWebSocket();
    };
  }, []); // Elimina dependencias innecesarias

  const setupSubscriptions = () => {
    const unsubscribeTasks = subscribe('tasks', (updatedTasks: Task[]) => {
      setTasks(updatedTasks);
    });

    const unsubscribeUsers = subscribe('users', (updatedUsers: User[]) => {
      setUsers(updatedUsers);
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
  };

  // Si currentUser cambia, actualizar sus datos cuando se actualicen los usuarios
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