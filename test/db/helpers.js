require('dotenv').config({path: __dirname + '/../../.env'});

const db = require('../../src/models/db');
const {QueryFile} = require('pg-promise');
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath);
}

const table = ['files'];

const truncateTable = () => db.none(`
  TRUNCATE ${table} RESTART IDENTITY;
`);

const countRows = () => db.one(`
  SELECT COUNT(id) FROM files;
`);


const seedFile = sql('./seed.sql');
const loadTable = () => db.none(seedFile);
const resetTable = () => truncateTable().then(() => loadTable());
const resetAndCount = () => resetTable().then(() => countRows());


module.exports = {
  truncateTable,
  resetTable,
  resetAndCount,
  countRows
};
