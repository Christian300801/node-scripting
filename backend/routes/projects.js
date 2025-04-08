const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// GET: Alle Projekte abrufen
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Projekte' });
  }
});

// POST: Ein neues Projekt erstellen
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Erstellen des Projekts' });
  }
});

module.exports = router;
