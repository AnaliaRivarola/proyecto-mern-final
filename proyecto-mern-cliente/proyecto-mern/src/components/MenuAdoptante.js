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
          
          <li><Link to="/HomeAdoptante">Adoptar</Link></li>
          <li><Link to="/lista">Favoritos</Link></li>
          
          <li><Link to="/registro">Registrarse</Link></li>
          <li><Link to="/">Iniciar sesión</Link></li> 

        </ul>
      </div>
    </nav>
  );
};

export default Menu;
