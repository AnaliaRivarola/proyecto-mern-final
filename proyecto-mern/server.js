const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path'); // Opcional, si necesitas trabajar con rutas de archivo
const fs = require('fs');

const app = express();
const port = 8000;

// Configura multer
const upload = multer({ dest: 'uploads/' });

// Define las rutas
app.post('/api/pets', upload.single('imagenMascota'), (req, res) => {
    console.log(req.file); // Verifica la información del archivo recibido
    saveImage(req.file);
    res.send('Termina');
});

function saveImage(file) {
    const newPath = `./uploads/${file.originalname}`;
    // Renombra el archivo a la nueva ruta
    fs.renameSync(file.path, newPath);
    return newPath;
}

require('./config/baseDatos');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Incluye las rutas desde otro archivo
require('./routes/rutaMascota')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
