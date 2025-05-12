import React from 'react';
import PropTypes from 'prop-types';

const CampoFormulario = ({ campo, valor, onChange }) => {
  const { id, tipo, etiqueta, placeholder, requerido, opciones } = campo;

  const handleChange = (e) => {
    onChange(id, e.target.value);
  };

  const renderCampo = () => {
    switch (tipo) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <input
            type={tipo}
            id={id}
            className="form-control"
            placeholder={placeholder}
            value={valor || ''}
            onChange={handleChange}
            required={requerido}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            id={id}
            className="form-control"
            placeholder={placeholder}
            value={valor || ''}
            onChange={handleChange}
            required={requerido}
            rows={4}
          />
        );
      
      case 'select':
        return (
          <select
            id={id}
            className="form-control"
            value={valor || ''}
            onChange={handleChange}
            required={requerido}
          >
            <option value="">{placeholder}</option>
            {opciones && opciones.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="radio-group">
            {opciones && opciones.map((opcion) => (
              <div key={opcion} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name={id}
                  id={`${id}_${opcion}`}
                  value={opcion}
                  checked={valor === opcion}
                  onChange={handleChange}
                  required={requerido}
                />
                <label className="form-check-label" htmlFor={`${id}_${opcion}`}>
                  {opcion}
                </label>
              </div>
            ))}
          </div>
        );
      
      default:
        return <p>Tipo de campo no soportado: {tipo}</p>;
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {etiqueta} {requerido && <span className="text-danger">*</span>}
      </label>
      {renderCampo()}
    </div>
  );
};

// Añadir la validación de props
CampoFormulario.propTypes = {
  campo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    etiqueta: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    requerido: PropTypes.bool,
    opciones: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  valor: PropTypes.any,
  onChange: PropTypes.func.isRequired
};

export default CampoFormulario;
