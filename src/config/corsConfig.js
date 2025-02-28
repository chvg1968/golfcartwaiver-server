const ALLOWED_ORIGINS = [
  'http://localhost:8888', 
  'https://golf-cart-waiver.netlify.app', 
  'http://localhost:3000',
  'https://golfcartwaiver-server.onrender.com',
  'https://golfcartwaiver-server.netlify.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Origen de la solicitud:', origin);

    if (!origin || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn('Origen no permitido:', origin);
      callback(new Error('Origen no permitido por CORS'));
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
  optionsSuccessStatus: 200
};

export default corsOptions;