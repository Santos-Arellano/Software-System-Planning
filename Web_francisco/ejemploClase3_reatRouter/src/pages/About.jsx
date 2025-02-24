import React, {useState} from 'react';
import './About.css';

function About() {
    const [show, setShow] = useState(true);
    const [count, setCount] = useState(0); 

    function handleShow() {
        setShow(!show);
        if (!show) { 
            setCount(count + 1);
        }
    }

    function resetCount() {
        setCount(0); 
    }

    return(
        <div className="about-container">
            <button onClick={handleShow}>{show ? 'Ocultar' : 'Mostrar'} About</button>
            {show && <h1>About</h1>}
            {show && <p>Este título ha sido mostrado {count} veces.</p>} 
            {show && <p>¡Gracias por visitar nuestra página!</p>} 
            {show && <button onClick={resetCount}>Reiniciar contador</button>} 
            {show === true ? <h2>El estado de show es verdadero</h2> : <h2>El estado de show es falso</h2>}
        </div>
    )
}

export default About