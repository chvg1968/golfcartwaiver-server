import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import corsOptions from './src/config/corsConfig.js';
import emailRoutes from './routes/emailRoutes.js';

const app = express();

// Use the imported CORS options
app.use(cors(corsOptions));

// Middleware to handle preflight requests
app.options('*', cors(corsOptions));

// Middlewares globales
app.disable('x-powered-by');
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