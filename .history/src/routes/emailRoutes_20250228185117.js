import express from 'express';
import { sendWaiverEmail } from '../controllers/emailController.js';

const router = express.Router();

// Middleware de logging
router.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Ruta principal para enviar correo
router.post('/send-waiver-email', sendWaiverEmail);

export default router;