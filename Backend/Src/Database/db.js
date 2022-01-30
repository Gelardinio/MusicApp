const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
  user: "Gerald",
  host: "localhost",
  database: "test-database",
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
})

module.exports = pool;
