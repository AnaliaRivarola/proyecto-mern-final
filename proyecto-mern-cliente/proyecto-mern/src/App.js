import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PerfilRescatista from './views/PerfilRescatista';
import AgregarMascota from './views/AgregarMascota';
import EditarMascota from './views/EditarMascota';
import PerfilMascota from './views/PerfilMascota';
import HomeAdoptante from './views/HomeAdoptante';
import './App.css';
import HomeRescatista from './views/HomeRescatista';
import Login from './components/FormularioLogin';
import Registro from './components/FormularioRegistro';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Registro />} />
          <Route path="/PerfilRescatista" element={<PerfilRescatista />} />
          <Route path="/pets/new" element={<AgregarMascota />} />
          <Route path="/pets/:id/edit" element={<EditarMascota />} />
          <Route path="/pets/:id" element={<PerfilMascota />} />
          <Route path="/HomeAdoptante" element={<HomeAdoptante />} />
          <Route path="/HomeRescatista" element={<HomeRescatista />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
