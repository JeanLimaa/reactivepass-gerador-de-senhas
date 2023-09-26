const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = connect;