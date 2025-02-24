
//Router:	Envuelve la aplicación y gestiona la navegación.
//Routes:	Agrupa múltiples rutas y muestra solo la primera coincidencia.
//Route:	Define una URL específica y qué componente renderizar.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar"; // Importa el componente Navbar
import Home from "./pages/Home";
import About from "./pages/About";
import Dashbord from "./pages/Dashbord";
import Default from "./pages/Default";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Barra de navegación */}
        <Navbar />
        {/* Contenido de la página */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashbord" element={<Dashbord />} />
            <Route path="*" element={<Default />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
