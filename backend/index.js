const express = require('express')
const app = express()
require('dotenv').config()
const FoodDelivery = require('./models/food_delivery')
const Location = require('./models/location')
const Have = require('./models/have')
const Need = require('./models/need')
const Event = require('./models/event')
const { RRule, RRuleSet, rrulestr } = require('rrule')
const e = require('express')

app.use(express.static('build'))
app.use(express.json())

app.get('/api', (request, response) => {
  response.json({content: "this is"})
});

app.get('/api/needs', (request, response) => {
  Need.find({}).then(needs => {
    response.json(needs)
  })
})

app.post('/api/needs', (request, response) => {
  const body = request.body

  if (body.location === undefined || body.name === undefined || body.description === undefined || body.amount === undefined || body.status === undefined || body.deadline === undefined) {
    return response.status(400).json({ error: 'field missing' })
  }

  const need = new Note({
    location: body.content,
    name: body.name,
    description: body.description,
    amount: body.amount,
    status: body.status,
    deadline: body.deadline
  })

  need.save().then(savedNeed => {
    response.json(savedNeed)
  })
})

app.get('/api/haves', (request, response) => {
  Have.find({}).then(haves => {
    response.json(haves)
  })
})

app.post('/api/haves', (request, response) => {
  const body = request.body

  if (body.location === undefined || body.name === undefined || body.description === undefined || body.amount === undefined || body.status === undefined || body.expiration === undefined) {
    return response.status(400).json({ error: 'field missing' })
  }

  const have = new Note({
    location: body.content,
    name: body.name,
    description: body.description,
    amount: body.amount,
    status: body.status,
    expiration: body.expiration,
  })

  have.save().then(savedHave => {
    response.json(savedHave)
  })
})

app.get('/api/locations', (request, response) => {
  Location.find({}).then(locations => {
    response.json(locations)
  })
})

app.post('/api/locations', (request, response) => {
  const body = request.body

  if (body.longitude === undefined || body.latitude === undefined || body.numPeople === undefined || body.expiration === undefined) {
    return response.status(400).json({ error: 'field missing' })
  }

  const location = new Note({
    longitude: body.longitude,
    latitude: body.latitude,
    numPeople: body.numPeople,
    expiration: body.expiration
  })

  location.save().then(savedLocation => {
    response.json(savedLocation)
  })
})

app.post('/api/events', (request, response) => {
  const body = request.body

  if (body.event_name === undefined || body.event_start === undefined || body.repeat === undefined) {
    return response.status(400).json({error: 'field missing'})
  }

  const rruleSet = new RRuleSet()

  if (body.repeat === "none") {
    rruleSet.rrule(new RRule({
      dtstart: new Date(body.event_start),
      count: 1,
    }))
  }

  else {
    const weekly = body.weekly
    if (weekly[0] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.SU,
        dtstart: new Date(body.event_start),
      }))
    }
    if (weekly[1] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.MO,
        dtstart: new Date(body.event_start),
      }))
    }
    if (weekly[2] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.TU,
        dtstart: new Date(body.event_start),
      }))
    }
    if (weekly[3] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.WE,
        dtstart: new Date(body.event_start),
      }))
    }
    if (weekly[4] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.TH,
        dtstart: new Date(body.event_start),
      }))
    }
    if (weekly[5] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.FR,
        dtstart: new Date(body.event_start),
      }))
    }
    if (weekly[6] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.SA,
        dtstart: new Date(body.event_start),
      }))
    }
    if (weekly[7] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.SU,
        dtstart: new Date(body.event_start),
      }))
    }
  }

  const rruleString = rrulestr(rruleSet.toString())

  const event = new Event({
    event_name: body.event_name,
    rrule: rruleString,
  })

  event.save().then(savedEvent => {
    response.json(savedEvent)
  })
})

app.get('/api/events', (request, response) => {
  const body = request.body
  
  if (body.month === undefined) {
    return response.status(400).json({error: 'month missing'})
  }
  month = Number(body.month)
  day1 = new Date(Date.UTC(2022, month - 1, 1))
  day2 = new Date(Date.UTC(2022, month, 0, 11, 59, 59))
  Event.find({}).then(events => {
    result = []
    for (e of events) {
      dates = rrulestr(e.rrule).between(day1, day2, inc=true)
      for (date of dates) {
        result.push({
            ...e,
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
