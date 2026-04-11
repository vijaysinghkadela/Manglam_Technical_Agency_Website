const { body, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

/**
 * Validate contact form
 */
exports.validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 5000 }).withMessage('Message cannot exceed 5000 characters'),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('service').optional().trim(),
  handleValidationErrors
];

/**
 * Validate quote request
 */
exports.validateQuote = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  body('description')
    .trim()
    .notEmpty().withMessage('Project description is required')
    .isLength({ max: 10000 }).withMessage('Description cannot exceed 10000 characters'),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('services').optional().isArray(),
  body('budget').optional().trim(),
  body('timeline').optional().trim(),
  handleValidationErrors
];

/**
 * Validate email (for newsletter)
 */
exports.validateEmail = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  body('name').optional().trim(),
  handleValidationErrors
];
