const express = require('express');
const router = express.Router();
const { createOrder, getOrder, getMyOrders, validateCoupon } = require('../controllers/orderController');
const { protect, optionalAuth } = require('../middleware/auth');

router.post('/', optionalAuth, createOrder);
router.get('/my', protect, getMyOrders);
router.post('/validate-coupon', validateCoupon);
router.get('/:id', optionalAuth, getOrder);

module.exports = router;
