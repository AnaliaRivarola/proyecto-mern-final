// components/ListaMascota.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

const ListaMascota = ({ pets }) => {
  return (

    <table >
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Raza</th>
          <th>Sexo</th>
          <th>Edad</th>
          <th>Otros datos</th>

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
            <td>{Math.floor(pet.edad/12)} años, {pet.edad % 12} meses</td>
            <td>{pet.otrosDatos}</td>

            <td>
              <Link to={`/pets/${pet._id}`}>
                <FontAwesomeIcon icon={faEye} style={{ marginRight: '20px', color: '#067d8f' }} />  
              </Link>
              
              <Link to={`/pets/${pet._id}/edit`}>
                <FontAwesomeIcon icon={faEdit} style={{  color: '#28a745' }} /> 
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );
};

export default ListaMascota;
