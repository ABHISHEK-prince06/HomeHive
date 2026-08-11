const express = require('express');
const { authMiddleware, roleGuard } = require('../middleware/auth');
const { getProviderProfile, updateProviderProfile, getProviderAvailability } = require('../controllers/providerController');

const router = express.Router();
router.get('/:id', getProviderProfile);
router.get('/:id/availability', getProviderAvailability);
router.put('/profile', authMiddleware, roleGuard('PROVIDER'), updateProviderProfile);

module.exports = router;
