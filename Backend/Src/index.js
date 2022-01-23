const login = require("./Routes/login");

const express = require('express')
const backend = express()

backend.use(express.json());

backend.get('/', (req, res) => {
    res.json({data: 'temp'});
});

backend.post('/api/v1/login', login);

const PORT = process.env.PORT || 3001;

backend.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (e) => {
    console.log('Error: ', e.message);
});