const Review = require('../models/Review');
const Booking = require('../models/Booking');
const ProviderProfile = require('../models/ProviderProfile');

async function createReview(req, res) {
  const { bookingId, rating, comment } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking || booking.customerId.toString() !== req.user._id.toString() || booking.status !== 'COMPLETED') {
    return res.status(400).json({ message: 'Review not allowed' });
  }

  const existing = await Review.findOne({ bookingId });
  if (existing) {
    return res.status(400).json({ message: 'You have already reviewed this booking.' });
  }

  const review = await Review.create({
    bookingId,
    customerId: req.user._id,
    providerId: booking.providerId,
    rating,
    comment,
  });

  const providerProfile = await ProviderProfile.findOne({ userId: booking.providerId });
  if (providerProfile) {
    const totalRating = providerProfile.rating * providerProfile.reviewCount + rating;
    providerProfile.reviewCount += 1;
    providerProfile.rating = totalRating / providerProfile.reviewCount;
    await providerProfile.save();
  }

  res.status(201).json(review);
}

async function getReviewsForProvider(req, res) {
  const reviews = await Review.find({ providerId: req.params.id }).sort({ createdAt: -1 });
  res.json(reviews);
}

module.exports = { createReview, getReviewsForProvider };
