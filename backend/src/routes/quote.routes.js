const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quote.controller');
const { validateQuote } = require('../middleware/validators');

// POST /api/quote - Submit quote request
router.post('/', validateQuote, quoteController.submitQuote);

// GET /api/quote - Get all quotes (admin)
router.get('/', quoteController.getAllQuotes);

module.exports = router;
