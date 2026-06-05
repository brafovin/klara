const express = require('express');
const router = express.Router();
const { createStripeIntent, updateOrderPayment } = require('../controllers/paymentController');
const { optionalAuth } = require('../middleware/auth');

router.post('/stripe/create-intent', optionalAuth, createStripeIntent);
router.post('/update', optionalAuth, updateOrderPayment);

module.exports = router;
