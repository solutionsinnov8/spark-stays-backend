const express = require('express');
const {
  createPackage,
  getAllPackages,
  getPlannerPackages,
  updatePackage,
  deletePackage,
} = require('../controllers/packageController');
const authenticateUser = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/', authenticateUser, createPackage);
router.get('/', getAllPackages);
router.get('/planner-packages', authenticateUser, getPlannerPackages);
router.put('/:id', authenticateUser, updatePackage);
router.delete('/:id', authenticateUser, deletePackage);

module.exports = router;
