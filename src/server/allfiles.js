const express = require('express');
const router = express.Router();
const queries = require('../models/files');

// bds: put space between // and comment
// route to allfiles - get - read all files
router.get('/', (req, res, next) => {
  // bds: I would put queries.listAllFiles() on one line, as that's the intial call
  // bds: otherwise, it seems like queries is a function call
  return queries.listAllFiles()
    .then(allfiles => {
      res.status(200).json({ allfiles });
    })
    .catch(next);
});

// route to allfiles - post - create new file
router.post('/', (req, res, next) => {
  return queries.saveFile(req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(next);
});

// route to one file - get one file
router.get('/:fileID', (req, res, next) => {
  const fileID = parseInt(req.params.fileID);
  return queries.getFileContent(fileID)
    .then(content => {
      res.status(200).json(content);
    })
    .catch(next);
});

// route to update file content
router.put('/:fileID', (req, res, next) => {
  const fileID = parseInt(req.params.fileID);
  const { newContent } = req.body;
  return queries.updateFileContent(fileID, newContent)
    .then(() => {
      res.status(200).json({});
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

// bds: some comments would be good here, similar to how you commented the routes above
router.use((err, req, res) => {
  res.json({ error: true, message: err.toString() });
});

module.exports = router;

// bds: overall, this file looks great! :-D