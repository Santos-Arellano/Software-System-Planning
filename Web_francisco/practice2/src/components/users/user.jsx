export const Usuario = (props) => {

    const {nombre, edad, tipo} = props;

    return <div>
        <h1>Hello World :D</h1>
        <h2>Nombre: {props.nombre}</h2>
        <p>Edad: {props.edad}</p>
        <p>Tipo: {props.tipo}</p>
    </div>
}

