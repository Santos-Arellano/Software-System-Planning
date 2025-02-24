function MiH2() {
  
    const [text, setText] = useState('');
    const handleText = (evento) => { 
        setText(evento.target.value);
        console.log("hola mundo");
    }

    useEffect(() => {
        // para el montaje
        console.log("componente montado");
        return () => {
            // para el desmontaje
            console.log("componente desmontado");
        }
    }, []); 

    //utilizamos la varibale para la Modificacion
    useEffect(() => {
        console.log("componente modificado");
    }, [text]);

    
    return(
        <div>
            <input type="text" onChange={handleText} />
            <p>{text}</p>
        </div>
    )
}