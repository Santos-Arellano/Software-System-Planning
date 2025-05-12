import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { obtenerFormulario } from '../services/api';
import CampoFormulario from './CampoFormulario';

const FormularioDinamico = ({ tipoUsuario }) => {
  const [formulario, setFormulario] = useState(null);
  const [valores, setValores] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarFormulario = async () => {
      try {
        setCargando(true);
        setError(null);
        
        const formularioCargado = await obtenerFormulario(tipoUsuario);
        setFormulario(formularioCargado);
        
        // Inicializar valores en blanco
        const valoresIniciales = {};
        formularioCargado.campos.forEach(campo => {
          valoresIniciales[campo.id] = '';
        });
        setValores(valoresIniciales);
        
        setCargando(false);
      } catch (err) {
        setCargando(false);
        setError('Error al cargar el formulario. Por favor, intente nuevamente.');
        console.error('Error cargando formulario:', err);
      }
    };

    cargarFormulario();
  }, [tipoUsuario]);

  const handleChange = (campoId, valor) => {
    setValores({
      ...valores,
      [campoId]: valor
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', valores);
    // Aquí iría la lógica para enviar el formulario al backend
    alert('Formulario enviado con éxito!');
  };

  if (cargando) {
    return <p>Cargando formulario...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!formulario) {
    return <p>No se encontró un formulario para el tipo de usuario seleccionado.</p>;
  }

  return (
    <div className="formulario-dinamico">
      <h2>{formulario.titulo}</h2>
      
      <form onSubmit={handleSubmit}>
        {formulario.campos.map(campo => (
          <CampoFormulario
            key={campo.id}
            campo={campo}
            valor={valores[campo.id]}
            onChange={handleChange}
          />
        ))}
        
        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Enviar Formulario
          </button>
        </div>
      </form>
    </div>
  );
};

// Add PropTypes validation
FormularioDinamico.propTypes = {
  tipoUsuario: PropTypes.string.isRequired
};

export default FormularioDinamico;
