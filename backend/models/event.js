const mongoose = require('./connection');

const connectionSchema = new mongoose.Schema({
  name: String,
  fromId: mongoose.Types.ObjectId,
  toId: mongoose.Types.ObjectId,
  description: String,
  allergenInformation: String,
  rrule: String,
})

connectionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Connection', connectionSchema)