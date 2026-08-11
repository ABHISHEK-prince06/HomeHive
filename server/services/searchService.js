const ProviderProfile = require('../models/ProviderProfile');
const Booking = require('../models/Booking');

const SEARCH_RADII = [100, 200, 500, 1000, 2000, 5000, 10000];
const DISTANCE_MULTIPLIERS = [
  { max: 100, multiplier: 1.0 },
  { max: 200, multiplier: 1.05 },
  { max: 500, multiplier: 1.1 },
  { max: 1000, multiplier: 1.2 },
  { max: 2000, multiplier: 1.3 },
  { max: 5000, multiplier: 1.5 },
  { max: Infinity, multiplier: 1.7 },
];

function getDistanceMultiplier(distance) {
  const bucket = DISTANCE_MULTIPLIERS.find((entry) => distance <= entry.max);
  return bucket ? bucket.multiplier : 1.7;
}

function scoreProvider(provider, distance, rating, experience, price) {
  const distanceScore = Math.max(0, 50 - distance / 100);
  const ratingScore = rating * 10;
  const experienceScore = Math.min(experience, 10) * 2;
  const priceScore = 30 - Math.min(price / 20, 25);
  const verifiedScore = provider.verificationStatus === 'VERIFIED' ? 20 : 0;
  return distanceScore + ratingScore + experienceScore + priceScore + verifiedScore;
}

function applyFilters(provider, filters, bookingDate) {
  if (filters.gender && filters.gender !== 'Any' && provider.gender !== filters.gender) {
    return false;
  }

  if (filters.minCost && provider.hourlyRate < filters.minCost) return false;
  if (filters.maxCost && provider.hourlyRate > filters.maxCost) return false;
  if (filters.experience && provider.experience < filters.experience) return false;
  if (filters.rating && provider.rating < filters.rating) return false;
  if (filters.verifiedOnly && provider.verificationStatus !== 'VERIFIED') return false;

  if (filters.availableNow) {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const availability = provider.availability.find((item) => item.day === dayName);
    if (!availability || !availability.available) return false;
  }

  return true;
}

async function isProviderBooked(providerId, date, startTime, endTime) {
  const bookingDate = new Date(date);
  const bookings = await Booking.find({
    providerId,
    date: bookingDate,
    status: { $nin: ['CANCELLED', 'REJECTED', 'COMPLETED'] },
  });
  return bookings.some((booking) => {
    return !(endTime <= booking.startTime || startTime >= booking.endTime);
  });
}

async function searchProfessionals({ role, latitude, longitude, filters, date, startTime, duration }) {
  let results = [];
  let activeRadius = 0;

  for (const radius of SEARCH_RADII) {
    activeRadius = radius;
    const providers = await ProviderProfile.find({
      serviceRoles: role,
      verificationStatus: 'VERIFIED',
      profileCompleted: true,
      isAvailable: true,
      'location.coordinates': {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $maxDistance: radius,
        },
      },
    });

    const filtered = [];
    for (const provider of providers) {
      if (!applyFilters(provider, filters, date)) continue;
      const distance = await getDistance(provider.location.coordinates, latitude, longitude);
      if (provider.serviceRadius < distance) continue;
      const bookingConflict = await isProviderBooked(provider.userId, date, startTime, addHours(startTime, duration));
      if (bookingConflict) continue;
      const multiplier = getDistanceMultiplier(distance);
      const finalRate = provider.hourlyRate * multiplier;
      const score = scoreProvider(provider, distance, provider.rating, provider.experience, provider.hourlyRate);
      filtered.push({ provider, distance, multiplier, finalRate, score });
    }

    filtered.sort((a, b) => b.score - a.score);
    if (filtered.length >= 5 || radius === SEARCH_RADII[SEARCH_RADII.length - 1]) {
      results = filtered;
      break;
    }
  }

  return { results, activeRadius };
}

function addHours(timeString, hours) {
  const [hour, minute] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hour + hours, minute);
  return date.toTimeString().slice(0, 5);
}

async function getDistance(coords, latitude, longitude) {
  const [lng, lat] = coords;
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(latitude - lat);
  const dLng = toRad(longitude - lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat)) * Math.cos(toRad(latitude)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

module.exports = { searchProfessionals, SEARCH_RADII, DISTANCE_MULTIPLIERS };
