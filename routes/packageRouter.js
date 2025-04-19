const express = require('express');
const { createPackage, getAllPackages } = require('../controllers/packageController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateUser, createPackage);
router.get('/', authenticateUser, getAllPackages);  

module.exports = router;
