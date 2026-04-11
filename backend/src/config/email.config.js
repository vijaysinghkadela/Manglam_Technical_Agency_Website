require('dotenv').config();

module.exports = {
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  from: process.env.EMAIL_FROM || 'MTA <noreply@manglamtechnicalagency.com>',
  adminEmail: process.env.ADMIN_EMAIL || 'manglamtechnicalagency@gmail.com'
};
