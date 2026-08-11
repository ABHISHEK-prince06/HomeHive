const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceRole: { type: String, required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  duration: { type: Number, required: true },
  numberOfDays: { type: Number, default: 1 },
  numberOfPeople: { type: Number, default: 1 },
  foodRequired: { type: Boolean, default: false },
  tip: { type: Number, default: 0 },
  baseCost: { type: Number, required: true },
  distance: { type: Number, required: true },
  distanceAdjustment: { type: Number, required: true },
  finalCost: { type: Number, required: true },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'PROVIDER_ACCEPTED', 'PROVIDER_REJECTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED'],
    default: 'PENDING',
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'AUTHORIZED', 'PAID', 'FAILED', 'REFUNDED'],
    default: 'PENDING',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
