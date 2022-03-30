const express = require('express')
const app = express()
require('dotenv').config()
const FoodDelivery = require('./models/food_delivery')
const Location = require('./models/location')
const Have = require('./models/have')
const Need = require('./models/need')

app.get('/api', (request, response) => {
  response.json({content: "this is"})
});

app.get('/api/needs', (request, response) => {
  Need.find({}).then(needs => {
    response.json(needs)
  })
})

app.get('/api/haves', (request, response) => {
  Have.find({}).then(haves => {
    response.json(haves)
  })
})

app.get('/api/needs', (request, response) => {
  Location.find({}).then(locations => {
    response.json(locations)
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
