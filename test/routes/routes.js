const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const {
  truncateTable,
  resetTable,
  resetAndCount,
  countRows
} = require('../db/helpers');

const app = require('../../src/app');

chai.use(chaiHttp);

describe('routes', () => {
  describe('/GET files', () => {
    context('when sending GET requst to /files and db is empty', () => {
      beforeEach(() => {
        return truncateTable();
      });
      it('should return no files', () => {
        return chai.request(app)
          .get('/files')
          .then(res => {
            expect(res.body.files.length).to.equal(0);
          });
      });
    });
    context('when sending GET request to /files and db has data', () => {
      beforeEach(() => {
        return resetTable();
      });
      it('should return list of files', () => {
        return chai.request(app)
          .get('/files')
          .then(res => {
            expect(res.body.files.length).to.be.above(0);
          });
      });
    });
  });//GET routes


  describe('/POST files', () => {
    context('when sending POST requst to /files with new file', () => {
      let rowCountBefore;
      beforeEach(() => {
        return resetAndCount()
          .then(res => {
            rowCountBefore = parseInt(res.count);
          });
      });
      it('should add new file to db', () => {
        return chai.request(app)
          .post('/files')
          .send({
            name: 'new test file',
            content: 'new test content'
          })
          .then(() => {
            return countRows()
              .then(res => {
                expect(parseInt(res.count)).to.equal(rowCountBefore + 1);
              });
          });
      });
    });
  });//POST routes


  describe('/GET files/:fileID', () => {
    context('when sending GET requst to /files/:fileID', () => {
      beforeEach(() => {
        return resetTable()
      });
      it('should retrive content of the file from db', () => {
        return chai.request(app)
          .get('/files/1')
          .then(res => {
            expect(res.body.content).to.equal('testContent1');
          });
      });
    });
  });


  describe('/DELETE files', () => {
    context('when sending DELETE requst to /files/:fileID', () => {
      let rowCountBefore;
      beforeEach(() => {
        return resetAndCount()
          .then(res => {
            rowCountBefore = parseInt(res.count);
          });
      });
      it('should remove the file db', () => {
        return chai.request(app)
          .delete('/files/1')
          .then(() => {
            return countRows()
              .then(res => {
                expect(parseInt(res.count)).to.equal(rowCountBefore - 1);
              });
          });
      });
    });
  });//DELETE route



});//most outer describe
