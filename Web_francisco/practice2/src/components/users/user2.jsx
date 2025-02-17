import React, { useState } from 'react';

function Componente1() {
    // Estado para almacenar el texto ingresado en el input en tiempo real
    const [text, setText] = useState('');
    
    // Estado para almacenar el texto que se actualizará al hacer clic en el botón
    const [updatedText, setUpdatedText] = useState('');

    return (


        
        <div>
            {/* Input para ingresar texto, actualiza el estado 'text' en cada cambio */}
            <input 
                type='text' 
                value={text} 
                onChange={(e) => setText(e.target.value)}
            />
            
            {/* Botón que actualiza 'updatedText' con el valor actual de 'text' al hacer clic */}
            <button onClick={() => setUpdatedText(text)}>Actualizar</button>
            
            {/* Muestra el texto ingresado en el input en tiempo real */}
            <p>{text}</p>
            
            {/* Muestra el texto solo cuando se presiona el botón */}
            <p>Nuevo texto: {updatedText}</p>
        </div>
    );
}

export default Componente1;