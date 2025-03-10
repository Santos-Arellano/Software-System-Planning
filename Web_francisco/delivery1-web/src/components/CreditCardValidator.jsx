// CreditCardValidator.jsx
import React, { useState } from "react";
import validator from "validator";

const CreditCardValidator = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [message, setMessage] = useState("");

  const validateCreditCard = (event) => {
    const value = event.target.value;
    setCardNumber(value);

    if (validator.isCreditCard(value)) {
      setMessage("✅ Tarjeta válida");
    } else {
      setMessage("❌ Tarjeta inválida");
    }
  };

  return (
    <div className="container">
      <h2>Validación de Tarjeta de Crédito</h2>
      <input 
        type="text"
        placeholder="Número de tarjeta"
        value={cardNumber}
        onChange={validateCreditCard}
      />
      <p>{message}</p>
    </div>
  );
};

export default CreditCardValidator;
