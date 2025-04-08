const express = require('express');
const router = express.Router();
const Arrow = require('../models/arrow'); // dein Modell (ggf. anpassen)

router.get('/:projectId', async (req, res) => {
  try {
    const arrows = await Arrow.find({ projectId: req.params.projectId }).populate('from to');
    res.json(arrows);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Laden der Arrows' });
  }
});

router.post('/addarrows', async (req, res) => {
  const arrow = new Arrow(req.body);
  try {
    await arrow.save();
    res.status(201).json(arrow);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Speichern des Arrows' });
  }
});

module.exports = router; 
