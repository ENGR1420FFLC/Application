const express = require('express')
const app = express()
require('dotenv').config()
const Location = require('./models/location')
const Connection = require('./models/event')
const { RRule, RRuleSet, rrulestr } = require('rrule')
const e = require('express')
const url = require('url');

app.use(express.static('build'))
app.use(express.json())

app.get('/api', (request, response) => {
  response.json({content: "this is"})
});

// app.get('/api/needs', (request, response) => {
//   Need.find({}).then(needs => {
//     response.json(needs)
//   })
// })

// app.post('/api/needs', (request, response) => {
//   const body = request.body

//   if (body.location === undefined || body.name === undefined || body.description === undefined || body.amount === undefined || body.status === undefined || body.deadline === undefined) {
//     return response.status(400).json({ error: 'field missing' })
//   }

//   const need = new Note({
//     location: body.content,
//     name: body.name,
//     description: body.description,
//     amount: body.amount,
//     status: body.status,
//     deadline: body.deadline
//   })

//   need.save().then(savedNeed => {
//     response.json(savedNeed)
//   })
// })

// app.get('/api/haves', (request, response) => {
//   Have.find({}).then(haves => {
//     response.json(haves)
//   })
// })

// app.post('/api/haves', (request, response) => {
//   const body = request.body

//   if (body.location === undefined || body.name === undefined || body.description === undefined || body.amount === undefined || body.status === undefined || body.expiration === undefined) {
//     return response.status(400).json({ error: 'field missing' })
//   }

//   const have = new Note({
//     location: body.content,
//     name: body.name,
//     description: body.description,
//     amount: body.amount,
//     status: body.status,
//     expiration: body.expiration,
//   })

//   have.save().then(savedHave => {
//     response.json(savedHave)
//   })
// })

app.get('/api/locations', (request, response) => {
  Location.find({}).then(locations => {
    response.json(locations)
  })
})

app.post('/api/locations', (request, response) => {
  const body = request.body
  console.log(body)

  if (body.longitude === undefined || body.latitude === undefined || body.numPeople === undefined || new Date(body.expiration) === undefined) {
    return response.status(400).json({ error: 'field missing' })
  }

  const location = new Location({
    identity: body.identity || "Site",
    name: body.name || "Unknown",
    longitude: body.longitude,
    latitude: body.latitude,
    numPeople: body.numPeople,
    expiration: body.expiration
  })

  location.save().then(savedLocation => {
    response.json(savedLocation)
  })
})

app.delete('/api/locations', (request, response) => {
    // do nothing
})

app.get('/api/events', (request, response) => {
    Connection.find({}).then(events => {
        response.json({
            events: events
        })
    })
})

app.post('/api/events', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.fromId === undefined || body.toId === undefined || body.description === undefined || body.allergenInformation === undefined) {
        return response.status(400).json({error: 'field missing'})
    }

    if (body.weekly.constructor !== Array || body.weekly.length !== 7) return response.status(400).json({ error: 'malformed days' })

    const rule = new RRule({
        freq: RRule.WEEKLY,
        interval: 1,
        byweekday: [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA].filter((r, i) => body.weekly[i])
    })

    const event = new Connection({
        name: body.name,
        fromId: body.fromId,
        toId: body.toId,
        description: body.description,
        allergenInformation: body.allergenInformation,
        rrule: rule.toString(),
    })

    event.save().then(savedEvent => {
        response.json(savedEvent)
    })
})

app.get('/api/events/:month', (request, response) => {
    let month = request.params.month
    if (!month || isNaN(month) || isNaN(Number(month)) || Number(month) < 1 || Number(month) > 12) return response.json({ error: 'bad' })
    month = Number(month)
    day1 = new Date(Date.UTC(2022, month - 1, 1))
    day2 = new Date(Date.UTC(2022, month, 0, 11, 59, 59))
    Connection.find({}).then(events => {
    result = []
    for (let e of events) {
      dates = rrulestr(e.rrule).between(day1, day2, inc=true)
      for (date of dates) {
        result.push({
            name: e.name,
            fromId: e.fromId,
            toId: e.toId,
            description: e.description,
            allergenInformation: e.allergenInformation,
            date: date
        })
      }
    }
    response.json({
      events: result
    })
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
