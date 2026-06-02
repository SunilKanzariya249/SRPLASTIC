const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const compression = require('compression');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(compression());
app.use(cors({
  origin: ['https://srplastic-1.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/srplastic';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connection established successfully.'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// API Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));

// Serve product images statically from frontend public folder if in production,
// or serve them from D:\SRPLASTIC\product_images directly.
app.use('/product_images', express.static(path.join(__dirname, '../product_images')));

// Default Route
app.get('/', (req, res) => {
  res.send('SRPLASTIC API is running.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
