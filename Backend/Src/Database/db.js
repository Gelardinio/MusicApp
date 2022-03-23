const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
  user: "Gerald",
  host: "localhost",
  database: "test-database",
  password: "",
  port: 5432,
})

module.exports = pool;
