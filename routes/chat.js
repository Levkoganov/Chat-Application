const express = require('express');
const router = express.Router();

// Render Chat page
router.get('/', (req, res) => {
  res.render('chat');
});

module.exports = router;
