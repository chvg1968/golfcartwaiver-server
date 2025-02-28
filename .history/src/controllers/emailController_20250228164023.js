import { Resend } from 'resend';
import { generateEmailHTML, generateEmailText } from '../utils/emailTemplate.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaiverEmail(req, res) {
  console.log('===== INICIO sendWaiverEmail =====');
  console.log('Método de solicitud:', req.method);
  console.log('Cabeceras de la solicitud:', req.headers);
  console.log('Cuerpo de la solicitud RAW:', req.body);

  try {
    const { formData, pdfLink } = req.body;

    // Validaciones exhaustivas
    if (!formData) {
      console.error('Error: Datos de formulario faltantes');
      return res.status(400).json({ 
        success: false, 
        error: 'Datos de formulario requeridos',
        details: 'formData no puede estar vacío'
      });
    }

    if (!pdfLink) {
      console.error('Error: Enlace PDF faltante');
      return res.status(400).json({ 
        success: false, 
        error: 'Enlace PDF requerido',
        details: 'pdfLink no puede estar vacío'
      });
    }

    console.log('Datos de formulario recibidos:', JSON.stringify(formData, null, 2));
    console.log('Enlace PDF:', pdfLink);

    const emailPayload = {
      from: `Luxe Properties Golf Cart Waiver from ${formData.guestName} <onboarding@resend.dev>`,
      to: process.env.TEST_EMAIL,
      subject: 'Golf Cart Liability Waiver',
      html: generateEmailHTML(formData, pdfLink),
      text: generateEmailText(formData, pdfLink)
    };

    console.log('Payload de correo preparado');

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error('Error de envío de correo:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'No se pudo enviar el correo',
        details: error 
      });
    }

    console.log('Correo enviado exitosamente');
    console.log('===== FIN sendWaiverEmail =====');
    
    res.status(200).json({ 
      success: true, 
      message: 'Correo enviado exitosamente',
      data 
    });

  } catch (error) {
    console.error('Error inesperado:', error);
    console.log('===== FIN sendWaiverEmail (con error) =====');
    
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor',
      details: error.message,
      stack: error.stack
    });
  }
}