const mongoose = require('mongoose');

// Indica donde encontrar las variables de entorno
require('dotenv').config({ path: '.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to mongoDB');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
