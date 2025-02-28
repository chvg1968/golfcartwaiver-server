const ALLOWED_ORIGINS = [
  'https://golf-cart-waiver.netlify.app',
  'http://localhost:3000',
  'http://localhost:8888',
  'https://golfcartwaiver-server.netlify.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como solicitudes de herramientas de desarrollo)
    if (!origin || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
};

export default corsOptions;