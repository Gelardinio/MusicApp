const jwt = require("jsonwebtoken");
const pool = require("../Database/db");
const bcrypt = require('bcrypt');

require('dotenv').config();

module.exports = async (req , res) => {

    try {
        const {id, username, song_id} = req.body;

        console.log(id)

        const foundUser = await pool.query(
            `SELECT * FROM person WHERE id = '${id}' FETCH FIRST 1 ROWS ONLY`
        )

        await pool.query(
            `INSERT INTO activeUsers (id, username, song_id) values 
            ('${id}', '${username}', '${song_id}') RETURNING id`
        )

    } catch (err) {
        console.log(err.message);
    }

};