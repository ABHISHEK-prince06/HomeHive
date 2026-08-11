const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const ProviderProfile = require('../models/ProviderProfile');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

dotenv.config();

const services = [
  { name: 'Electrician', category: 'Home Repair', description: 'Electrical repair and installation services.', icon: '⚡', basePrice: 300 },
  { name: 'Plumber', category: 'Home Repair', description: 'Plumbing repair, installation and maintenance.', icon: '🚰', basePrice: 280 },
  { name: 'Cook', category: 'Home Care', description: 'Home cook services for daily meals and events.', icon: '🍳', basePrice: 250 },
  { name: 'Cleaner', category: 'Home Care', description: 'House cleaning and sanitation services.', icon: '🧹', basePrice: 220 },
  { name: 'Gardener', category: 'Outdoor Care', description: 'Gardening, lawn care and maintenance.', icon: '🌿', basePrice: 260 },
  { name: 'Driver', category: 'Transport', description: 'Chauffeur and rental driver services.', icon: '🚗', basePrice: 350 },
  { name: 'Home Nurse', category: 'Health Care', description: 'In-home nursing and patient support.', icon: '❤️', basePrice: 420 },
  { name: 'Childcare Provider', category: 'Home Care', description: 'Trusted childcare and babysitting support.', icon: '👶', basePrice: 400 },
  { name: 'Carpenter', category: 'Home Repair', description: 'Carpentry, furniture repair and woodwork.', icon: '🪚', basePrice: 320 },
  { name: 'Painter', category: 'Home Repair', description: 'Residential painting and finishing services.', icon: '🎨', basePrice: 330 },
  { name: 'Appliance Technician', category: 'Repair', description: 'Appliance repair for household equipment.', icon: '🛠️', basePrice: 340 },
];

const collegeLocation = {
  address: 'Dhanalakshmi Srinivasan College of Engineering, Coimbatore',
  pincode: '641105',
  city: 'Coimbatore',
  state: 'Tamil Nadu',
  coordinates: { type: 'Point', coordinates: [76.966, 11.015] },
};

