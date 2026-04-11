const quoteService = require('../services/quote.service');

/**
 * Submit a new quote request
 */
exports.submitQuote = async (req, res, next) => {
  try {
    const quoteData = req.body;
    
    const result = await quoteService.createQuote(quoteData);

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all quotes (admin only)
 */
exports.getAllQuotes = async (req, res, next) => {
  try {
    const quotes = await quoteService.getAllQuotes();
    
    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes
    });
  } catch (error) {
    next(error);
  }
};
