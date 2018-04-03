const express = require('express');
const allfiles = require('./allfiles');
const router = express.Router();

// route to home page
router.get('/', (req, res) => {
  res.render('index');
});

// bds: I would call the route (and the file containing the router) 'savedfiles' or 'files' instead of 'allfiles'
// bds: allfiles is misleading because it implies all the routes deal with all the files, where some deal with individual files

// bds: why do you include the allfiles routes here, instead of in app.js? (note: I honestly don't know what best
// bds: practice would be here...)
router.use('/allfiles', allfiles);

module.exports = router;

// bds: I would call this directory "routes" instead of "server"