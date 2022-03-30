const mongoose = require('./connection');

//TODO: Finish implementing schemas
const foodDeliverySchema = new mongoose.Schema({
  needId: ObjectId,
  fulfiller: String,
  haveId: ObjectId,
  name: String,
  quantity: Number,
  allergenInformation: String,
  expirationDate: Date,
  fulfillmentDate: Date,
  status: String,
})

locationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Location', locationSchema)