const providerTemplates = [
  { name: 'Arun Kumar', role: 'Electrician', experience: 5, hourlyRate: 350, rating: 4.8, serviceRadius: 1000, coordinates: [76.9665, 11.0145], skills: ['Wiring', 'Switch installation', 'Fan installation'] },
  { name: 'Suresh Reddy', role: 'Electrician', experience: 8, hourlyRate: 420, rating: 4.9, serviceRadius: 2000, coordinates: [76.968, 11.017], skills: ['Maintenance', 'Solar wiring', 'Lighting'] },
  { name: 'Ramesh Nair', role: 'Electrician', experience: 3, hourlyRate: 300, rating: 4.5, serviceRadius: 500, coordinates: [76.964, 11.0165], skills: ['Socket repair', 'Fuse replacement', 'Distribution board'] },
  { name: 'Madhuri Sharma', role: 'Plumber', experience: 6, hourlyRate: 310, rating: 4.7, serviceRadius: 1500, coordinates: [76.962, 11.012], skills: ['Leak repair', 'Pipe installation', 'Drain cleaning'] },
  { name: 'Deepak Singh', role: 'Plumber', experience: 9, hourlyRate: 380, rating: 4.9, serviceRadius: 2000, coordinates: [76.967, 11.018], skills: ['Toilet repair', 'Water heater', 'Pipeline maintenance'] },
  { name: 'Priya Nair', role: 'Cook', experience: 7, hourlyRate: 300, rating: 4.8, serviceRadius: 1000, coordinates: [76.969, 11.013], skills: ['South Indian meals', 'Breakfasts', 'Event catering'] },
  { name: 'Radha Menon', role: 'Cleaner', experience: 5, hourlyRate: 240, rating: 4.6, serviceRadius: 800, coordinates: [76.9655, 11.019], skills: ['Deep cleaning', 'Dusting', 'Kitchen cleaning'] },
  { name: 'Kumaravel', role: 'Gardener', experience: 4, hourlyRate: 270, rating: 4.5, serviceRadius: 2000, coordinates: [76.971, 11.011], skills: ['Lawn care', 'Plant pruning', 'Fertilizer'] },
  { name: 'Manoj Patel', role: 'Driver', experience: 10, hourlyRate: 380, rating: 4.9, serviceRadius: 10000, coordinates: [76.972, 11.020], skills: ['City rides', 'Airport transfers', 'Rental driver'] },
  { name: 'Hema Krishnan', role: 'Home Nurse', experience: 8, hourlyRate: 450, rating: 4.8, serviceRadius: 1500, coordinates: [76.963, 11.010], skills: ['Post-operative care', 'Medication support', 'Patient monitoring'] },
  { name: 'Anjali Sharma', role: 'Childcare Provider', experience: 6, hourlyRate: 420, rating: 4.7, serviceRadius: 1200, coordinates: [76.961, 11.014], skills: ['Baby care', 'Homework support', 'Meal time assistance'] },
  { name: 'Vikram Iyer', role: 'Carpenter', experience: 7, hourlyRate: 330, rating: 4.6, serviceRadius: 2200, coordinates: [76.9685, 11.009], skills: ['Furniture repair', 'Custom shelves', 'Wood work'] },
  { name: 'Naveen Kumar', role: 'Appliance Technician', experience: 6, hourlyRate: 340, rating: 4.7, serviceRadius: 1500, coordinates: [76.966, 11.0205], skills: ['AC repair', 'Washing machine', 'Fridge maintenance'] },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  await Promise.all([User.deleteMany(), ProviderProfile.deleteMany(), Service.deleteMany(), Booking.deleteMany(), Review.deleteMany()]);

  const passwordHash = await bcrypt.hash('HomeHive123', 10);
  const demoCustomer = await User.create({
    name: 'HomeHive Customer',
    email: 'customer@homehive.demo',
    phone: '9876543210',
    passwordHash,
    role: 'CUSTOMER',
    isProvider: false,
    gender: 'Other',
    location: collegeLocation,
    profileCompleted: true,
  });

  const demoProviderUser = await User.create({
    name: 'HomeHive Provider',
    email: 'provider@homehive.demo',
    phone: '8765432109',
    passwordHash,
    role: 'PROVIDER',
    isProvider: true,
    gender: 'Male',
    location: collegeLocation,
    profileCompleted: false,
    onboardingStep: 1,
  });
  await ProviderProfile.create({
    userId: demoProviderUser._id,
    serviceRoles: ['Electrician'],
    skills: [],
    experience: 0,
    hourlyRate: 0,
    gender: 'Male',
    bio: '',
    rating: 0,
    reviewCount: 0,
    verificationStatus: 'PENDING',
    documents: [],
    portfolioImages: [],
    availability: [],
    serviceRadius: 5000,
    location: collegeLocation,
    isAvailable: false,
    profileCompleted: false,
  });

  const admin = await User.create({
    name: 'HomeHive Admin',
    email: 'admin@homehive.demo',
    phone: '9000000000',
    passwordHash,
    role: 'ADMIN',
    isProvider: false,
    gender: 'Other',
    profileCompleted: true,
  });

  for (const provider of providerTemplates) {
    const user = await User.create({
      name: provider.name,
      email: `${provider.name.toLowerCase().split(' ').join('.')}@homehive.demo`,
      phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
      passwordHash,
      role: 'PROVIDER',
      isProvider: true,
      gender: 'Male',
      location: {
        address: `${provider.role} near college`,
        pincode: '641105',
        city: 'Coimbatore',
        state: 'Tamil Nadu',
        coordinates: { type: 'Point', coordinates: provider.coordinates },
      },
      profileCompleted: true,
    });

    await ProviderProfile.create({
      userId: user._id,
      serviceRoles: [provider.role],
      skills: provider.skills,
      experience: provider.experience,
      hourlyRate: provider.hourlyRate,
      gender: 'Male',
      bio: `${provider.role} with ${provider.experience} years of experience serving local customers.`,
      rating: provider.rating,
      reviewCount: Math.floor(provider.rating * 20),
      verificationStatus: 'VERIFIED',
      documents: [],
      portfolioImages: [],
      availability: [
        { day: 'Monday', from: '09:00', to: '18:00', available: true },
        { day: 'Tuesday', from: '09:00', to: '18:00', available: true },
        { day: 'Wednesday', from: '09:00', to: '18:00', available: true },
        { day: 'Thursday', from: '09:00', to: '18:00', available: true },
        { day: 'Friday', from: '09:00', to: '18:00', available: true },
        { day: 'Saturday', from: '10:00', to: '16:00', available: true },
        { day: 'Sunday', from: '00:00', to: '00:00', available: false },
      ],
      serviceRadius: provider.serviceRadius,
      location: {
        address: `${provider.role} location`,
        pincode: '641105',
        city: 'Coimbatore',
        state: 'Tamil Nadu',
        coordinates: { type: 'Point', coordinates: provider.coordinates },
      },
      isAvailable: true,
      profileCompleted: true,
    });
  }

  await mongoose.connection.close();
  console.log('Seed complete');
}

seed().catch((error) => {
  console.error('Seed error', error);
  process.exit(1);
});
