const mongoose = require('./connection');

const locationSchema = new mongoose.Schema({
  longitude: Number,
  latitude: Number,
  numPeople: Number,
  expiration: Date,
})

locationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Location', locationSchema)