const {expect} = require('chai');
const {truncateTable, resetTable} = require('./helpers');
const {
  listAllFiles,
  saveFile,
  getFileContent,
  deleteFile
} = require('../src/models/files');


describe('db queries', () => {

  describe('listAllFiles', () => {
    context('when db is empty', () => {
      beforeEach(() => {
        return truncateTable();
      });
      it('should return empty list when table is empty', () => {
        return listAllFiles()
          .then(files => {
            expect(files.length).to.equal(0);
          })
      });
    });
    context('when db is seeded with data', () => {
      beforeEach(() => {
        return resetTable();
      });
      it('should return all files when table is not empty', () => {
        return listAllFiles()
          .then(files => {
            expect(files.length).to.equal(2);
          })
      });
    })
  }); //listAllFiles


  describe('saveFile', () => {
    beforeEach(() => {
      return truncateTable();
    });
    it('should save new file in db', () => {
      return saveFile({name:'testSavingFile', content:'test saving content'})
        .then(file => {
          expect(file.name).to.equal('testSavingFile');
          expect(file.content).to.equal('test saving content');
        })
    });
  }); //saveFile

  describe('getFileContent', () => {
    beforeEach(() => {
      return resetTable();
    });
    it('should return content of selected file', () => {
      return getFileContent(1)
        .then(result => {
          expect(result.content).to.equal('testContent1');
        })
    });
  }); //getFileContent

  describe('deleteFile', () => {
    beforeEach(() => {
      return resetTable();
    });
    it('should return delete the selected file', () => {
      return deleteFile(1)
        .then(() => {
          return listAllFiles()
        })
        .then(list => {
          expect(list.length).to.equal(1);
        });
    });
  }); //deleteFile

}); //most outer describe
