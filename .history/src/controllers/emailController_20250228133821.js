const { Resend } = require('resend');
const { generateEmailHTML, generateEmailText } = require('../utils/emailTemplate');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWaiverEmail(req, res) {
  try {
    const { formData, pdfLink } = req.body;

    // Validate input
    if (!formData || !pdfLink) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    const emailPayload = {
      from: `Luxe Properties Golf Cart Waiver from ${formData.guestName} <onboarding@resend.dev>`,
      to: process.env.TEST_EMAIL,
      subject: 'Golf Cart Liability Waiver',
      html: generateEmailHTML(formData, pdfLink),
      text: generateEmailText(formData, pdfLink)
    };

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error('Email sending error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send email',
        details: error 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      data 
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      details: error.message 
    });
  }
}

module.exports = { sendWaiverEmail };