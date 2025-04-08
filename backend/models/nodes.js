const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  projectId: String,
  sceneId: String,
  name: String,
  color: String,
  contents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
  attributes: Object,
  nodeGroup: String,
});

module.exports = mongoose.model('Node', NodeSchema);
