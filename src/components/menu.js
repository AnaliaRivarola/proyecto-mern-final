// components/Menu.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/menu.css';
import logo from "../assents/logo.png";


const Menu = () => {
  return (
    <nav>
      <div className="wrapper">
      <img src={logo} style={{ width: "80px", height: "60px" }} alt="Logo" />
        <ul className="nav-links">
          <li><Link to="/registro">crear cuenta</Link></li>
          <li><Link to="/PerfilRescatista">Perfil Rescatista</Link></li>
          <li><Link to="/HomeAdoptante">Adoptante</Link></li>
          <li><Link to="/HomeRescatista">Rescatista</Link></li>
          <li><Link to="/pets/new">Agregar Mascota</Link></li>
          <li><Link to="/">Login</Link></li> {/* Enlace al formulario de login */}
          <li><Link to="/lista">Lista de Favoritos</Link></li>

        </ul>
      </div>
    </nav>
  );
};

export default Menu;
