const jwt = require("jsonwebtoken");
const pool = require("../Database/db");
const bcrypt = require('bcrypt');

require('dotenv').config();

module.exports = async (req , res) => {

    try {
        const {userId, spotifyId, longitude, latitude} = req.body;

        const username = await pool.query(
            `SELECT * FROM person WHERE id = '${userId}' FETCH FIRST 1 ROWS ONLY`
        )

        const id = await pool.query(
            `INSERT INTO activeUsers (username, song_id, id) values 
            ('${username}', '${spotifyId}', '${userId}') RETURNING id`
        )

        const io = require('../Middleware/socket').getSocket();

        data = {id, longitude, latitude};

        io.emit("newJoin", data);

        res.json({"bruh" : "bdk"})

    } catch (err) {
        console.log(err.message);
    }

};