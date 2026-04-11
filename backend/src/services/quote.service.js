const Quote = require('../models/quote.model');
const emailService = require('./email.service');

/**
 * Create a new quote request
 */
exports.createQuote = async (quoteData) => {
  const quote = new Quote(quoteData);
  await quote.save();

  // Send notification email to admin
  await emailService.sendQuoteNotification(quoteData);

  // Send confirmation email to user
  await emailService.sendQuoteConfirmation(quoteData.email, quoteData.name);

  return quote;
};

/**
 * Get all quotes
 */
exports.getAllQuotes = async () => {
  return Quote.find().sort({ createdAt: -1 });
};

/**
 * Get quote by ID
 */
exports.getQuoteById = async (id) => {
  return Quote.findById(id);
};

/**
 * Update quote status
 */
exports.updateQuoteStatus = async (id, status) => {
  return Quote.findByIdAndUpdate(id, { status }, { new: true });
};
