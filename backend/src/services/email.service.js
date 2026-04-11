const nodemailer = require('nodemailer');
const config = require('../config/email.config');

// Create transporter
const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass
  }
});

/**
 * Send contact form notification to admin
 */
exports.sendContactNotification = async (contactData) => {
  const mailOptions = {
    from: config.from,
    to: config.adminEmail,
    subject: `New Contact Form Submission - ${contactData.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${contactData.company || 'Not provided'}</p>
      <p><strong>Service:</strong> ${contactData.service || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message}</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send confirmation email to contact form submitter
 */
exports.sendContactConfirmation = async (email, name) => {
  const mailOptions = {
    from: config.from,
    to: email,
    subject: 'Thank you for contacting MTA',
    html: `
      <h2>Thank you for reaching out, ${name}!</h2>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <p>Best regards,<br>Manglam Technical Agency</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send quote notification to admin
 */
exports.sendQuoteNotification = async (quoteData) => {
  const mailOptions = {
    from: config.from,
    to: config.adminEmail,
    subject: `New Quote Request - ${quoteData.name}`,
    html: `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${quoteData.name}</p>
      <p><strong>Email:</strong> ${quoteData.email}</p>
      <p><strong>Phone:</strong> ${quoteData.phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${quoteData.company || 'Not provided'}</p>
      <p><strong>Services:</strong> ${quoteData.services?.join(', ') || 'Not specified'}</p>
      <p><strong>Budget:</strong> ${quoteData.budget || 'Not specified'}</p>
      <p><strong>Timeline:</strong> ${quoteData.timeline || 'Not specified'}</p>
      <p><strong>Description:</strong></p>
      <p>${quoteData.description}</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send confirmation email to quote requester
 */
exports.sendQuoteConfirmation = async (email, name) => {
  const mailOptions = {
    from: config.from,
    to: email,
    subject: 'Quote Request Received - MTA',
    html: `
      <h2>Thank you for your quote request, ${name}!</h2>
      <p>We have received your request and our team will prepare a customized quote for you.</p>
      <p>You can expect to hear from us within 1-2 business days.</p>
      <p>Best regards,<br>Manglam Technical Agency</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send welcome email to newsletter subscriber
 */
exports.sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: config.from,
    to: email,
    subject: 'Welcome to MTA Newsletter!',
    html: `
      <h2>Welcome to MTA Newsletter${name ? `, ${name}` : ''}!</h2>
      <p>Thank you for subscribing to our newsletter.</p>
      <p>You'll receive updates about:</p>
      <ul>
        <li>Latest tech trends and insights</li>
        <li>Our new services and offerings</li>
        <li>Industry news and tips</li>
      </ul>
      <p>Best regards,<br>Manglam Technical Agency</p>
    `
  };

  return transporter.sendMail(mailOptions);
};
