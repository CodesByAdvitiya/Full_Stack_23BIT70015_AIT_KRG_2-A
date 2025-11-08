// models/Product.js
const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true },         // unique per product ideally
  color: String,
  size: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0, min: 0 }
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  name: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: String,
  categories: [{ type: String, index: true }],
  variants: [variantSchema],   // nested documents for variants
  reviews: [reviewSchema],     // embedded reviews
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

// Compound index example: speed up category + price queries (uses variants.price via $unwind for queries)
productSchema.index({ name: 'text', categories: 1 });

// Pre-save timestamp
productSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);
