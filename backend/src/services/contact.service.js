const Contact = require('../models/contact.model');
const emailService = require('./email.service');

/**
 * Create a new contact submission
 */
exports.createContact = async (contactData) => {
  const contact = new Contact(contactData);
  await contact.save();

  // Send notification email to admin
  await emailService.sendContactNotification(contactData);

  // Send confirmation email to user
  await emailService.sendContactConfirmation(contactData.email, contactData.name);

  return contact;
};

/**
 * Get all contacts
 */
exports.getAllContacts = async () => {
  return Contact.find().sort({ createdAt: -1 });
};

/**
 * Get contact by ID
 */
exports.getContactById = async (id) => {
  return Contact.findById(id);
};
