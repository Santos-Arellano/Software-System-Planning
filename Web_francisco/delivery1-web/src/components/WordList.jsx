// WordList.jsx
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const WordList = () => {
  const [words, setWords] = useState([]);
  const [inputWord, setInputWord] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    setWords([
      { id: uuidv4(), word: "React" },
      { id: uuidv4(), word: "JavaScript" },
      { id: uuidv4(), word: "Hooks" }
    ]);
    
    return () => setWords([]);
  }, []);

  const addWord = () => {
    if (words.some(item => item.word === inputWord)) {
      setWarning("⚠️ La palabra ya existe");
      return;
    }
    setWords([...words, { id: uuidv4(), word: inputWord }]);
    setWarning("");
    setInputWord("");
  };

  return (
    <>
      <input value={inputWord} onChange={(e) => setInputWord(e.target.value)} placeholder="Añadir palabra" />
      <button onClick={addWord}>Agregar</button>
      {warning && <p>{warning}</p>}
      
      <ul>
        {words.map((item) => (
          <li key={item.id}>{item.word}</li>
        ))}
      </ul>
    </>
  );
};

export default WordList;