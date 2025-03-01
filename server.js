import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import corsOptions from './src/config/corsConfig.js';
import emailRoutes from './src/routes/emailRoutes.js';

const app = express();

// Middleware for logging requests (optional, but helpful for debugging)
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url} from origin: ${req.get('origin')}`);
  next();
});

// CORS configuration with more explicit handling
app.use((req, res, next) => {
  const origin = req.header('Origin');
  if (origin && corsOptions.origin(origin, (err, allow) => allow)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', corsOptions.methods.join(', '));
    res.header('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(', '));
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

// Use CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
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
  res.status(500).json({ 
    error: 'Error interno del servidor', 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
  });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});