import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Footer } from './Footer'
import { Header } from './Header'
import { Section } from './section'
import { Couter } from './Counter'

function App() {
  //Inicio de codigo de ejemplo
  //const [count, setCount] = useState(0)

  //Couter <----------------------
  {/*
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((prev)=> prev + 1);
  };
  */}
   //Fin de codigo de ejemplo
  
  return (
      <div>
        {//Inicio de codigo de ejemplo
        }
        {/*
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        */}
        { //Fin de codigo de ejemplo
        }
       
  

      <Header />

      < Couter />
      {//Inicio de codigo de ejemplo
      }
      {/* Sección del contador */}
      {/*
        <h2>{counter}</h2>
        <button onClick={handleClick}>Aumentar</button>
      */}
       {//Fin de codigo de ejemplo
       }
      <Section />
      <Footer />
      </div>


  )
}

export default App
