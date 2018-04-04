const db = require('./db');

/**
 * Get all files from db
 * @return {Promise} - Promise resolving to array of objects,
 *                     each representing a file
 */
const listAllFiles = () => {
  const query = `
    SELECT *
    FROM files
    ORDER BY modified_at DESC;
  `;
  return db.any(query);
};

/**
 * Upsert specified file - insert if it's new, update if it's existing file
 * @param  {object} - Object with string properties 'name' and 'content'
 *                      - name: the name of the new file
 *                      - content: content of the new file
 * @return {Promise} - Promise resolving to an object representing the file
 */

const saveFile = ({ name, newFile }) => {
  const upsertQuery = `
    INSERT INTO files (name, content)
    VALUES ($1, $2)
    ON CONFLICT (name)
    DO UPDATE
    SET name = $1, content = $2
    RETURNING *
  `;
  return db.one(upsertQuery, [name, newFile]);
};


/**
 * Get content for specified file ID
 * @param  {number} fileID - ID of file to retrieve
 * @return {Promise} - Promise resolving to object with the key 'content'
 */

const getFileContent = fileID => {
  const query = `
    SELECT content
    FROM files
    WHERE id = $1
  `;
  return db.one(query, [fileID]);
};

/**
 * Update contents of file
 * @param  {number} fileID  - ID of file to update
 * @param  {string}  newContent  - Updated content of a file
 * @return {Promise} - Promise resolving to object with file data
 */
const updateFileContent = (fileID, newContent) => {
  const query = `
    UPDATE files
    SET content = $2
    WHERE id = $1
    RETURNING *;
  `;
  return db.one(query, [fileID, newContent]);
};

/**
 * Delete a file
 * @param  {number} fileID  - ID of file to delete
 */
const deleteFile = fileID => {
  const query = `
    DELETE FROM files
    WHERE id = $1
  `;
  return db.none(query, [fileID]);
};

module.exports = {
  listAllFiles,
  saveFile,
  getFileContent,
  updateFileContent,
  deleteFile
};
