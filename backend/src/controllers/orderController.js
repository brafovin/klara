const Order = require('../models/Order');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

exports.createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, couponCode } = req.body;

    let itemsPrice = 0;
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ success: false, message: `Product ${item.product} not found` });
      itemsPrice += (product.discountPrice || product.price) * item.quantity;
    }

    let discountAmount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (coupon && (!coupon.expiresAt || coupon.expiresAt > new Date()) && itemsPrice >= coupon.minOrder) {
        discountAmount = coupon.type === 'percentage'
          ? (itemsPrice * coupon.discount) / 100
          : coupon.discount;
        coupon.usedCount += 1;
        await coupon.save();
      }
    }

    const shippingPrice = itemsPrice > 50 ? 0 : 4.99;
    const totalPrice = itemsPrice - discountAmount + shippingPrice;

    const order = await Order.create({
      user: req.user?._id,
      guestEmail: !req.user ? req.body.guestEmail : undefined,
      orderItems,
      shippingAddress,
      paymentMethod,
      couponCode,
      itemsPrice,
      shippingPrice,
      discountAmount,
      totalPrice
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('orderItems.product', 'name images');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.user?.toString() !== req.user?._id?.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.validateCoupon = async (req, res) => {
  try {
    const { code, orderTotal } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon || (coupon.expiresAt && coupon.expiresAt < new Date())) {
      return res.status(404).json({ success: false, message: 'Invalid or expired coupon' });
    }
    if (orderTotal < coupon.minOrder) {
      return res.status(400).json({ success: false, message: `Minimum order: €${coupon.minOrder}` });
    }
    const discount = coupon.type === 'percentage'
      ? (orderTotal * coupon.discount) / 100
      : coupon.discount;
    res.json({ success: true, coupon: { code: coupon.code, discount, type: coupon.type, value: coupon.discount } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
