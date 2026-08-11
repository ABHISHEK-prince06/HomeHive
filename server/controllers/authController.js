const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ProviderProfile = require('../models/ProviderProfile');

function createToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

async function register(req, res) {
  const { name, email, phone, password, role, gender, location, serviceRole } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    phone,
    passwordHash,
    role: role === 'PROVIDER' ? 'PROVIDER' : 'CUSTOMER',
    isProvider: role === 'PROVIDER',
    gender,
    location,
    onboardingStep: role === 'PROVIDER' ? 1 : 0,
  });

  if (role === 'PROVIDER') {
    await ProviderProfile.create({
      userId: user._id,
      serviceRoles: serviceRole ? [serviceRole] : [],
      gender,
      location,
      profileCompleted: false,
    });
  }

  const token = createToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, isProvider: user.isProvider, profileCompleted: user.profileCompleted } });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = createToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, isProvider: user.isProvider, profileCompleted: user.profileCompleted } });
}

async function me(req, res) {
  const user = await User.findById(req.user._id).select('-passwordHash');
  res.json(user);
}

module.exports = { register, login, me };
