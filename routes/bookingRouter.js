const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticateUser = require('../middleware/authMiddleware');

// Create a new booking
router.post('/', bookingController.createBooking);
router.get('/my-bookings', authenticateUser, bookingController.getMyBookings);


// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get single booking by ID
router.get('/:id', bookingController.getBookingById);

// Update a booking by ID
router.put('/:id', bookingController.updateBooking);

// Delete a booking by ID
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
