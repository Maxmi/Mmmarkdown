const express = require('express');
const files = require('./files');
const router = express.Router();

// route to home page
router.get('/', (req, res) => {
  res.render('index');
});

router.use('/files', files);

module.exports = router;
