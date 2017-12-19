const db = require('./db');

//function to list all files
//to list all files ordered by their latest edit date (most recent first)
//show file with particular name
//get text content of a file with particular name
//list created date of all files
//list every file name and it's word count


//functions for all files
const listAllFiles = () => {
  return db.any(`
    SELECT * FROM files RETURNING *;
  `);
};


const listFilesByEditDate = () => {
  return db.any(`
    SELECT * FROM files ORDER BY last_edited_on DESC RETURNING *;
  `);
};


const getCreationDates = () => {
  return db.any(`
    SELECT created_on FROM files RETURNING *;
  `)
};


//functions for individual files

const saveFile = (file) => {
  return db.one(`
    INSERT INTO files (name, content, created_on, last_edited_on)
    VALUES ($1, $2, $3, $4)
    RETURNING name;
  `, [name, content, created_on, last_edited_on])
};


const getFileById = (fileID) => {
  return db.one(`
    SELECT * FROM files WHERE id = ${fileID} RETURNING *;
  `, [fileID]);
};


const getFileByName = (fileName) => {
  return db.one(`
    SELECT * FROM files WHERE name = ${fileName} RETURNING *;
  `, [fileName]);
};


const getContentOfFile = (fileName) => {
  return db.one(`
    SELECT content FROM files WHERE name = ${filename} RETURNING *;
  `, [fileName]);
};


const updateFile = (fileID, newContent) => {
  return db.one(`
    UPDATE files
    SET content = ${newContent}
    WHERE id = ${fileID}
    RETURNING *;
  `, [fileID, newContent])
}


const deleteFile = (fileID) => {
  return db.none(`
    DELETE FROM files
    WHERE id = $1
    RETURNING *
  `, [fileID])
};


module.exports = {
  listAllFiles,
  listFilesByEditDate,
  saveFile,
  getFileById,
  getFileByName,
  getContentOfFile,
  getCreationDates,
  updateFile,
  deleteFile
};
