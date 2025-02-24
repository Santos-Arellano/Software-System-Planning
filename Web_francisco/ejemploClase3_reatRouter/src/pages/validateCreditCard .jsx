import React from 'react';

// Función para validar el número de tarjeta de crédito usando el algoritmo de Luhn
const validateCreditCard = (number) => {
  const cleanNumber = number.replace(/\D/g, ''); // Eliminar caracteres no numéricos
  let sum = 0;
  let shouldDouble = false;

  // Iterar sobre los dígitos de derecha a izquierda
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digito = parseInt(cleanNumber[i], 10); // Convertir el dígito a número

    // Duplicar cada segundo dígito
    if (shouldDouble) {
      digito *= 2;
      // Si el resultado es mayor que 9, restar 9
      if (digito > 9) {
        digito -= 9;
      }
    }
    sum += digito; // Sumar el dígito a la suma total
    shouldDouble = !shouldDouble; // Alternar el estado de duplicar
  }

  return sum % 10 === 0; // Validar si la suma es múltiplo de 10
};

// Componente para manejar la validación
const CreditCardValidator = ({ cardNumber }) => {
  const isValid = validateCreditCard(cardNumber);

  return (
    <div>
      {isValid ? (
        <p>La tarjeta de crédito es válida.</p>
      ) : (
        <p>La tarjeta de crédito no es válida.</p>
      )}
    </div>
  );
};

export default CreditCardValidator;
