const jwt = require("jsonwebtoken");
const pool = require("../Database/db");
const bcrypt = require('bcrypt');

module.exports = async (req , res) => {
    let {username, password, firstName, lastName, email, gender, dateOfBirth, country} = req.body;

    const exists = await pool.query(
        `SELECT * FROM person WHERE email = '${email}' OR username = '${username}'`
    )
    console.log(username, email)

    if (exists.rowCount > 0) {
        res.status(401).send('User already exists!');
        console.log("Already exists!")
    } else {
        try {

            password = await bcrypt.hash(req.body.password, 12);
            
            await pool.query(
                `INSERT INTO person (username, password, first_name, last_name, email, gender, date_of_birth, country) values 
                ('${username}', '${password}', '${firstName}', '${lastName}', '${email}', '${gender}', '${dateOfBirth}', '${country}')`
            )
            res.status(200).send('User created!');
            console.log("created!")
        } catch (err) {
            console.log("error")
            res.status(401).send('Error!');
        }
    }

};