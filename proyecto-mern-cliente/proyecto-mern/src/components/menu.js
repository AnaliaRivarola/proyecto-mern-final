// components/Menu.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/menu.css';
import logo from "../assents/logo.png";


const Menu = () => {
  return (
    <nav>
      <div className="wrapper">
      <img className="logo" src={logo} />
        <ul className="nav-links">
          <li><Link to="/registro">Registarse</Link></li>
          <li><Link to="/PerfilRescatista">Mis mascotas</Link></li>
          
          <li><Link to="/HomeRescatista">Solicitudes</Link></li>
          <li><Link to="/pets/new">Agregar Mascota</Link></li>
          <li><Link to="/">Iniciar otra sesion</Link></li> {/* Enlace al formulario de login */}
        </ul>
      </div>
    </nav>
  );
};
//<li><Link to="/HomeAdoptante">Adoptar</Link></li>
export default Menu;
