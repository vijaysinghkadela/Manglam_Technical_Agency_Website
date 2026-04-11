const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletter.controller');
const { validateEmail } = require('../middleware/validators');

// POST /api/newsletter - Subscribe to newsletter
router.post('/subscribe', validateEmail, newsletterController.subscribe);

// DELETE /api/newsletter/unsubscribe - Unsubscribe
router.delete('/unsubscribe', validateEmail, newsletterController.unsubscribe);

module.exports = router;
