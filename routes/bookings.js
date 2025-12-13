// const express = require('express');
// const Booking = require('../models/Booking');
// const { protect } = require('../middleware/auth');
// const router = express.Router();

// // All routes are protected
// router.use(protect);

// // @route   GET /api/bookings
// // @desc    Get all bookings for logged-in user
// router.get('/', async (req, res) => {
//   try {
//     const bookings = await Booking.find({ user: req.user.id }).sort('-createdAt');
//     res.json({ success: true, count: bookings.length, data: bookings });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @route   POST /api/bookings
// // @desc    Create a new booking
// router.post('/', async (req, res) => {
//   try {
//     const booking = await Booking.create({
//       ...req.body,
//       user: req.user.id
//     });
//     res.status(201).json({ success: true, data: booking });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // @route   GET /api/bookings/:id
// // @desc    Get single booking
// router.get('/:id', async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
    
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     // Check ownership
//     if (booking.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     res.json({ success: true, data: booking });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @route   PUT /api/bookings/:id
// // @desc    Update booking
// router.put('/:id', async (req, res) => {
//   try {
//     let booking = await Booking.findById(req.params.id);

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     // Check ownership
//     if (booking.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true
//     });

//     res.json({ success: true, data: booking });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // @route   DELETE /api/bookings/:id
// // @desc    Delete booking
// router.delete('/:id', async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     // Check ownership
//     if (booking.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     await booking.deleteOne();
//     res.json({ success: true, data: {} });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;


const express = require('express');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');
const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/bookings
// @desc    Get all bookings for logged-in user
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort('-createdAt');
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bookings/facility/:facilityId
// @desc    Get all bookings for a specific facility and date
router.get('/facility/:facilityName', async (req, res) => {
  try {
    const { facilityName } = req.params;
    const { date } = req.query;

    const query = {
      facility: facilityName,
      status: { $ne: 'cancelled' }
    };

    if (date) {
      // Match exact date
      const searchDate = new Date(date);
      query.date = {
        $gte: new Date(searchDate.setHours(0, 0, 0, 0)),
        $lte: new Date(searchDate.setHours(23, 59, 59, 999))
      };
    }

    const bookings = await Booking.find(query);
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', async (req, res) => {
  try {
    const { facility, date, timeSlot } = req.body;

    // ✅ CHECK IF SLOT IS ALREADY BOOKED
    const existingBooking = await Booking.findOne({
      facility: facility,
      date: new Date(date),
      timeSlot: timeSlot,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({ 
        success: false,
        message: 'This time slot is already booked. Please choose another time.' 
      });
    }

    // Create the booking if slot is available
    const booking = await Booking.create({
      ...req.body,
      user: req.user.id,
      status: 'confirmed'
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check ownership
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking
router.put('/:id', async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check ownership
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check ownership
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await booking.deleteOne();
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
