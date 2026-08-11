const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { createBooking, listBookings, getBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');

const router = express.Router();
router.use(authMiddleware);
router.post('/', createBooking);
router.get('/', listBookings);
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router;
