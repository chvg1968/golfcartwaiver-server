const ALLOWED_ORIGINS = [
  'http://localhost:8888', 
  'https://golf-cart-waiver.netlify.app', 
  'http://localhost:3000',
  'http://localhost:3001',
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Origen de la solicitud:', origin);

    // Permitir solicitudes desde orígenes permitidos o sin origen (mismo origen)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('Origen no permitido:', origin);
      callback(null, false); // En lugar de error, solo bloquea el acceso
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
  optionsSuccessStatus: 204 // Mejor usar 204 para preflight
};

export default corsOptions;