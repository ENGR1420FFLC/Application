const mongoose = require('./connection');

const needSchema = new mongoose.Schema({
  location: mongoose.ObjectId,
  name: String,
  description: String,
  Amount: Number,
  status:String,
  deadline:Date
})

needSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Need', needSchema)