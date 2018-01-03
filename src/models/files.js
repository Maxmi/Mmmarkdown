const db = require('./db');

//functions for all files
const listAllFiles = () => {
  return db.any(`
    SELECT * FROM files ORDER BY modified DESC;
  `);
};


//functions for individual files

const saveFile = ({name, newFile}) => {
  return db.one(`
    INSERT INTO files (name, content)
    VALUES ($1, $2)
    ON CONFLICT (name)
    DO UPDATE
    SET name = $1
    RETURNING *;
  `, [name, newFile]);
};


const getFileContent = (fileID) => {
  return db.one(`
    SELECT content FROM files WHERE id = $1;
  `, [fileID]);
};


const updateFileContent = (fileID, newContent) => {
  return db.one(`
    UPDATE files
    SET content = $2
    WHERE id = $1
    RETURNING *;
  `, [fileID, newContent]);
};


const deleteFile = (fileID) => {
  return db.none(`
    DELETE FROM files
    WHERE id = $1
  `, [fileID]);
};


module.exports = {
  listAllFiles,
  saveFile,
  getFileContent,
  updateFileContent,
  deleteFile
};
