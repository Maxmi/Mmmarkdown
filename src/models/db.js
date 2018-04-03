const pgp = require('pg-promise')();

// bds: jsdoc!!
const makeConnectionString = () => {
  switch(process.env.NODE_ENV) {
    // bds: indent for formatting
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
