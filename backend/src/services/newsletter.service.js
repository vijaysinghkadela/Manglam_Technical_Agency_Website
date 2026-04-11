const Subscriber = require('../models/subscriber.model');
const emailService = require('./email.service');

/**
 * Subscribe to newsletter
 */
exports.subscribe = async ({ email, name }) => {
  // Check if already subscribed
  const existing = await Subscriber.findOne({ email });
  if (existing) {
    if (existing.isActive) {
      throw new Error('Already subscribed');
    }
    // Reactivate subscription
    existing.isActive = true;
    existing.name = name || existing.name;
    await existing.save();
    return existing;
  }

  const subscriber = new Subscriber({ email, name });
  await subscriber.save();

  // Send welcome email
  await emailService.sendWelcomeEmail(email, name);

  return subscriber;
};

/**
 * Unsubscribe from newsletter
 */
exports.unsubscribe = async (email) => {
  const subscriber = await Subscriber.findOne({ email });
  if (subscriber) {
    subscriber.isActive = false;
    await subscriber.save();
  }
  return true;
};

/**
 * Get all active subscribers
 */
exports.getAllSubscribers = async () => {
  return Subscriber.find({ isActive: true });
};
