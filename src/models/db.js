const pgp = require('pg-promise')();

const connectionString = `${process.env.DATABASE_URL}?ssl=${process.env.DB_SSL}`

const db = pgp(connectionString);

module.exports = db;
