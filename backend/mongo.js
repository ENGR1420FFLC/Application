const Location = require('./models/location')
const Connection = require('./models/event')

Connection.find({}).then(connections => {
  for (connection in connections) {
    console.log(connection)
    Location.find({id: connection.fromId}).then(locations => {
      console.log(locations[0])
    })
  }
})

// const my_location = new Location({
//   longitude: 0,
//   latitude: 0,
//   num_people: 0,
//   expiration: new Date()
// })
/*
Location.find({latitude: 0}).then(location => {
  console.log(location[0])
  console.log(location[0]._id)
  location_id = location[0]._id
  console.log(`location id: ${location_id}`)

  for (i = 0; i < 5; i++) {
    date = new Date()
    date.setDate(date.getDate() + 1)
    const new_need = new Need({
      location: location_id,
      name: `need ${i}`,
      description: `description for need ${i}`,
      amount: i,
      status: "unfulfilled",
      deadline:date,
    })
    new_need.save().then(() => {
    })
  }
})
*/