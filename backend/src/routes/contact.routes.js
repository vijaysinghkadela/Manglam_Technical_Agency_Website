const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { validateContact } = require('../middleware/validators');

// POST /api/contact - Submit contact form
router.post('/', validateContact, contactController.submitContact);

// GET /api/contact - Get all contacts (admin)
router.get('/', contactController.getAllContacts);

module.exports = router;
