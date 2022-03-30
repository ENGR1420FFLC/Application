const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('Succesfully connected to MongoDB!')
  })
  .catch((error) => {
    console.log('ERROR connecting to MongoDB:', error.message)
  })

  module.exports = mongoose