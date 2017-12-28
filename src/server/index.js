const express = require('express');
const router = express.Router();
const queries = require('../models/files');


//route to home page
router.get('/', (req, res) => {
  res.render('index');
});


//route to allfiles - get - read all files
router.get('/allfiles', (req, res) => {
  return queries.listAllFiles()
    .then(allfiles => {
      res.status(200).json({
        allfiles
      });
    })
    .catch(err => console.log(err));
});


//route to allfiles - post - create new file
router.post('/allfiles', (req, res) => {
  const {name, newFile} = req.body;
  return queries.saveFile({name, newFile})
    .then((result) => {
      res.status(200).json(result)
    })
    .catch(err => console.log(err));
});


//route to one file - get one file
router.get('/allfiles/:fileID', (req, res) => {
  const fileID = parseInt(req.params.fileID);

  return queries.getFileContent(fileID)
    .then(content => {
      res.status(200).json(content)
    })
    .catch(err => console.log(err))
})


//route to update file content
router.put('/allfiles/:fileID', (req, res) => {
  const fileID = parseInt(req.params.fileID);
  const {newContent} = req.body;

  return queries.updateFileContent(fileID, newContent)
    .then(() => {
      res.render('index');
    })
    .catch(err => console.log(err));
});


//route to update file name
router.put('/allfiles/update/:fileID', (req, res) => {
  const fileID = parseInt(req.params.fileID);
  const fileName = req.body.name;
  return queries.updateFileName(fileID, fileName)
    .then(() => {
      res.render('index');
    })
    .catch(err => console.log(err))
});


//route to delete one file
router.delete('/allfiles/:fileID', (req, res) => {
  const fileID = parseInt(req.params.fileID);

  return queries.deleteFile(fileID)
    .then(() => {
      res.render('index');
    })
    .catch(err => console.log(err))
});


module.exports = router;
