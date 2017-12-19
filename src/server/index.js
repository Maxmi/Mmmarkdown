const express = require('express');
const router = express.Router();
const queries = require('../models/files');


//route to home page
router.get('/', (req, res) => {
  res.render('index');
});



//route to allfiles - get - read all files
router.get('/allfiles', (req, res) => {
  queries.listAllFiles()
    .then(allfiles => {
      res.status(200).json({
        allfiles
      });
    })
    .catch(err => console.log(err));
});

//route to allfiles - post - create new file
router.post('/allfiles', (req, res) => {
  const {newFile} = req.body;
  return queries.saveFile()
    .then((newFile) => {
      res.status(200).json(newFile)
    })
    .catch(err => console.log(err));
});

//route to one file - get one file
router.get('/allfiles/:fileID', (req, res) => {
  const {fileID} = parseInt(req.params);
  queries.getFileById(fileID)
    .then(file => {
      res.render(`index/${fileID}`);
    })
})

//route to update one file
router.put('/allfiles/:fileID', (req, res) => {
  const {fileID} = parseInt(req.params);
  const {newContent} = req.body;
  queries.updateFile(fileID, newContent)
    .then(file => {
      res.render('index');
    })
})

//route to delete one file
router.delete('/allfiles/:fileID', (req, res) => {
  const {fileID} = parseInt(req.params);
  queries.deleteFile(fileID)
    .then(file => {
      res.render('index');
    })
})


module.exports = router;
