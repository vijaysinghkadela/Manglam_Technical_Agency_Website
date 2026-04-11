const contactService = require('../services/contact.service');

/**
 * Submit a new contact form
 */
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, company, message, service } = req.body;
    
    const result = await contactService.createContact({
      name,
      email,
      phone,
      company,
      message,
      service
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all contacts (admin only)
 */
exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactService.getAllContacts();
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};
