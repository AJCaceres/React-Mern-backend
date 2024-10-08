const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();


// Crear el server de express

const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

//Directorio publico
app.use( express.static('public'));

// Lectura y parseo del body
app.use(express.json())

//Rutas
// TODO aut - crear, login, renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// TODO CRUD - eventos

// Escuchas peticiones
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})