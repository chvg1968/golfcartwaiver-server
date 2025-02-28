import express from 'express';
import { sendWaiverEmail } from '../controllers/emailController.js';

const router = express.Router();

// Middleware de logging para la ruta
router.use('/send-waiver-email', (req, res, next) => {
  console.log('Solicitud recibida en /send-waiver-email');
  console.log('Método:', req.method);
  console.log('Cabeceras:', req.headers);
  console.log('Cuerpo de la solicitud:', req.body);
  next();
});

// Ruta OPTIONS para manejar preflight
router.options('/send-waiver-email', (req, res) => {
  console.log('Solicitud OPTIONS recibida en /send-waiver-email');
  
  const allowedOrigins = [
    'http://localhost:8888', 
    'https://golf-cart-waiver.netlify.app',
    'http://localhost:3000',
    'https://golfcartwaiver-server.onrender.com'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // Caché de preflight por 24 horas
  
  res.sendStatus(200);
});

// Ruta principal para enviar correo
router.post('/send-waiver-email', sendWaiverEmail);

export default router;