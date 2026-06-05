const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  sku: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  nameTranslations: {
    en: String,
    es: String,
    de: String
  },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  descriptionTranslations: {
    en: String,
    es: String,
    de: String
  },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  category: {
    type: String,
    required: true,
    enum: ['trikots', 'tshirts', 'hoodies', 'jacken', 'caps', 'schals', 'kinder', 'limited']
  },
  team: {
    type: String,
    enum: ['deutschland', 'brasilien', 'argentinien', 'frankreich', 'spanien', 'england', 'portugal', 'italien', 'usa', 'mexiko', 'other', 'neutral']
  },
  images: [{ url: String, alt: String }],
  variants: [variantSchema],
  totalStock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isLimited: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  tags: [String],
  weight: { type: Number },
  material: { type: String },
  saleEndsAt: Date
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
