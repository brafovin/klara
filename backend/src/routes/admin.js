const express = require('express');
const router = express.Router();
const { getDashboard, getAllOrders, updateOrderStatus, getAllUsers, createCoupon, getCoupons } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.use(protect, admin);

router.get('/dashboard', getDashboard);
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatus);
router.get('/users', getAllUsers);
router.get('/coupons', getCoupons);
router.post('/coupons', createCoupon);

module.exports = router;
