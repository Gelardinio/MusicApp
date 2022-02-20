const login = require("./Routes/login");
const signup = require("./Routes/signup");
const express = require('express');
const pool = require("./Database/db");
const backend = express()

const http = require('http');
const server = http.createServer(backend);
const { Server } = require("socket.io");
const io = new Server(server);

require('dotenv').config();

backend.use(express.json());

backend.get('/', (req, res) => {
    res.json({data: 'temp'});
});

backend.post('/api/v1/login', login);
backend.post('/api/v1/signup', signup);

const PORT = process.env.PORT;

io.on('connection', (socket) => {
    console.log('a user connected');
});  

backend.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (e) => {
    console.log('Error: ', e.message);
});
