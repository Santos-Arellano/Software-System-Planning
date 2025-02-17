import {useState} from "react";

//Couter <----------------------

export const Couter = () => {
  // Declaramos una variable de estado llamada "counter" y una función "setCounter" para actualizarla.
  // useState(0) inicializa "counter" con un valor inicial de 0.
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((prev)=> prev + 1);
    console.log(`El contador a sido renerizado`);
  };

  return (
    <>
        <h2>{counter}</h2>
        <button onClick={handleClick}>Aumentar</button>
        
    </>
  );

};



