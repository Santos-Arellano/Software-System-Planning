// src/components/TaskCard.tsx
import React from 'react';
import { Card, CardContent, CardActions, Typography, Chip, Button, Box } from '@mui/material';
import { Task, TaskStatus } from '../models/Task';
import { completeTask } from '../api/api';
import { Level } from '../models/User';

interface TaskCardProps {
  task: Task;
  showActions?: boolean;
  userLevel?: Level;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, showActions = true, userLevel }) => {
  const handleComplete = async () => {
    try {
      await completeTask(task.id);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const getStatusLabel = (status: TaskStatus): string => {
    switch (status) {
      case TaskStatus.PENDING: return 'Pendiente';
      case TaskStatus.ASSIGNED: return 'Asignada';
      case TaskStatus.COMPLETED: return 'Completada';
      default: return '';
    }
  };

  const getStatusColor = (status: TaskStatus): 'warning' | 'primary' | 'success' | 'default' => {
    switch (status) {
      case TaskStatus.PENDING: return 'warning';
      case TaskStatus.ASSIGNED: return 'primary';
      case TaskStatus.COMPLETED: return 'success';
      default: return 'default';
    }
  };

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2,
        border: task.critical ? '1px solid #f44336' : undefined,
        backgroundColor: task.status === TaskStatus.COMPLETED ? '#e8f5e9' : undefined
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" component="div">
            {task.title}
          </Typography>
          <Box>
            {task.critical && (
              <Chip 
                label="Crítica" 
                color="error" 
                size="small" 
                sx={{ mr: 1 }} 
              />
            )}
            <Chip 
              label={getStatusLabel(task.status)} 
              color={getStatusColor(task.status)}
              size="small"
            />
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {task.description}
        </Typography>
        {task.assignedToName && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Asignada a:</strong> {task.assignedToName}
          </Typography>
        )}
      </CardContent>
      {showActions && task.status === TaskStatus.ASSIGNED && (
        <CardActions>
          <Button 
            size="small" 
            color="primary" 
            onClick={handleComplete}
          >
            Marcar como completada
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default TaskCard;
