import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import emailRoutes from './src/routes/emailRoutes.js';

const app = express();

// Middleware de registro de solicitudes
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  console.log('Cabeceras:', JSON.stringify(req.headers, null, 2));

  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Cuerpo de la solicitud:', JSON.stringify(req.body, null, 2));
  }

  next();
});

// Middleware de seguridad
app.disable('x-powered-by');

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:8888',
  'https://golf-cart-waiver.netlify.app',
  'http://localhost:3000',
  'https://golfcartwaiver-server.onrender.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('Origen no permitido:', origin);
      callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json({
  limit: '10kb',
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      console.error('Error de parsing JSON:', e);
      throw new Error('Invalid JSON');
    }
  }
}));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// Rutas principales
app.use('/api', emailRoutes);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Backend server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    apiEndpoint: '/api/send-waiver-email',
    proxyEndpoint: '/proxy/send-waiver-email'
  });
});

// Proxy para producción
app.use('/proxy', createProxyMiddleware({
  target: 'https://golfcartwaiver-server.onrender.com',
  changeOrigin: true,
  pathRewrite: { '^/proxy': '/api' },
  onProxyReq: (proxyReq, req) => {
    console.log('Redirigiendo solicitud proxy:', req.method, req.path);
  },
  onError: (err, req, res) => {
    console.error('Error en proxy:', err);
    res.status(500).json({
      status: 'error',
      message: 'Error en el proxy',
      details: err.message
    });
  }
}));

// Manejo de rutas no encontradas
app.use((req, res) => {
  console.warn(`Ruta no encontrada: ${req.method} ${req.path}`);
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada',
    path: req.path
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error global:', err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Algo salió mal en el servidor',
    error: err.message
  });
});

const PORT = process.env.PORT || (process.env.NODE_ENV === 'development' ? 10000 : 8080);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT} en entorno ${process.env.NODE_ENV || 'development'}`);
});

// Manejo de cierre del servidor
process.on('SIGTERM', () => {
  console.log('Proceso SIGTERM recibido. Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});
