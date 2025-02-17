import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="title">Práctica 4</h1>
      <h1 className="team-title">Miembros del Equipo</h1>
      
      <div className="team-member">
        <h2>Juan Pérez</h2>
        <strong>Rol:</strong> Desarrollador Frontend<br />
        <p>Juan se encarga del desarrollo de la interfaz de usuario y la experiencia del usuario.</p>
      </div>

      <div className="team-member">
        <h2>Ana Gómez</h2>
        <strong>Rol:</strong> Desarrollador Backend<br />
        <p>Ana trabaja en la lógica del servidor, APIs y bases de datos.</p>
      </div>

      <div className="team-member">
        <h2>Luis Fernández</h2>
        <strong>Rol:</strong> Diseñador UX/UI<br />
        <p>Luis diseña interfaces intuitivas y realiza pruebas de usuario para mejorar la experiencia.</p>
      </div>

      
    </>
  )
}

export default App