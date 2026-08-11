const mongoose = require('mongoose');

const providerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  serviceRoles: [{ type: String, required: true }],
  skills: [{ type: String }],
  experience: { type: Number, default: 0 },
  hourlyRate: { type: Number, default: 0 },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  bio: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  verificationStatus: { type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED'], default: 'PENDING' },
  documents: [{ type: String }],
  portfolioImages: [{ type: String }],
  availability: [{
    day: { type: String },
    from: { type: String },
    to: { type: String },
    available: { type: Boolean, default: true },
  }],
  serviceRadius: { type: Number, default: 5000 },
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
  isAvailable: { type: Boolean, default: true },
  profileCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

providerProfileSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('ProviderProfile', providerProfileSchema);
