const login = require("./Routes/login");
const signup = require("./Routes/signup");
const insertPerson = require("./Routes/insertPerson");
const express = require('express');
const pool = require("./Database/db");
const backend = express();

const httpServer = require("http").createServer(backend);
const io = require("./Middleware/socket.js").init(httpServer)

require('dotenv').config();

backend.use(express.json());

backend.get('/', (req, res) => {
    res.json({data: 'temp'});
});

backend.post('/api/v1/login', login);
backend.post('/api/v1/signup', signup);
backend.post('/api/v1/insertPerson', insertPerson);

const PORT = process.env.PORT;

io.on('connection', (socket) => {
    console.log("bruh")
    socket.emit("welcome", "Connected to socket!");
});

io.on('connect_failed', function(){
    console.log('Connection Failed');
});

io.on('disconnect', function () {
    console.log("User Disconnected!");
})

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (e) => {
    console.log('Error: ', e.message);
});


