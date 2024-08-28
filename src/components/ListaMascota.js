// components/ListaMascota.js
import Menu from './menu';
import React from 'react';
import { Link } from 'react-router-dom';

const ListaMascota = ({ pets }) => {
  return (
    <table className="pet-list-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Raza</th>
          <th>Sexo</th>
          <th>Edad</th>
          <th>Otros datos</th>
          <th>En adopción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pets.map((pet) => (
          <tr key={pet._id}>
            <td>{pet.nombre}</td>
            <td>{pet.tipo}</td>
            <td>{pet.raza}</td>
            <td>{pet.sexo}</td>
            <td>{pet.edad}</td>
            <td>{pet.otrosDatos}</td>
            <td>{pet.enAdopcion ? 'sí' : 'no'}</td> 
            <td>
            <Link to={`/pets/${pet._id}`}>Ver mascota</Link> | <Link to={`/pets/${pet._id}/edit`}>Editar</Link> 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
  );
};
export default ListaMascota;