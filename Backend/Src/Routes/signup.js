const jwt = require("jsonwebtoken");
const pool = require("../Database/db");
const bcrypt = require('bcrypt');

module.exports = async (req , res) => {
    let {username, password, firstName, lastName, email, gender, dateOfBirth, country} = req.body;

    try {
        const exists = await pool.query(
            `SELECT * FROM person WHERE email = '${email}' OR username = ${username} FETCH FIRST 1 ROWS ONLY`
        )

        if (exists.rowCount > 0) {
            res.status(401).send('User already exists!');
            throw new Error("User already exists!")
        }

        password = await bcrypt.hash(req.body.password, 12);

        const currTables = await pool.query(
            `INSERT INTO person (username, password, first_name, last_name, email, gender, date_of_birth, country) values 
            ('${username}', '${password}', '${firstName}', '${lastName}', '${email}', '${gender}', '${dateOfBirth}', '${country}')`
        )
        res.status(200).send('User created!');
    } catch (err) {
        console.log(err.message);
        res.status(401).send('Error!');
    }
};