const express = require('express');
const router = express.Router();
const { createReview, getProductReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.get('/:productId', getProductReviews);
router.post('/:productId', protect, createReview);

module.exports = router;
