const PINCODE_LOOKUP = {
  '641105': {
    latitude: 11.015,
    longitude: 76.966,
    address: 'Dhanalakshmi Srinivasan College of Engineering, Coimbatore',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
  },
};

function geocode(query) {
  if (!query) return null;
  const normalized = query.trim();
  if (PINCODE_LOOKUP[normalized]) {
    return PINCODE_LOOKUP[normalized];
  }
  return null;
}

module.exports = { geocode };
