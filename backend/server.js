const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// DB verbinden
const MONGO_URI = 'mongodb://localhost:27017/scene-editor';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB verbunden'))
  .catch((err) => console.error(err));

// Routes einbinden
app.use('/api/projects', require('./routes/projects'));
app.use('/api/nodes', require('./routes/nodeRoute'));
app.use('/api/contents', require('./routes/contentRoute'));
app.use('/api/arrows', require('./routes/arrowRoute'));

// Start
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
