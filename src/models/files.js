const db = require('./db');

//functions for all files
const listAllFiles = () => {
  return db.any(`
    SELECT * FROM files;
  `);
};


// const listFilesByEditDate = () => {
//   return db.any(`
//     SELECT * FROM files ORDER BY last_edited_on DESC;
//   `);
// };
//
//
// const getCreationDates = () => {
//   return db.any(`
//     SELECT created_on FROM files;
//   `)
// };


//functions for individual files

const saveFile = ({name, newFile}) => {
  return db.one(`
    INSERT INTO files (name, content)
    VALUES ($1, $2)
    RETURNING *;
  `, [name, newFile])
};


// const getFile = (fileID) => {
//   return db.one(`
//     SELECT * FROM files WHERE id = $1;
//   `, [fileID]);
// };


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


const updateFileName = (fileID, newFileName) => {
  return db.one(`
    UPDATE files
    SET name = $2
    WHERE id = $1
    RETURNING *;
  `, [fileID, newFileName])
}

const deleteFile = (fileID) => {
  return db.none(`
    DELETE FROM files
    WHERE id = $1
  `, [fileID]);
};


module.exports = {
  listAllFiles,
  // listFilesByEditDate,
  saveFile,
  // getFile,
  // getFileByName,
  getFileContent,
  // getCreationDates,
  updateFileContent,
  updateFileName,
  deleteFile
};
