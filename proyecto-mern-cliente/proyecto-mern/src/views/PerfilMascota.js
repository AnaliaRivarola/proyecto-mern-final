import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const PerfilMascota = () => {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Conectar con el servidor de socket.io
    const socketIo = io('http://localhost:8000');
    setSocket(socketIo);

    // Manejar las notificaciones de adopción
    socketIo.on('adoptionStatus', (data) => {
      setNotification(`Status de adopción: ${data.status}`);
    });

    // Obtener los detalles de la mascota
    axios.get(`http://localhost:8000/api/pets/${id}`)
      .then(res => {
        setPet(res.data);
        setLikes(res.data.likes || 0); // Asegúrate de que `likes` se inicializa correctamente
      })
      .catch(err => console.error(err));

    // Cleanup en desmontaje del componente
    return () => {
      socketIo.disconnect();
    };
  }, [id]);

  const adoptPet = () => {
    // Emitir solicitud de adopción al servidor
    if (socket) {
      socket.emit('adoptionRequest', { petId: id });

      // Mostrar notificación de solicitud enviada
      setNotification('Solicitud de adopción enviada');
    } else {
      console.error('Socket not initialized');
    }

    // Opcional: Eliminar la mascota (esto puede depender de tu lógica)
    axios.delete(`http://localhost:8000/api/pets/${id}`)
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  const likePet = () => {
    axios.put(`http://localhost:8000/api/pets/${id}/like`)
      .then(res => {
        setLikes(likes + 1);
        setIsLiked(true);
      })
      .catch(err => console.error(err));
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div>
      <div className='atras'>
        <button className="back-button" onClick={goHome}>Volver a inicio</button>
      </div>

      <div className="pet-detail-container">
        <div className="pet-detail-header">
          <h2>Perfil de {pet.nombre}</h2>
        </div>

        <div className="pet-info">
          <div>
            <p><strong>Tipo de mascota:</strong> {pet.tipo}</p>
            <p><strong>Raza:</strong> {pet.raza}</p>
            <p><strong>Edad:</strong> {pet.edad} años</p>
            <p><strong>Sexo:</strong> {pet.sexo}</p>
          </div>
          <div>
            <p><strong>Otros Datos:</strong> {pet.otrosDatos}</p>
            <p><strong>En adopción:</strong> {pet.enAdopcion ? 'Sí' : 'No'}</p>
          </div>
        </div>

        <div className="pet-actions">
          <button className="btn-adopt" onClick={adoptPet}>Adoptar {pet.nombre}</button>
          <button className="btn-like" onClick={likePet} disabled={isLiked}>Like {pet.nombre}</button>
          <p>{likes} like(s)</p>
        </div>

        {/* Mostrar notificaciones si hay */}
        {notification && <p>{notification}</p>}
      </div>
    </div>
  );
};

export default PerfilMascota;
