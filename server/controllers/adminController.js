const User = require('../models/User');
const ProviderProfile = require('../models/ProviderProfile');
const Booking = require('../models/Booking');
const Service = require('../models/Service');

async function getDashboardMetrics(req, res) {
  const totalUsers = await User.countDocuments();
  const totalProviders = await User.countDocuments({ role: 'PROVIDER' });
  const totalBookings = await Booking.countDocuments();
  const revenueAgg = await Booking.aggregate([
    { $match: { status: { $in: ['CONFIRMED', 'PROVIDER_ACCEPTED', 'IN_PROGRESS', 'COMPLETED'] } } },
    { $group: { _id: null, total: { $sum: '$finalCost' } } },
  ]);
  res.json({
    totalUsers,
    totalProviders,
    totalBookings,
    revenue: revenueAgg[0]?.total || 0,
  });
}

async function listUsers(req, res) {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
}

async function listProviderProfiles(req, res) {
  const providers = await ProviderProfile.find().populate('userId', 'name email role');
  res.json(providers);
}

async function updateProviderStatus(req, res) {
  const profile = await ProviderProfile.findById(req.params.id);
  if (!profile) return res.status(404).json({ message: 'Provider profile not found' });
  profile.verificationStatus = req.body.verificationStatus || profile.verificationStatus;
  profile.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : profile.isAvailable;
  await profile.save();
  res.json(profile);
}

async function createService(req, res) {
  const service = await Service.create(req.body);
  res.status(201).json(service);
}

async function listServices(req, res) {
  const services = await Service.find();
  res.json(services);
}

module.exports = { getDashboardMetrics, listUsers, listProviderProfiles, updateProviderStatus, createService, listServices };
