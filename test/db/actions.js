const {expect} = require('chai');
const {
  listAllFiles,
  saveFile,
  getFileContent,
  deleteFile
} = require('../../src/models/files');

const {
  truncateTable,
  resetTable,
  resetAndCount,
  countRows
} = require('./helpers');



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
            expect(files.length).to.be.above(0);
          });
      });
    })
  }); //listAllFiles


  describe('saveFile', () => {
    context('if it\'s a new and unique file', () => {
      let rowCountBefore;
      beforeEach(() => {
        return resetAndCount()
          .then(res => {
            rowCountBefore = parseInt(res.count);
          })
      });
      it('should add this file to db', () => {
        return saveFile({name:'newFile', content:'new content'})
          .then(res => {
            return countRows()
              .then(res => {
                expect(parseInt(res.count)).to.equal(rowCountBefore + 1);
              });
          });
      });
    });

    context('if it\'s an existing file', () => {
      let fileContentBefore;
      beforeEach(() => {
        return resetTable()
      });
      it('should update it\'s content', () => {
        return saveFile({name:'testFile1', content:'updated content'})
          .then(file => {
            expect(file.content).to.equal('updated content');
          })
      });
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
  });

  describe('deleteFile', () => {
    let rowCountBefore;
    beforeEach(() => {
      return resetAndCount()
        .then(res => {
          rowCountBefore = parseInt(res.count);
        })
    });
    it('should delete a file from db', () => {
      return deleteFile(1)
        .then(() => {
          return countRows()
            .then(res => {
              expect(parseInt(res.count)).to.equal(rowCountBefore - 1);
            });
        });
    });
  }); //deleteFile

}); //most outer describe
