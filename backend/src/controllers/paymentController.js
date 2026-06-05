const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const Order = require('../models/Order');

exports.createStripeIntent = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100),
      currency: 'eur',
      metadata: { orderId: orderId }
    });

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateOrderPayment = async (req, res) => {
  try {
    const { orderId, paymentId, status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, {
      isPaid: true,
      paidAt: new Date(),
      status: 'paid',
      paymentResult: { id: paymentId, status, updateTime: new Date().toISOString() }
    }, { new: true });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
