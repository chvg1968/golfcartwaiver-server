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

// Ruta principal para enviar correo
router.post('/send-waiver-email', sendWaiverEmail);

export default router;