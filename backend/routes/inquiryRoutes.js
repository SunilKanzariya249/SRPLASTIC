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

    // Trigger Web3Forms Email Notification
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || '211fba8c-8248-4b56-8890-ec7281e2f3ee';
    try {
      const https = require('https');
      let emailMessage = `
New Website Inquiry Received!

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${companyName || 'N/A'}
Subject: ${subject || 'General Inquiry / Quote Request'}
Message: ${message}
`;

      if (products && products.length > 0) {
        emailMessage += `\nRequested Products List:\n`;
        products.forEach((p, idx) => {
          emailMessage += `- Name: ${p.name} (Quantity: ${p.quantity})\n`;
        });
      }

      const postData = JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        subject: `SRPLASTIC Form: ${subject || 'New Inquiry'}`,
        message: emailMessage
      });

      const options = {
        hostname: 'api.web3forms.com',
        port: 443,
        path: '/submit',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const reqWeb3 = https.request(options, (resWeb3) => {
        let body = '';
        resWeb3.on('data', (chunk) => body += chunk);
        resWeb3.on('end', () => {
          console.log('Web3Forms notification sent successfully.');
        });
      });

      reqWeb3.on('error', (e) => {
        console.error('Web3Forms email delivery error:', e.message);
      });

      reqWeb3.write(postData);
      reqWeb3.end();
    } catch (err) {
      console.error('Web3Forms trigger failed:', err);
    }

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
