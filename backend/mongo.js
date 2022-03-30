const FoodDelivery = require('./models/food_delivery')
const Location = require('./models/location')
const Have = require('./models/have')
const Need = require('./models/need')

const my_location = new Location({
  longitude: 0,
  latitude: 0,
  num_people: 0,
  expiration: new Date()
})