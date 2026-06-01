const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// @route   POST /api/inquiries
// @desc    Submit a new inquiry / contact request / quote request
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, companyName, subject, message, products } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone number, and message are required.'
      });
    }

    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      companyName,
      subject: subject || 'General Inquiry / Quote Request',
      message,
      products: products || []
    });

    const savedInquiry = await newInquiry.save();
    res.status(201).json({
      success: true,
      message: 'Your request was successfully submitted. Our team will contact you shortly.',
      data: savedInquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
