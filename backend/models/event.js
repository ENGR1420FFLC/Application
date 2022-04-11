const mongoose = require('./connection');

const eventSchema = new mongoose.Schema({
  event_name: String,
  rrule: String,
})

eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Event', eventSchema)