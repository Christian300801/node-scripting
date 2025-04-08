const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  name: String,
  type: String, // z. B. character, location, etc.
  color: String,
});

module.exports = mongoose.model('Content', ContentSchema);
