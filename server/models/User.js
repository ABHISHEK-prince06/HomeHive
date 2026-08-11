const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['CUSTOMER', 'PROVIDER', 'ADMIN'], default: 'CUSTOMER' },
  isProvider: { type: Boolean, default: false },
  profileCompleted: { type: Boolean, default: false },
  onboardingStep: { type: Number, default: 0 },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  profileImage: { type: String },
  location: {
    address: { type: String },
    pincode: { type: String },
    city: { type: String },
    state: { type: String },
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('User', userSchema);
