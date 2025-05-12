import React, { useState } from 'react';
import './styles.css';
import AdminForm from './components/AdminForm';
import GuestForm from './components/GuestForm';

function App() {
  const [tipoUsuario, setTipoUsuario] = useState('');

  const seleccionarTipoUsuario = (tipo) => {
    setTipoUsuario(tipo);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Formularios Dinámicos</h1>
      
      {!tipoUsuario ? (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Seleccione el tipo de usuario</h2>
            <p className="card-text">Por favor, seleccione qué tipo de usuario es para mostrar el formulario correspondiente.</p>
            
            <div className="d-flex gap-3">
              <button 
                className="btn btn-primary"
                onClick={() => seleccionarTipoUsuario('admin')}
              >
                Administrador
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => seleccionarTipoUsuario('guest')}
              >
                Invitado
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title mb-0">
                Formulario para {tipoUsuario === 'admin' ? 'Administrador' : 'Invitado'}
              </h2>
              
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setTipoUsuario('')}
              >
                Cambiar tipo de usuario
              </button>
            </div>
            
            {tipoUsuario === 'admin' ? <AdminForm /> : <GuestForm />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
