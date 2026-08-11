const express = require('express');
const { authMiddleware, roleGuard } = require('../middleware/auth');
const { listServices, getService, createService, updateService, deleteService } = require('../controllers/serviceController');

const router = express.Router();
router.get('/', listServices);
router.get('/:id', getService);
router.post('/', authMiddleware, roleGuard('ADMIN'), createService);
router.put('/:id', authMiddleware, roleGuard('ADMIN'), updateService);
router.delete('/:id', authMiddleware, roleGuard('ADMIN'), deleteService);

module.exports = router;
