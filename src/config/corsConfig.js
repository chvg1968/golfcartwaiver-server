const ALLOWED_ORIGINS = [
  'http://localhost:8888', 
  'https://golf-cart-waiver.netlify.app', 
  'http://localhost:3000',
  'http://localhost:3001',
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(`Solicitud desde origen: ${origin || 'sin origen'}`);

    // Si no hay origen (como solicitudes del mismo origen) o está en la lista de orígenes permitidos
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Origen no permitido: ${origin}`);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Origin', 
    'X-Requested-With', 
    'Content-Type', 
    'Accept', 
    'Authorization'
  ],
  credentials: true,
  optionsSuccessStatus: 200, // Algunos navegadores requieren 200 para preflight
  maxAge: 86400 // Caché de preflight por 24 horas
};

export default corsOptions;