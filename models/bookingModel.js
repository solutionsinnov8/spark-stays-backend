const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: String,
    required: false,
  },
  guestName: {
    type: String,
    required: true,
  },
  packageType: {
    type: String,
    required: true,
    enum: ['stay', 'event'],
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  desiredDate: {
    type: Date,
  },
  priceRange: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  date: {
    type: Date,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending',
  },
  additionalNotes: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);
