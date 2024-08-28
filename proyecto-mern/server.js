const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const http = require('http');
const { Server } = require('socket.io');
const routerUsuario = require('./routes/rutaUsuario');
const Pet = require('./models/modeloMascota');
require('./config/baseDatos'); // Asegúrate de que tu configuración de base de datos esté funcionando

const app = express();
const port = 8000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Puerto del cliente
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

app.use(cors({
    origin: "http://localhost:3000", // Permite el dominio de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('adoptionRequest', async (data) => {
        console.log('Adoption request received:', data);
        
        try {
            const pet = await Pet.findById(data.petId);
            if (pet) {
                const petData = {
                    ...data,
                    nombre: pet.nombre
                };
                io.emit('adoptionRequestNotification', petData);
            } else {
                console.log('Mascota no encontrada');
            }
        } catch (error) {
            console.error('Error al buscar la mascota:', error);
        }
    });

    socket.on('acceptAdoption', (data) => {
        console.log('Adoption accepted:', data);
        io.to(data.adoptanteSocketId).emit('adoptionStatus', { status: 'accepted' });
    });

    socket.on('rejectAdoption', (data) => {
        console.log('Adoption rejected:', data);
        io.to(data.adoptanteSocketId).emit('adoptionStatus', { status: 'rejected' });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Configura middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Incluye las rutas desde otro archivo
require('./routes/rutaMascota')(app);
app.use('/usuario', routerUsuario); 

// Inicia el servidor
server.listen(port, () => console.log(`Listening on port: ${port}`));
