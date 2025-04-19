const Booking = require('../models/bookingModel');
const Package = require('../models/Package');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getMyBookings = async (req, res) => {
  try {
    if (req.user.role !== 'event_planner') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Fix here
    const myPackages = await Package.find({ planner: req.user._id });
    const myPackageIds = myPackages.map(pkg => pkg._id);
    console.log(req.user._id, "00000000000000");
    console.log("My Packages:", myPackages);
    const bookings = await Booking.find({ packageId: { $in: myPackageIds } })
      .populate('packageId'); // You can remove userId since it's not in model

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error getting my bookings:', error);
    res.status(500).json({ message: 'Failed to get bookings' });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single booking
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Booking not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
