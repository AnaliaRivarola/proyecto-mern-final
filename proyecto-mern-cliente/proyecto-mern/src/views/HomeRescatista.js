import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Menu from '../components/menu';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../estilos/HomeRescatista.css';
import { io } from 'socket.io-client';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HomeRescatista = () => {
  const [summary, setSummary] = useState({});
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]); // Estado para las solicitudes
  const navigate = useNavigate();
  const socketRef = useRef(); // Usar useRef para la instancia del socket

  useEffect(() => {
    // Inicializar el socket solo una vez
    socketRef.current = io('http://localhost:8000'); 

    // Obtener mascotas
    axios.get('/api/pets')
      .then(res => {
        const mascotas = res.data;
        const disponibles = mascotas.filter(pet => pet.disponible).length;
        const adoptadas = mascotas.length - disponibles;
        const likesPromedio = mascotas.reduce((acc, pet) => acc + pet.likes, 0) / mascotas.length;

        setSummary({
          totalMascotas: mascotas.length,
          disponibles,
          adoptadas,
          likesPromedio: likesPromedio.toFixed(2),
        });
        setPets(mascotas);
      })
      .catch(err => console.error(err));

    // Escuchar solicitudes de adopción
    socketRef.current.on('adoptionRequestNotification', (data) => {
      console.log('Solicitud de adopción recibida:', data);
      setRequests(prev => [...prev, data]);
    });

    socketRef.current.on('adoptionStatus', (data) => {
      console.log('Notificación de adopción recibida:', data);
      // Maneja la notificación (actualiza la UI, etc.)
    });

    return () => {
      socketRef.current.disconnect(); // Desconectar el socket cuando el componente se desmonte
    };
  }, []);

  const data = {
    labels: ['Total', 'Disponibles', 'Adoptadas'],
    datasets: [
      {
        label: 'Cantidad de Mascotas',
        data: [summary.totalMascotas, summary.disponibles, summary.adoptadas],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Estadísticas de Mascotas',
      },
    },
  };

  const crearmascota = () => {
    navigate('/pets/new');
  };

  const HomeRescatista = () => {
    navigate('/HomeRescatista');
  };

  const handleAccept = (adoptanteSocketId, petId) => {
    socketRef.current.emit('acceptAdoption', { adoptanteSocketId, petId });
    // Remove request from the list after accepting
    setRequests(prev => prev.filter(req => req.petId !== petId));
  };

  const handleReject = (adoptanteSocketId, petId) => {
    socketRef.current.emit('rejectAdoption', { adoptanteSocketId, petId });
    // Remove request from the list after rejecting
    setRequests(prev => prev.filter(req => req.petId !== petId));
  };

  return (
    <>
      <Menu />
      <div className="home-page body-registro fondo-registro">
        <div className="container">
          <div className="left-column">
            <div className="panel-resumen titulo">
              <h2 >Resumen</h2>
              <p>Total de Mascotas Registradas: {summary.totalMascotas}</p>
              <p>Mascotas Disponibles: {summary.disponibles}</p>
              <p>Mascotas Adoptadas: {summary.adoptadas}</p>
              <p>Likes Promedio: {summary.likesPromedio}</p>
            </div>

            <div className="estadisticas">
              <h2>Estadísticas</h2>
              <Bar data={data} options={options} />
            </div>
          </div>

          <div className="right-column">
            <div className="acceso-rapido">
              <h2  >Acceso Rápido</h2>
              <button id="nuevo" onClick={crearmascota}>Agregar Mascota</button>
              <button id="lista" onClick={HomeRescatista}>Lista de Mascotas</button>
            </div>

            <div className="solicitudes">
              <h2 className="titulo">Solicitudes</h2>
              {requests.length > 0 ? (
                requests.map((request, index) => (
                  <div key={index}>
                    <p>Enhorabuena!!</p>
                    <p>La mascota: {request.nombre} </p>
                    <p>Ha sido solicitado para adopcion</p> {/* Muestra el nombre de la mascota */}
                    <button onClick={() => handleAccept(request.adoptanteSocketId, request.petId)}>Aceptar</button>
                    <button onClick={() => handleReject(request.adoptanteSocketId, request.petId)}>Rechazar</button>
                  </div>
                ))
              ) : (
                <p>No hay solicitudes pendientes.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeRescatista;
