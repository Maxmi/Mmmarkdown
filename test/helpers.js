console.log('dirname', __dirname);
require('./env')
const db = require('../src/models/db');
const {QueryFile} = require('pg-promise');
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath);
}

const table = 'files'

const truncateTable = () => {
  const query = `
    TRUNCATE ${table} RESTART IDENTITY CASCADE
  `;
  return db.any(query, [table]);
};

const seedFile = sql('../src/models/seed.sql');
const loadTable = () => db.none(seedFile);
const resetTable = () => truncateTable().then(() => loadTable());

module.exports = {truncateTable, resetTable};
