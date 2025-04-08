const express = require('express');
const router = express.Router();
const Content = require('../models/content');

router.post('/', async (req, res) => {
  const content = new Content(req.body);
  await content.save();
  res.status(201).json(content);
});

module.exports = router;
