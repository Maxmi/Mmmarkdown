/**
 * [An object with properties that will be used for file manipulations]
 * @type {Object}
 */

const fetches = {
  getAllFiles: () => {
    return fetch('/files').then(result => result.json());
  },

  getOneFile: fileID => {
    return fetch(`/files/${fileID}`).then(result => result.json());
  },

  deleteFile: fileID => {
    return fetch(`/files/${fileID}`, { method: 'DELETE' });
  },

  saveFile: (fileName, input) => {
    return fetch('/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: fileName, content: input })
    });
  }
};
