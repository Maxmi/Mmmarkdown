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

const saveFile = ({ name, content }) => {
  const upsertQuery = `
    INSERT INTO files (name, content)
    VALUES ($1, $2)
    ON CONFLICT (name)
    DO UPDATE
    SET content = $2
    RETURNING *
  `;
  return db.one(upsertQuery, [name, content]);
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
  deleteFile
};
