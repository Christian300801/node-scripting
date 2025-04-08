const mongoose = require('mongoose');

const MONGO_URI = "mongodb://localhost:27017/scene-editor";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB verbunden');
  } catch (err) {
    console.error('MongoDB Verbindung fehlgeschlagen', err);
  }
};

module.exports = connectDB;
