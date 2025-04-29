// src/pages/LeaderDashboard.tsx
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Divider, 
  Grid, 
  Paper, 
  Button,
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material';
import { Add, PlayArrow } from '@mui/icons-material';
import { Task, TaskStatus } from '../models/Task';
import { User } from '../models/User';
import TaskCard from '../components/TaskCard';
import UserCard from '../components/UserCard';
import CreateTaskForm from '../components/CreateTaskForm';
import { useAppContext } from '../context/AppContext';
import { assignTask, runAgent } from '../api/api';

const LeaderDashboard: React.FC = () => {
  const { users, tasks, loading, refreshData } = useAppContext();
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  // Filter tasks and users
  const pendingTasks = tasks.filter(task => task.status === TaskStatus.PENDING);
  const availableUsers = users.filter(user => user.available && !user.isLeader);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(selectedTask?.id === task.id ? null : task);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(selectedUser?.id === user.id ? null : user);
  };

  const handleAssignTask = async () => {
    if (!selectedTask || !selectedUser) {
      setAlertMessage('Por favor, selecciona una tarea y un usuario para la asignación.');
      setAlertOpen(true);
      return;
    }

    setLoadingAction(true);
    try {
      await assignTask(selectedTask.id, selectedUser.id);
      setAlertMessage(`Tarea "${selectedTask.title}" asignada a ${selectedUser.name}`);
      setSelectedTask(null);
      setSelectedUser(null);
      await refreshData();
    } catch (error) {
      console.error('Error assigning task:', error);
      setAlertMessage('Error al asignar la tarea. Inténtalo de nuevo.');
    } finally {
      setAlertOpen(true);
      setLoadingAction(false);
    }
  };

  const handleRunAgent = async () => {
    setLoadingAction(true);
    try {
      await runAgent();
      setAlertMessage('Agente ejecutado correctamente. Tareas asignadas automáticamente.');
      await refreshData();
    } catch (error) {
      console.error('Error running agent:', error);
      setAlertMessage('Error al ejecutar el agente. Inténtalo de nuevo.');
    } finally {
      setAlertOpen(true);
      setLoadingAction(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Panel del Líder de Equipo
          </Typography>
          <Box>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<Add />}
              onClick={() => setCreateTaskDialogOpen(true)}
              sx={{ mr: 2 }}
            >
              Nueva Tarea
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<PlayArrow />}
              onClick={handleRunAgent}
              disabled={loadingAction || pendingTasks.length === 0}
            >
              Ejecutar Agente
            </Button>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Typography variant="h5" gutterBottom>
            Tareas Pendientes ({pendingTasks.length})
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          {pendingTasks.length === 0 ? (
            <Alert severity="info">No hay tareas pendientes.</Alert>
          ) : (
            <>
              {pendingTasks.map(task => (
                <Box 
                  key={task.id}
                  onClick={() => handleTaskClick(task)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TaskCard 
                    task={task} 
                    showActions={false}
                  />
                </Box>
              ))}
            </>
          )}
        </Grid>
        
        <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {selectedTask && selectedUser && (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAssignTask}
              disabled={loadingAction}
              sx={{ my: 2 }}
            >
              Asignar Tarea
            </Button>
          )}
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Typography variant="h5" gutterBottom>
            Trabajadores Disponibles ({availableUsers.length})
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          {availableUsers.length === 0 ? (
            <Alert severity="warning">No hay trabajadores disponibles.</Alert>
          ) : (
            availableUsers.map(user => (
              <UserCard 
                key={user.id} 
                user={user} 
                selected={selectedUser?.id === user.id}
                onClick={() => handleUserClick(user)}
              />
            ))
          )}
        </Grid>
      </Grid>

      <CreateTaskForm 
        open={createTaskDialogOpen}
        onClose={() => setCreateTaskDialogOpen(false)}
        onTaskCreated={refreshData}
      />

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        message={alertMessage}
      />
    </Container>
  );
};

export default LeaderDashboard;