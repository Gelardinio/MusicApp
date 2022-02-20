const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
  user: "Gerald",
  host: "localhost",

})

module.exports = pool;
