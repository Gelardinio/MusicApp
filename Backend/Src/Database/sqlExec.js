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
                genre_1 VARCHAR(50) NOT NULL,
                genre_2 VARCHAR(50),
                genre_3 VARCHAR(50),
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

async function genActiveTable() {
    try {
        const activeUserTable = await pool.query(
            `CREATE TABLE activeUsers (
                id BIGSERIAL NOT NULL,
                username VARCHAR(40) NOT NULL,
                song_id VARCHAR(40) NOT NULL,
                longitude DOUBLE PRECISION,
                latitude DOUBLE PRECISION,
                CONSTRAINT fk_User
                FOREIGN KEY(id)
                REFERENCES person(id)
            )`
        )
    } catch (err) {
        console.log(err.message);
    }
}

genActiveTable();