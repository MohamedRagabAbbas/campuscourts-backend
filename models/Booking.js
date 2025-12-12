const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sport: {
    type: String,
    required: [true, 'Please specify a sport'],
    enum: ['Basketball', 'Tennis', 'Football', 'Swimming', 'Badminton', 'Volleyball'] // ADD Volleyball here
  },
  facility: {
    type: String,
    required: [true, 'Please specify a facility']
  },
  date: {
    type: Date,
    required: [true, 'Please specify a date']
  },
  timeSlot: {
    type: String,
    required: [true, 'Please specify a time slot']
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
