const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://campuscourts.vercel.app', // ADD THIS
    'https://campuscourts-*.vercel.app' // Allow preview deployments
  ],
  credentials: true,
};
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/users'));


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CampusCourts API is running' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
