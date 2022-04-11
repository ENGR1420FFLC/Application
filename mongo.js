
const Location = require('./models/location')


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
let locations = []
locations.push(new Location({
     longitude: null,
     latitude: null,
     num_people: null,
     expiration: null,
     identity: "Provider",
     name:"Bent Spoke"
   }))

   locations.push( new Location({
    longitude: -123.14906958159787,
    latitude: 44.05141846603639,
    num_people: null,
    expiration: null,
    identity: "Provider",
    name:"Burrito Brigate"
  }))
  
  locations.push(new Location({
    longitude: -123.0127616633938,
    latitude: 44.05564120482034,
    num_people: null,
    expiration: null,
    identity: "Provider",
    name:"Catholic Service Workers"
  }))
  locations.push(new Location({
    longitude: -123.11468490515068,
    latitude:   44.05442857924805, 
    num_people: null,
    expiration: null,
    identity: "Provider",
    name:"Catholic Service Workers"
  }) )

  locations.push(new Location({
    longitude: null,
    latitude:   null, 
    num_people: null,
    expiration: null,
    identity: "Provider",
    name:"Eugene Community Fridge"
  }))
  locations.push(new Location({
    longitude: -123.15387840672301,
    latitude:   44.04595612499572, 
    num_people: null,
    expiration: null,
    identity: "Provider",
    name:"Everyone Village"
  }))
  locations.push(new Location({
    longitude: -123.15387840672301,
    latitude:   44.04595612499572, 
    num_people: null,
    expiration: null,
    identity: "Provider",
    name:"Food Not Bombs"
  }))
  locations.push(new Location({
    longitude: null,
    latitude:   null, 
    num_people: null,
    expiration: null,
    identity: "Provider",
    name:"Heart of Marcola"
  }))
  locations.push(new Location({
    longitude: -123.09137117974217,
    latitude:   44.04712786806767, 
    num_people: null,
    expiration: null,
    identity: "Provider",
    name:"Interfaith Food Hub"
  }))
  locations.push(new Location({
    longitude: null,
    latitude:   null, 
    num_people: null,
    expiration: null,
    identity: "Provider",
    name:"St. Mary's Kitchen"
  }))
  locations.push(new Location({
    longitude: -123.11803672206835,
    latitude:   44.07202868700423, 
    num_people: null,
    expiration: null,
    identity: "Provider",
    name:"Reality Kitchen"
  }))
  locations.push(new Location({
    longitude: -123.09677352206893,
    latitude:    44.05106385482329,  
    num_people: null,
    expiration: null,
    identity: "Provider",
    name:"The Dining Room"
  }))
  locations.push(new Location({
    longitude: -123.10977421499392,
    latitude:    44.05660550949814, 
    num_people: null,
    expiration: null,
    identity: "Provider",
    name:"The Way Home"
  }))
  for (l of locations) {
    l.save().then(() => {
    })
  }
  