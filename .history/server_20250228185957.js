import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsConfig.js';
import emailRoutes from './routes/emailRoutes.js';

const app = express();

const cors = require("cors");
const express = require("express");
const app = express();

const corsOptions = {
  origin: "https://golf-cart-waiver.netlify.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true, // Si necesitas enviar cookies o headers de autenticación
};

app.use(cors(corsOptions));

// O manualmente en cada respuesta si no quieres usar `cors()`
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://golf-cart-waiver.netlify.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Ruta para manejar el preflight request (opcional, si aún falla)
app.options("*", (req, res) => {
  res.sendStatus(200);
});



// Middlewares globales
app.disable('x-powered-by');
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// Rutas API
app.use('/api', emailRoutes);

app.get('/', (req, res) => res.send('🚀 Servidor en línea'));


// Middleware de rutas no encontradas
app.use((req, res) => {
  console.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Ruta no encontrada', path: req.originalUrl });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Error en el servidor:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor', message: err.message });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`));