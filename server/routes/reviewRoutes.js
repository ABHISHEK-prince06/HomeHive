const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { createReview, getReviewsForProvider } = require('../controllers/reviewController');

const router = express.Router();
router.post('/', authMiddleware, createReview);
router.get('/provider/:id', getReviewsForProvider);

module.exports = router;
