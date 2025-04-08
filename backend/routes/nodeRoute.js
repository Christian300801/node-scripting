const express = require('express');
const router = express.Router();
const Node = require('../models/nodes'); // Dein Node-Modell

// GET: Alle Nodes abrufen
router.get('/', async (req, res) => {
  try {
    const nodes = await Node.find().populate('contents');
    res.json(nodes);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Nodes' });
  }
});

// GET: Nodes für ein bestimmtes Projekt abrufen
router.get('/:projectId', async (req, res) => {
  try {
    const nodes = await Node.find({ projectId: req.params.projectId }).populate('contents');
    res.json(nodes);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Nodes für dieses Projekt' });
  }
});

// POST: Einen neuen Node erstellen
router.post('/', async (req, res) => {
  const { projectId, name, type } = req.body;

  if (!projectId) {
    return res.status(400).json({ error: 'Project ID is required' });
  }

  const newNode = new Node({ projectId, name, type });

  try {
    await newNode.save();
    res.status(201).json(newNode);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Speichern des Nodes' });
  }
});

// POST: Einen neuen Node für ein bestimmtes Projekt hinzufügen (addnodes)
router.post('/addnodes', async (req, res) => {
  const { projectId, name, type } = req.body;

  if (!projectId) {
    return res.status(400).json({ error: 'Project ID is required' });
  }

  const newNode = new Node({ projectId, name, type });

  try {
    await newNode.save();
    res.status(201).json(newNode);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Speichern des Nodes' });
  }
});

module.exports = router;
