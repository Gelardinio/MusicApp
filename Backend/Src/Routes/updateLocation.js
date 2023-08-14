const jwt = require("jsonwebtoken");
const pool = require("../Database/db");
const bcrypt = require('bcrypt');

require('dotenv').config();

module.exports = async (req, res) => {
    try {
        let { id, longitude, latitude } = req.body;

        await pool.query(
            `INSERT INTO activeUsers (id, username, song_id, longitude, latitude) 
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (id) DO UPDATE 
             SET longitude = EXCLUDED.longitude, latitude = EXCLUDED.latitude`,
            [id, '', '', longitude, latitude]
        );        

    } catch (err) {
        console.log(err.message);
    }
};
