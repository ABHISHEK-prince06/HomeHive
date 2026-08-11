const Booking = require('../models/Booking');
const ProviderProfile = require('../models/ProviderProfile');

async function createBooking(req, res) {
  const { providerId, serviceRole, date, startTime, duration, numberOfDays, numberOfPeople, foodRequired, tip, distance, distanceAdjustment, baseCost, finalCost } = req.body;

  const providerProfile = await ProviderProfile.findOne({ userId: providerId });
  if (!providerProfile) return res.status(404).json({ message: 'Provider not found' });

  const bookingDate = new Date(date);
  const endTime = addHours(startTime, duration);
  const conflict = await Booking.findOne({
    providerId,
    date: bookingDate,
    status: { $nin: ['CANCELLED', 'REJECTED', 'COMPLETED'] },
    $expr: {
      $not: {
        $or: [
          { $lte: ['$endTime', startTime] },
          { $gte: ['$startTime', endTime] },
        ],
      },
    },
  });

  if (conflict) {
    return res.status(400).json({ message: 'This professional is unavailable for the selected time.' });
  }

  const booking = await Booking.create({
    customerId: req.user._id,
    providerId,
    serviceRole,
    date: bookingDate,
    startTime,
    endTime,
    duration,
    numberOfDays,
    numberOfPeople,
    foodRequired,
    tip,
    baseCost,
    distance,
    distanceAdjustment,
    finalCost,
    status: 'PENDING',
    paymentStatus: 'PENDING',
  });

  res.status(201).json(booking);
}

async function listBookings(req, res) {
  const query = {};
  if (req.user.role === 'CUSTOMER') query.customerId = req.user._id;
  if (req.user.role === 'PROVIDER') query.providerId = req.user._id;

  const bookings = await Booking.find(query).sort({ date: -1 });
  res.json(bookings);
}

async function getBooking(req, res) {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
}

async function updateBooking(req, res) {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  if (req.body.status) {
    booking.status = req.body.status;
  }
  if (req.body.paymentStatus) {
    booking.paymentStatus = req.body.paymentStatus;
  }

  await booking.save();
  res.json(booking);
}

async function deleteBooking(req, res) {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json({ message: 'Booking removed' });
}

function addHours(timeString, hours) {
  const [hour, minute] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hour + hours, minute);
  return date.toTimeString().slice(0, 5);
}

module.exports = { createBooking, listBookings, getBooking, updateBooking, deleteBooking };
