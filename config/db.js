const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Extract database name from URI
    const uri = process.env.MONGODB_URI;
    const dbName = 'campuscourts'; // Your database name
    
    await mongoose.connect(uri, {
      dbName: dbName,
      retryWrites: true,
      w: 'majority'
    });
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
