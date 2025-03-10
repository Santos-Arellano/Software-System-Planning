// ApiData.jsx
import React, { useState, useEffect } from "react";

const ApiData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => setData(data.slice(0,10)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h2>Datos desde API:</h2>
      {data.map((item) => (
        <div key={item.id}>
          <h4>Usuario: {item.userId}</h4>
          <p>Album ID: {item.id}</p>
          <p>Título: {item.title}</p>
          <img src={`https://picsum.photos/200?random=${item.id}`} alt="random" />
        </div>
      ))}
    </>
  );
};

export default ApiData;
