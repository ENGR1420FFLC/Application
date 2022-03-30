const express = require('express')
const app = express()
require('dotenv').config()

app.get('/api', (request, response) => {
  response.end('hi')
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
