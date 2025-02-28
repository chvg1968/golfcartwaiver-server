import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import corsOptions from './src/config/corsConfig.js';
import emailRoutes from './src/routes/emailRoutes.js';

const app = express();

// Middleware de seguridad
app.disable('x-powered-by');

// Configurar CORS globalmente
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// Rutas principales
app.use('/api', emailRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  console.warn(`Ruta no encontrada: ${req.method} ${req.path}`);
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada',
    path: req.path
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Error global:', err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Algo salió mal en el servidor',
    error: err.message
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});