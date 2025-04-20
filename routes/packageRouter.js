const express = require('express');
const { createPackage, getAllPackages, getPlannerPackages } = require('../controllers/packageController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateUser, createPackage);
router.get('/planner-packages', authenticateUser, getPlannerPackages);  
router.get('/', getAllPackages);  

module.exports = router;
