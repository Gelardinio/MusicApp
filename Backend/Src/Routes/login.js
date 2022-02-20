const jwt = require("jsonwebtoken");
const pool = require("../Database/db");
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = async (req , res) => {
    const {username, password} = req.body;
    try {

        const exists = await pool.query(
            `SELECT * FROM person WHERE username = '${username}' FETCH FIRST 1 ROWS ONLY`
        )

        console.log(username)
        console.log(password)

        if (exists.rowCount < 1) {
            res.status(401).send('Error!');
            throw new Error("Error!")
        }

        const isValid = await bcrypt.compare(password, exists.rows[0].password);

        if (!isValid) {
            res.status(401).send('Error!');
            throw new Error("Error!")           
        }

        //Need to test ID thing
        const token = await jwt.sign(
            {
                username: exists.rows[0].username,
                id: exists.rows[0].id
            },
            process.env.SECRET,
            {expiresIn: "5h" }
        )
        res.json(token)
    } catch (err) {
        console.log(err.message);
    }
};