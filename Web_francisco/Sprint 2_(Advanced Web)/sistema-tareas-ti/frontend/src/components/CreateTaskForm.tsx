// src/components/CreateTaskForm.tsx
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  FormControlLabel,
  Checkbox, // Corregido: Switch -> Checkbox
  Typography,
  Box
} from '@mui/material';

import { Task, TaskStatus } from '../models/Task';
import { createTask } from '../api/api';

interface CreateTaskFormProps {
  open: boolean;
  onClose: () => void;
  onTaskCreated: () => Promise<void>;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ open, onClose, onTaskCreated }) => { // Añadido onTaskCreated
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [critical, setCritical] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      setError('Por favor completa todos los campos obligatorios');
      return;
    }
    
    try {
      const newTask: Omit<Task, 'id'> = {
        title,
        description,
        critical,
        status: TaskStatus.PENDING,
        createdAt: new Date().toISOString(),
      };
      
      await createTask(newTask);
      resetForm();
      onClose();
      await onTaskCreated(); // Usar el prop para actualizar la lista después de crear
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Error al crear la tarea. Inténtalo de nuevo.');
    }
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCritical(false);
    setError('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Crear Nueva Tarea</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Título de la tarea"
              name="title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              error={!title && !!error}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              id="description"
              label="Descripción"
              name="description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              error={!description && !!error}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={critical}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCritical(e.target.checked)}
                  name="critical"
                  color="primary"
                />
              }
              label="Es una tarea crítica"
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Crear Tarea</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateTaskForm;
