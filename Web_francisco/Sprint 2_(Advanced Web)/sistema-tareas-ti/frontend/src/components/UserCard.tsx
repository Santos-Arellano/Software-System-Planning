// src/components/UserCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Avatar } from '@mui/material';
import { User, Level } from '../models/User';

interface UserCardProps {
  user: User;
  selected?: boolean;
  onClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, selected, onClick }) => {
  return (
    <Card 
      variant={selected ? "elevation" : "outlined"}
      sx={{ 
        mb: 2, 
        cursor: onClick ? 'pointer' : 'default',
        bgcolor: selected ? 'primary.light' : 'background.paper',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: onClick ? 3 : 0
        }
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: user.level === Level.SENIOR ? 'primary.main' : 'secondary.main' }}>
            {user.name[0]}
          </Avatar>
          <Box ml={2}>
            <Typography variant="h6" component="div">
              {user.name}
            </Typography>
            <Box display="flex" mt={1}>
              <Chip 
                label={user.role} 
                color="default" 
                size="small" 
                sx={{ mr: 1 }} 
              />
              <Chip 
                label={user.level} 
                color={user.level === Level.SENIOR ? 'primary' : 'secondary'} 
                size="small" 
                sx={{ mr: 1 }}
              />
              {user.isLeader && (
                <Chip 
                  label="Líder" 
                  color="success" 
                  size="small" 
                  sx={{ mr: 1 }}
                />
              )}
              <Chip 
                label={user.available ? 'Disponible' : 'No disponible'} 
                color={user.available ? 'success' : 'error'}
                size="small"
              />
            </Box>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <strong>Tareas asignadas:</strong> {user.taskCount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;