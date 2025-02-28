import { Resend } from 'resend';
import { generateEmailHTML, generateEmailText } from '../utils/emailTemplate.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaiverEmail(req, res) {
  try {
    const { formData, pdfLink } = req.body;

    // Validar entrada
    if (!formData || !pdfLink) {
      return res.status(400).json({ 
        success: false, 
        error: 'Campos requeridos faltantes' 
      });
    }

    const emailPayload = {
      from: `Luxe Properties Golf Cart Waiver <onboarding@resend.dev>`,
      to: process.env.TEST_EMAIL,
      subject: 'Golf Cart Liability Waiver',
      html: generateEmailHTML(formData, pdfLink),
      text: generateEmailText(formData, pdfLink)
    };

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error('Error de envío de correo:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'No se pudo enviar el correo',
        details: error 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Correo enviado exitosamente',
      data 
    });

  } catch (error) {
    console.error('Error inesperado:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
}