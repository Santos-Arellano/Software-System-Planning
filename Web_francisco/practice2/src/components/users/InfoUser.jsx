
import React from 'react';

const InfoUser = ({ nombre, edad, tipo }) => {

  return (
    <div className="info-user">
      <h2>{nombre}</h2>

     <p><strong>edad:</strong> {edad}</p>

     <p><strong>tipo:</strong> {tipo}</p>
    </div>
  );
};

export default InfoUser;
