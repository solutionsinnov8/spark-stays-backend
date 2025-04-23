const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateProfile, deleteAccount, getAllEventPlanner, updatePlannerStatus } = require('../controllers/authController');
const authenticateUser = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete-account', authenticateUser, deleteAccount);
router.put('/update-profile', authenticateUser, updateProfile);
router.get('/getalleventplanner', getAllEventPlanner)
router.put('/planner-acceptance', authenticateUser, updatePlannerStatus);
module.exports = router;
