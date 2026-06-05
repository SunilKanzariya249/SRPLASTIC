const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Paver Block Plastic Mould', 'Paver Block PVC Rubber Mould', 'Cover Block', 'Paver Block Machinery', 'Iron Oxide Color', 'Paver Block Chemicals', 'Recycle Plastic Sheet'],
    index: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  pageNumber: {
    type: Number,
    required: true
  },
  imageName: {
    type: String,
    required: true
  },
  specifications: {
    type: Map,
    of: String
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
