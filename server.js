import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import emailRoutes from './src/routes/emailRoutes.js';
import corsOptions from './src/config/corsConfig.js';

const app = express();

// Middleware de registro de solicitudes
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, path, headers } = req;
  
  console.log(`[${timestamp}] ${method} ${path}`);
  console.log('Cabeceras:', JSON.stringify(headers, null, 2));
  
  if (method === 'POST' || method === 'PUT') {
    console.log('Cuerpo de la solicitud:', JSON.stringify(req.body, null, 2));
  }

  // Interceptar y loggear la respuesta
  const oldJson = res.json;
  res.json = function(body) {
    console.log(`[${timestamp}] Respuesta JSON para ${method} ${path}:`);
    console.log('Código de estado:', res.statusCode);
    console.log('Cuerpo de la respuesta:', JSON.stringify(body, null, 2));
    return oldJson.call(this, body);
  };

  next();
});

// Middleware de seguridad
app.disable('x-powered-by');

// Middleware CORS global
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:8888', 
    'https://golf-cart-waiver.netlify.app',
    'http://localhost:3000',
    'https://golfcartwaiver-server.netlify.app'
  ];
  const origin = req.headers.origin;

  console.log('Origen de la solicitud:', origin);

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  
  // Responder a solicitudes OPTIONS
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

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

// Proxy para desarrollo local
app.use('/proxy/send-waiver-email', (req, res, next) => {
  console.log('Solicitud de proxy recibida:', req.method, req.path);
  console.log('Cuerpo de la solicitud:', req.body);
  
  // Reenviar la solicitud a la ruta de API
  req.url = '/api/send-waiver-email';
  next('route');
});

// Proxy para producción
app.use('/proxy', createProxyMiddleware({
  target: 'https://golfcartwaiver-server.netlify.app',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '/api'
  },
  onProxyReq: (proxyReq, req, res) => {
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

// Manejo de rutas no encontradas
app.use((req, res, next) => {
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

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('===== INICIO DEL SERVIDOR =====');
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log('Rutas disponibles:');
  console.log('- GET /: Health check');
  console.log('- POST /api/send-waiver-email: Envío de waiver');
  console.log('Orígenes CORS permitidos:');
  console.log('- http://localhost:8888');
  console.log('- https://golf-cart-waiver.netlify.app');
  console.log('- http://localhost:3000');
  console.log('- https://golfcartwaiver-server.netlify.app');
  console.log('===== SERVIDOR INICIADO =====');
});

// Manejo de cierre graciosos del servidor
process.on('SIGTERM', () => {
  console.log('Proceso SIGTERM recibido. Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});