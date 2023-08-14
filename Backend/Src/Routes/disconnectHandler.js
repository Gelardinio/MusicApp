const pool = require("../Database/db");

require('dotenv').config();

module.exports = async (req, res) => {
    try {
        await pool.query(
            `DELETE from activeUsers WHERE id = ${req.id}`
        );
    } catch (err) {
        console.log(err.message);
    }
};
