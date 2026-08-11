const ProviderProfile = require('../models/ProviderProfile');
const User = require('../models/User');

async function getProviderProfile(req, res) {
  const provider = await ProviderProfile.findOne({ userId: req.params.id }).populate('userId', 'name email phone');
  if (!provider) return res.status(404).json({ message: 'Provider not found' });
  res.json(provider);
}

async function updateProviderProfile(req, res) {
  const profile = await ProviderProfile.findOne({ userId: req.user._id });
  if (!profile) return res.status(404).json({ message: 'Profile not found' });

  Object.assign(profile, req.body);
  profile.updatedAt = new Date();
  if (req.body.skills && req.body.serviceRoles) {
    profile.profileCompleted = true;
  }

  await profile.save();
  res.json(profile);
}

async function getProviderAvailability(req, res) {
  const profile = await ProviderProfile.findOne({ userId: req.params.id });
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  res.json(profile.availability);
}

module.exports = { getProviderProfile, updateProviderProfile, getProviderAvailability };
