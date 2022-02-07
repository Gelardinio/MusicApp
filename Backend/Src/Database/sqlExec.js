const pool = require("./db");

async function genUserTable() {
    try {
        const userTable = await pool.query(
            `CREATE TABLE person (
                id BIGSERIAL NOT NULL PRIMARY KEY,
                username VARCHAR(40) NOT NULL,
                password VARCHAR(200) NOT NULL,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(150),
                gender VARCHAR(70) NOT NULL,
                date_of_birth DATE NOT NULL,
                country VARCHAR(50)	
            )`
        )
    } catch (err) {
        console.log(err.message);
    }
}

async function createUser() {
    try {
        await pool.query(
            `INSERT INTO person (username, password, first_name, last_name, email, gender, date_of_birth, country) values ('temp', 'bruh', 'Arni', 'Heake', 'aheake0@ftc.gov', 'Male', '4/2/2021', 'China');`
        )
    } catch (err) {
        console.log(err.message);
    }
    pool.end()
}

//genUserTable();
createUser();