import React, { useState, useEffect } from 'react';  // Unifica la importación de React y hooks
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PerfilRescatista from './views/PerfilRescatista';
import AgregarMascota from './views/AgregarMascota';
import EditarMascota from './views/EditarMascota';
import PerfilMascota from './views/PerfilMascota';
import HomeAdoptante from './views/HomeAdoptante';
import HomeRescatista from './views/HomeRescatista';
import Login from './components/FormularioLogin';
import Registro from './components/FormularioRegistro';

const App = () => {

  const [listaUsuarios, setListaUsuario] = useState([]);
  const [loginValido, setLoginValido] = useState(false);

  const actualizarListaUsuarios = (nuevoUsuario) => {
    setListaUsuario([...listaUsuarios, nuevoUsuario]);
  }


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro actualizarListaUsuarios={actualizarListaUsuarios} />} />
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
