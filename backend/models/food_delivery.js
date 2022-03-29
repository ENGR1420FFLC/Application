const mongoose = require('./connection');

//TODO: Finish implementing schemas
const foodDeliverySchema = new mongoose.Schema({
  need_id: []
})

locationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Location', locationSchema)