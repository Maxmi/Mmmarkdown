const express = require('express');
const allfiles = require('./allfiles');
const router = express.Router();


//route to home page
router.get('/', (req, res) => {
  res.render('index');
});

router.use('/allfiles', allfiles);

module.exports = router;
