const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const http = require('http');
const { Server } = require('socket.io');
const routerUsuario = require('./routes/rutaUsuario');
require('./config/baseDatos'); // Asegúrate de que tu configuración de base de datos esté funcionando

const app = express();
const port = 8000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Puerto del cliente
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: "http://localhost:3000", // Permite el dominio de tu frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('adoptionRequest', (data) => {
        console.log('Adoption request received:', data);
        // Envía una notificación al rescatista
        io.emit('adoptionRequestNotification', data);
    });

    socket.on('acceptAdoption', (data) => {
        console.log('Adoption accepted:', data);
        // Envía una notificación al adoptante
        io.to(data.adoptanteSocketId).emit('adoptionStatus', { status: 'accepted' });
    });

    socket.on('rejectAdoption', (data) => {
        console.log('Adoption rejected:', data);
        // Envía una notificación al adoptante
        io.to(data.adoptanteSocketId).emit('adoptionStatus', { status: 'rejected' });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Configura multer
const upload = multer({ dest: 'uploads/' });

// Define las rutas
app.post('/images/single', upload.single('imagenMascota'), (req, res) => {
    console.log(req.file); // Verifica la información del archivo recibido
    saveImage(req.file);
    res.send('Termina');
});

function saveImage(file) {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath); // Renombra el archivo a la nueva ruta
    return newPath;
}

// Configura middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Incluye las rutas desde otro archivo
require('./routes/rutaMascota')(app);
app.use('/usuario', routerUsuario); 

// Inicia el servidor
server.listen(port, () => console.log(`Listening on port: ${port}`));
