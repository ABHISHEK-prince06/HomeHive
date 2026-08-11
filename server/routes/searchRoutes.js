const express = require('express');
const { searchProfessionals } = require('../services/searchService');

const router = express.Router();

router.get('/providers', async (req, res) => {
  const { role, latitude, longitude, date, startTime, duration, gender, minCost, maxCost, experience, rating, verifiedOnly, availableNow } = req.query;
  const filters = {
    gender,
    minCost: minCost ? Number(minCost) : undefined,
    maxCost: maxCost ? Number(maxCost) : undefined,
    experience: experience ? Number(experience) : undefined,
    rating: rating ? Number(rating) : undefined,
    verifiedOnly: verifiedOnly === 'true',
    availableNow: availableNow === 'true',
  };

  const search = await searchProfessionals({
    role,
    latitude: Number(latitude),
    longitude: Number(longitude),
    filters,
    date,
    startTime,
    duration: Number(duration) || 1,
  });

  res.json(search);
});

module.exports = router;
