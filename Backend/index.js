const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.json("bruh")
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})