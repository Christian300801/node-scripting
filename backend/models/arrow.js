const mongoose = require('mongoose');

const ArrowSchema = new mongoose.Schema({
  projectId: String,
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' },
  type: String,
  color: String,
});

const Arrow = mongoose.model('Arrow', ArrowSchema); // Achte auf den Namen hier
module.exports = Arrow;
