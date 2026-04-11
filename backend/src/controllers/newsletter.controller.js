const newsletterService = require('../services/newsletter.service');

/**
 * Subscribe to newsletter
 */
exports.subscribe = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    
    const result = await newsletterService.subscribe({ email, name });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: result
    });
  } catch (error) {
    if (error.message === 'Already subscribed') {
      return res.status(400).json({
        success: false,
        message: 'Email already subscribed'
      });
    }
    next(error);
  }
};

/**
 * Unsubscribe from newsletter
 */
exports.unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    await newsletterService.unsubscribe(email);

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    next(error);
  }
};
