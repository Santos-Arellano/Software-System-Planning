// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  CssBaseline, 
  ThemeProvider, 
  createTheme, 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { AppProvider, useAppContext } from './context/AppContext';
import WorkerDashboard from './pages/WorkerDashboard';
import LeaderDashboard from './pages/LeaderDashboard';

// Crear tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const Navigation: React.FC = () => {
  const { users, currentUser, setCurrentUser } = useAppContext();

  const handleUserChange = (event: SelectChangeEvent<number>) => {
    const userId = event.target.value as number;
    const selectedUser = users.find(u => u.id === userId) || null;
    setCurrentUser(selectedUser);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Asignación de Tareas TI
        </Typography>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth size="small" variant="filled" sx={{ backgroundColor: 'white', borderRadius: 1 }}>
            <InputLabel id="user-select-label">Usuario</InputLabel>
            <Select
              labelId="user-select-label"
              value={currentUser?.id || ''}
              onChange={handleUserChange}
              label="Usuario"
            >
              {users.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name} ({user.level})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const AppContent: React.FC = () => {
  const { currentUser } = useAppContext();

  return (
    <>
      <CssBaseline />
      <Navigation />
      <Container>
        <Routes>
          <Route 
            path="/" 
            element={
              currentUser?.isLeader 
                ? <LeaderDashboard /> 
                : <WorkerDashboard />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router 
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AppProvider>
          <AppContent />
        </AppProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;

