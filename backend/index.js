const express = require('express')
const app = express()
require('dotenv').config()
const FoodDelivery = require('./models/food_delivery')
const Location = require('./models/location')
const Have = require('./models/have')
const Need = require('./models/need')

app.use(express.json())

app.get('/api', (request, response) => {
  response.json({content: "this is"})
});

app.get('/api/needs', (request, response) => {
  Need.find({}).then(needs => {
    response.json(needs)
  })
})

app.post('/api/needs', (request, response) => {
  const body = request.body

  if (body.location === undefined || body.name === undefined || body.description === undefined || body.amount === undefined || body.status === undefined || body.deadline === undefined) {
    return response.status(400).json({ error: 'field missing' })
  }

  const need = new Note({
    location: body.content,
    name: body.name,
    description: body.description,
    amount: body.amount,
    status: body.status,
    deadline: body.deadline
  })

  need.save().then(savedNeed => {
    response.json(savedNeed)
  })
})

app.get('/api/haves', (request, response) => {
  Have.find({}).then(haves => {
    response.json(haves)
  })
})

app.post('/api/haves', (request, response) => {
  const body = request.body

  if (body.location === undefined || body.name === undefined || body.description === undefined || body.amount === undefined || body.status === undefined || body.expiration === undefined) {
    return response.status(400).json({ error: 'field missing' })
  }

  const have = new Note({
    location: body.content,
    name: body.name,
    description: body.description,
    amount: body.amount,
    status: body.status,
    expiration: body.expiration,
  })

  have.save().then(savedHave => {
    response.json(savedHave)
  })
})

app.get('/api/locations', (request, response) => {
  Location.find({}).then(locations => {
    response.json(locations)
  })
})

app.post('/api/locations', (request, response) => {
  const body = request.body

  if (body.longitude === undefined || body.latitude === undefined || body.numPeople === undefined || body.expiration === undefined) {
    return response.status(400).json({ error: 'field missing' })
  }

  const location = new Note({
    longitude: body.longitude,
    latitude: body.latitude,
    numPeople: body.numPeople,
    expiration: body.expiration
  })

  location.save().then(savedLocation => {
    response.json(savedLocation)
  })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
