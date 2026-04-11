const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  services: [{
    type: String,
    enum: [
      'AI & Automation',
      'Social Media Marketing',
      'Cybersecurity',
      'SaaS & Web Development',
      'Branding & Identity',
      'Content Creation'
    ]
  }],
  budget: {
    type: String,
    enum: ['< ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000 - ₹5,00,000', '> ₹5,00,000', 'Not sure']
  },
  timeline: {
    type: String,
    enum: ['< 1 month', '1-3 months', '3-6 months', '> 6 months', 'Flexible']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [10000, 'Description cannot exceed 10000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'quoted', 'accepted', 'rejected', 'archived'],
    default: 'pending'
  },
  quotedAmount: {
    type: Number
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quote', quoteSchema);
