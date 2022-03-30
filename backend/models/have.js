const mongoose = require('./connection');

const haveSchema = new mongoose.Schema({
  location: locationSchema,
  name: String,
  description: String,
  Amount: Number,
  status:String
})

haveSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Have', haveSchema)