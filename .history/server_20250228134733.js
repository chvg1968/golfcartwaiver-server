require('dotenv').config();
const express = require('express');
const cors = require('cors');
const emailRoutes = require('./src/routes/emailRoutes');
const corsOptions = require('./src/config/corsConfig');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', emailRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString() 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});