const jwt = require("jsonwebtoken");
const pool = require("../Database/db");
const bcrypt = require('bcrypt');

require('dotenv').config();

module.exports = async (req , res) => {

    try {
        let {id, username, song_id} = req.body;

        console.log(id)

        const foundUser = await pool.query(
            `SELECT * FROM person WHERE id = '${id}' FETCH FIRST 1 ROWS ONLY`
        )

        song_id = "bruh"

        await pool.query(
            `INSERT INTO activeUsers (id, username, song_id) VALUES 
            ('${id}', '${username}', '${song_id}') ON CONFLICT (id) DO UPDATE SET song_id =  EXCLUDED.song_id username = EXCLUDED.username`
        )

    } catch (err) {
        console.log(err.message);
    }

};