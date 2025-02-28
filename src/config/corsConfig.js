const ALLOWED_ORIGINS = [
  'https://golf-cart-waiver.netlify.app',
  'http://localhost:3000',
  'http://localhost:8888'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = corsOptions;