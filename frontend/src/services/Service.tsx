import mongoose from "mongoose"
import Have from "./models/Have"
import Item from "./models/Item"
import Need from "./models/Need"
import Event from "./models/Event"
const { RRule, RRuleSet, rrulestr } = require('rrule')
const axios = require('axios')

enum ItemTypes {
    HAVE, NEED
}

const allHaves = new Array<Have>()
const allNeeds = new Array<Need>()
const allEvents = new Array<Event>();
const addItem = (
    type: ItemTypes,
    name: string, 
    amount: number, 
    expiry=new Date(), 
    location=new mongoose.Types.ObjectId(),
    recurring=false,
    status=(Math.floor(Math.random() * 3)),
    description="No description provided..."
): Promise<Item> => {
    return new Promise((resolve, reject) => {

        const res: Item = {
            id: new mongoose.Types.ObjectId(),
            location: location,
            name: name,
            description: description,
            amount: amount,
            status: status,
            expiry: expiry,
            recurring: recurring
        }

        if (type === ItemTypes.HAVE) allHaves.push(res)
        else allNeeds.push(res)
        resolve(res)
    })
}


const addHave = (
    name: string,
    amount: number,
    expiry = new Date(),
    location = new mongoose.Types.ObjectId(),
    recurring = false,
    status = (Math.floor(Math.random() * 3)),
    description = "No description provided..."
): Promise<Have> => addItem(ItemTypes.HAVE, name, amount, expiry, location, recurring, status, description)


const addNeed = (
    name: string,
    amount: number,
    expiry = new Date(),
    location = new mongoose.Types.ObjectId(),
    recurring = false,
    status = (Math.floor(Math.random() * 3)),
    description = "No description provided..."
): Promise<Need> => addItem(ItemTypes.NEED, name, amount, expiry, location, recurring, status, description)


const getAllHaves = (): Promise<Array<Have>> => {
    return new Promise((resolve, reject) => {
        resolve(allHaves)
    })
}

const getAllNeeds = (): Promise<Array<Need>> => {

    return new Promise((resolve, reject) => {
        resolve(allNeeds)
    })
}
const addEvent = (
    event_name:string,
    event_start: Date,
    repeat: string,
    weekly: Array<number>
): Promise<Event> => {
    return new Promise((resolve, reject) => {
        const rruleSet = new RRuleSet()

  if (repeat === "none") {
    rruleSet.rrule(new RRule({
      dtstart: new Date(event_start),
      count: 1,
    }))
  }

  else {
    if (weekly[0] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.SU,
        dtstart: new Date(event_start),
      }))
    }
    if (weekly[1] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.MO,
        dtstart: new Date(event_start),
      }))
    }
    if (weekly[2] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.TU,
        dtstart: new Date(event_start),
      }))
    }
    if (weekly[3] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.WE,
        dtstart: new Date(event_start),
      }))
    }
    if (weekly[4] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.TH,
        dtstart: new Date(event_start),
      }))
    }
    if (weekly[5] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.FR,
        dtstart: new Date(event_start),
      }))
    }
    if (weekly[6] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.SA,
        dtstart: new Date(event_start),
      }))
    }
    if (weekly[7] === 1) {
      rruleSet.rrule(new RRule({
        freq: RRule.MONTHLY,
        byweekday: RRule.SU,
        dtstart: new Date(event_start),
      }))
    }
  }

  const rruleString = rrulestr(rruleSet.toString())

  const res: Event = {
    event_name: event_name,
    rrule: rruleString,
  }
        
        allEvents.push(res)
        resolve(res)
    })
}
const getAllEvents = (month:number): Promise<Array<Object>> => {
  month = Number(month)
  const day1 = new Date(Date.UTC(2022, month - 1, 1))
  const day2 = new Date(Date.UTC(2022, month, 0, 11, 59, 59))
  const result = Array<Object>()
    for (let e of allEvents) {
      let dates = rrulestr(e.rrule).between(day1, day2,inc=true) //Typescript cannot specify parameter name like this. Don't know how to fix
      for (let date of dates) {
        result.push({
          event_name: e.event_name,
          data: e,
          date: date
        })
      }
    }
  
  return new Promise((resolve, reject) => {
      resolve(result)
  })
}

const Service = { getAllHaves, addHave, getAllNeeds, addNeed }

export default Service