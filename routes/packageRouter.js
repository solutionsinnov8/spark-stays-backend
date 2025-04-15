const express = require('express');
const { createPackage, getAllPackages } = require('../controllers/packageController');

const router = express.Router();

router.post('/', createPackage);
router.get('/', getAllPackages);

module.exports = router;
