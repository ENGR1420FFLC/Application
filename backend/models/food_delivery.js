const mongoose = require('./connection');

//TODO: Finish implementing schemas
const foodDeliverySchema = new mongoose.Schema({
  needId: mongoose.ObjectId,
  fulfiller: String,
  haveId: mongoose.ObjectId,
  name: String,
  quantity: Number,
  allergenInformation: String,
  expirationDate: Date,
  fulfillmentDate: Date,
  status: String,
})

foodDeliverySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('FoodDelivery', foodDeliverySchema)