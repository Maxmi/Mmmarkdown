const fetches = {
  upsertFile: (fileID, input) => {
    fetch(`/allfiles/${fileID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({fileID, newContent: input})
    });
  },

  deleteFile: fileID => {
    return fetch(`/allfiles/${fileID}`, {method: 'DELETE'});
  },

  saveFile: (fileName, input) => {
    return fetch('/allfiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: fileName, newFile: input})
    });
  },

  getAllFiles: () => {
    return fetch('/allfiles').then(result => result.json());
  },

  getOneFile: (fileID) => {
    return fetch(`/allfiles/${fileID}`)
      .then(result => result.json());
  }

};
