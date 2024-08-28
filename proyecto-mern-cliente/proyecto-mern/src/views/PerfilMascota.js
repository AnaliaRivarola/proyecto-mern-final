import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Menu from '../components/menu';
import PerroImg from "../assents/perro.png";
import GatoImg from "../assents/gato.png";
import '../estilos/perfilMascota.css';
const PerfilMascota = () => {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
  const edadTotalEnMeses = pet.edad; // Supongamos que pet.edad es el total en meses

  const años = Math.floor(edadTotalEnMeses / 12); // Calcula los años completos
  const meses = edadTotalEnMeses % 12; // Calcula los meses restantes
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
    <>
      <Menu />
      <div className=" gradient-custom">
        <div className="container-registro">
          <form >
            <div >




              {/* Centrar el título principal */}
              <div className="titulo-container">
                <h2 className="titulo-registro">{`Datos de  ${pet.nombre}`}</h2>
              </div>

              {/* Alinear datos descriptivos e imagen a la izquierda */}
              <div className="descripcion-imagen-container">
                <div className="descripcion" >
                  <p className=' linea'><strong  style={{ marginRight: '20px'}}>Tipo: </strong> {pet.tipo}</p>
                  <p className=' linea'><strong style={{ marginRight: '15px'}}>Raza: </strong>{pet.raza}</p>
                  <p className=' linea'><strong style={{ marginRight: '15px'}}>Edad: </strong>{Math.floor(pet.edad/12)} años, {pet.edad % 12} meses</p>
                  <p className=' linea'><strong style={{ marginRight: '17px'}}>Sexo: </strong>{pet.sexo}</p>
                  <p className=' linea'>{pet.otrosDatos}</p>
                   {/* <p className=' linea'><strong>En adopción:</strong> {pet.enAdopcion ? 'Sí' : 'No'}</p>*/}

                </div>

                <div className="imagen">
                  <img src={pet.tipo === 'Gato' ? GatoImg : PerroImg}  className="mascota-perfil" alt="Logo" />
                </div>
              </div>

              <div className="panel-botones">
                <button className="btn-save" onClick={adoptPet}>Adoptar a {pet.nombre}</button>
                <button className="btn-like" onClick={likePet} disabled={isLiked}>({likes})Like {pet.nombre}</button>
              </div>

              {/* Mostrar notificaciones si hay */}
              {notification && <p>{notification}</p>}
            </div>
          </form>
        </div>
      </div>
    </>

  );
};

export default PerfilMascota;
