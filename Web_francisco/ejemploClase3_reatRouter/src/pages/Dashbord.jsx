import React, { useState } from 'react'
import CreditCardValidator from './validateCreditCard ';

function Dashbord() {
    const [cardNumber, setCardNumber] = useState(''); // Estado para almacenar el número de tarjeta

    const handleChange = (e) => {
        setCardNumber(e.target.value); // Actualizar el estado con el valor del input
    };

    return (
        <div
        style={{
            display: 'flex',
            flexDirection: 'column', // Coloca los elementos en columna
            justifyContent: 'center', // Centra los elementos en el eje principal
            height: '100vh', // Altura completa de la ventana
            padding: '10px',
            marginLeft: '70px', // Centra el div horizontalmente
        }}>
        <h3>Validador de Tarjeta de Crédito</h3>
        <input
            type="text"
            value={cardNumber}
            onChange={handleChange}
            placeholder="Ingrese el número de tarjeta"
            
        />
        <CreditCardValidator cardNumber={cardNumber} /> {/* Componente de validación */}
        </div>
    );
    };



export default Dashbord
