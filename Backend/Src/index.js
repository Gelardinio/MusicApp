const login = require("./Routes/login");
const signup = require("./Routes/signup");
const express = require('express');
const pool = require("./Database/db");
const backend = express()
require('dotenv').config();

backend.use(express.json());

backend.get('/', (req, res) => {
    res.json({data: 'temp'});
});

backend.post('/api/v1/login', login);
backend.post('/api/v1/signup', signup);

const PORT = process.env.PORT;

backend.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (e) => {
    console.log('Error: ', e.message);
});