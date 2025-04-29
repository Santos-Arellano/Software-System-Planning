// src/pages/WorkerDashboard.tsx
import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Divider,
  CircularProgress
} from '@mui/material';
import { useAppContext } from '../context/AppContext';
import TaskCard from '../components/TaskCard';
import { Task, TaskStatus } from '../models/Task';
import { getTasksByUserId } from '../api/api';

const WorkerDashboard: React.FC = () => {
  const { currentUser, loading } = useAppContext();
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserTasks = async () => {
      if (currentUser) {
        try {
          setLoadingTasks(true);
          const tasks = await getTasksByUserId(currentUser.id);
          setAssignedTasks(tasks);
        } catch (error) {
          console.error('Error fetching user tasks:', error);
        } finally {
          setLoadingTasks(false);
        }
      }
    };

    fetchUserTasks();
  }, [currentUser]);

  if (loading || !currentUser) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  const activeTasks = assignedTasks.filter(task => task.status === TaskStatus.ASSIGNED);
  const completedTasks = assignedTasks.filter(task => task.status === TaskStatus.COMPLETED);

  const renderActiveTasks = () => {
    if (loadingTasks) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      );
    }
    
    if (activeTasks.length > 0) {
      return (
        <Box>
          {activeTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              userLevel={currentUser.level}
            />
          ))}
        </Box>
      );
    }
    
    return (
      <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
        No tienes tareas activas en este momento.
      </Typography>
    );
  };

  const renderCompletedTasks = () => {
    if (loadingTasks) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      );
    }
    
    if (completedTasks.length > 0) {
      return (
        <Box>
          {completedTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              showActions={false}
            />
          ))}
        </Box>
      );
    }
    
    return (
      <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
        No has completado ninguna tarea aún.
      </Typography>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard de {currentUser.name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {currentUser.role} {currentUser.level}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Tareas Activas ({activeTasks.length})
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {renderActiveTasks()}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Tareas Completadas ({completedTasks.length})
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {renderCompletedTasks()}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WorkerDashboard;