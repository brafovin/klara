const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');

exports.createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, title, comment } = req.body;

    const existing = await Review.findOne({ product: productId, user: req.user._id });
    if (existing) return res.status(400).json({ success: false, message: 'Already reviewed' });

    const hasBought = await Order.findOne({
      user: req.user._id,
      'orderItems.product': productId,
      isPaid: true
    });

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating, title, comment,
      isVerifiedPurchase: !!hasBought
    });

    const stats = await Review.aggregate([
      { $match: { product: review.product } },
      { $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);

    await Product.findByIdAndUpdate(productId, {
      rating: stats[0]?.avgRating || 0,
      numReviews: stats[0]?.count || 0
    });

    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
