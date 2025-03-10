// App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreditCardValidator from './components/CreditCardValidator';
import WordList from './components/WordList';
import ApiData from './components/ApiData';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreditCardValidator />} />
        <Route path="/words" element={<WordList />} />
        <Route path="/api" element={<ApiData />} />
      </Routes>
    </>
  );
};

export default App;
