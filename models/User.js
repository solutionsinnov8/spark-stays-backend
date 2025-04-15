const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['guest', 'event_planner', 'admin'], default: 'guest' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
