import React from 'react'
function Component1(props) {
    return (
        <div>
             <h1>Hola Mundo :D</h1>
            <h2>Nombre: {props.nombre}</h2>
            <p>Edad: {props.edad}</p>
            <p>Tipo: {props.tipo}</p>
        </div>
    )
}

export default Component1
