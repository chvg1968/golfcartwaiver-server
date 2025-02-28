const nodemailer = require('nodemailer');
const emailTemplate = require('../utils/emailTemplate');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (req, res) => {
  try {
    const { to, subject, data } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: emailTemplate(data)
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};

module.exports = { sendEmail };
