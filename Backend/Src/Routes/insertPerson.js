const pool = require("../Database/db");
require('dotenv').config();

module.exports = async (req, res) => {
    try {
        let { id, username, song_id } = req.body;

        song_id = "temp"

        await pool.query(
            `INSERT INTO activeUsers (id, username, song_id, longitude, latitude) 
             VALUES ('${id}', '${username}', '${song_id}', '', '')
             ON CONFLICT (id) DO UPDATE 
             SET username = EXCLUDED.username, song_id = EXCLUDED.song_id`
        )

    } catch (err) {
        console.log(err.message);
    }
};
