import React from 'react';
import InfoUser from './infoUser';

function Component2({ infoUser }) {
  return (
    <>
      <h1>----------</h1>
      <InfoUser nombre={infoUser.nombre} 
      edad={infoUser.edad} 
      tipo={infoUser.tipo} />
    </>
  );
}

export default Component2;

