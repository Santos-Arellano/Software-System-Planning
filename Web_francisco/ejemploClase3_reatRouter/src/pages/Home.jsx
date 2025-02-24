import React, { useState } from 'react'

function Home() {
    const [count, setCount] = useState(0);

    const handleAdd = () => { 
        setCount(count + 1);
    };

    const handleSubtract = () => {
        setCount(count - 1);
    };

    return (
        <>
            <h1>Home</h1>
            <button onClick={handleAdd}>Sumar</button>
            <button onClick={handleSubtract}>Restar</button>
            <p>Conteo: {count}</p>
        </>
    )
}

export default Home