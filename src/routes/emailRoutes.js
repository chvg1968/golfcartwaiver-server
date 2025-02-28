const express = require('express');
const { sendWaiverEmail } = require('../controllers/emailController');

const router = express.Router();

router.post('/send-waiver-email', sendWaiverEmail);

module.exports = router;