// Importamos el hook useState desde React, que permite manejar el estado en componentes funcionales.
import {useState} from "react";

// Definimos el componente funcional Couter
export const Couter = () => {
  
  // Declaramos una variable de estado llamada "counter" y una función "setCounter" para actualizarla.
  // useState(0) inicializa "counter" con un valor inicial de 0.
  const [counter, setCounter] = useState(0);

  // Función que maneja el evento del clic en el botón. 
  // Cada vez que se hace clic, incrementa el valor de "counter".
  const handleClick = () => {
    // setCounter se usa para actualizar el estado. Utilizamos una función de actualización
    // (prev) que toma el valor anterior de "counter" y le suma 1.
    setCounter((prev) => prev + 1);
    // Imprimimos un mensaje en la consola cada vez que el contador se actualiza.
    console.log(`El contador a sido renerizado`);
  };

  // JSX que se renderiza. 
  // Mostramos el valor de "counter" en un <h2>, y un botón que llama a handleClick cuando se hace clic.
  return (
    <>
        <h2>{counter}</h2> {/* Muestra el valor del contador */}
        <button onClick={handleClick}>Aumentar</button> {/* Botón que al hacer clic ejecuta handleClick */}
    </>
  );
};