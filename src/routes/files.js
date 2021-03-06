const express = require('express');
const router = express.Router();
const queries = require('../models/files');

// route to read all files
router.get('/', (req, res, next) => {
  return queries.listAllFiles()
    .then(files => {
      res.status(200).json({ files });
    })
    .catch(next);
});

// route to create new file
router.post('/', (req, res, next) => {
  return queries.saveFile(req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(next);
});

// route to get one file
router.get('/:fileID', (req, res, next) => {
  const fileID = parseInt(req.params.fileID);
  return queries.getFileContent(fileID)
    .then(content => {
      res.status(200).json(content);
    })
    .catch(next);
});

// route to delete one file
router.delete('/:fileID', (req, res, next) => {
  const fileID = parseInt(req.params.fileID);
  return queries.deleteFile(fileID)
    .then(() => {
      res.status(200).json({});
    })
    .catch(next);
});

// error handler for all other routes
router.use((err, req, res) => {
  res.json({ error: true, message: err.toString() });
});

module.exports = router;
