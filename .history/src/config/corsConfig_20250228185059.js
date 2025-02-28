const ALLOWED_ORIGINS = [
  'http://localhost:8888', 
  'https://golf-cart-waiver.netlify.app', 
  'http://localhost:3000',
  'http://localhost:3001',
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log(`Solicitud desde origen: ${origin || 'sin origen'}`);

    // Permitir si el origen está en la lista o si no hay origen (ej. solicitudes locales)
    const isAllowed = !origin || ALLOWED_ORIGINS.includes(origin);
    
    callback(null, isAllowed || false);
  },
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204, // Responde 204 en preflight requests para evitar errores en algunos navegadores
};

export default corsOptions;