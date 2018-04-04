const pgp = require('pg-promise')();

/**
 * Function to compile a connectionString depending on environment
 * @return {string} - String representing a DATABASE_URL variable 
 */
const makeConnectionString = () => {
  switch(process.env.NODE_ENV) {
  case 'production':
      // bds: isn't ssl one of the variables in your .env file?
      // bds: shouldn't it be referenced here?
    return `${process.env.DATABASE_URL}?ssl=true`;
  case 'test':
    return `${process.env.DATABASE_URL}_test?ssl=false`;
  default:
    return process.env.DATABASE_URL;
  }
};

const connectionString = makeConnectionString();

const db = pgp(connectionString);

module.exports = db;
