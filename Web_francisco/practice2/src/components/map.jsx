import React from 'react';

// Componente principal que muestra una lista de tareas
const ListaTareas = () => {
  // Definimos un arreglo de tareas
  const tareas = [
    { id: 1, nombre: 'Hacer la compra' },
    { id: 2, nombre: 'Estudiar React' },
    { id: 3, nombre: 'Llamar a un amigo' },
  ];

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <ul>
        {/* Usamos map() para iterar sobre el arreglo "tareas" */}
        {tareas.map((tarea) => (
          <li key={tarea.id}>{tarea.nombre}</li> // Cada tarea se representa como un <li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTareas;

