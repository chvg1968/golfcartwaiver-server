const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const corsConfig = require('./src/config/corsConfig');
const emailRoutes = require('./src/routes/emailRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Apply CORS configuration
app.use(cors(corsConfig));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/email', emailRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
