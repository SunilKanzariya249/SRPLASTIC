const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  products: [{
    productId: {
      type: String
    },
    name: String,
    quantity: String
  }],
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Resolved'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inquiry', inquirySchema);
