const express = require('express');
const { authMiddleware, roleGuard } = require('../middleware/auth');
const { getDashboardMetrics, listUsers, listProviderProfiles, updateProviderStatus, createService, listServices } = require('../controllers/adminController');

const router = express.Router();
router.use(authMiddleware, roleGuard('ADMIN'));
router.get('/metrics', getDashboardMetrics);
router.get('/users', listUsers);
router.get('/providers', listProviderProfiles);
router.put('/providers/:id', updateProviderStatus);
router.post('/services', createService);
router.get('/services', listServices);

module.exports = router;
