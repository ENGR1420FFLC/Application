import mongoose from "mongoose"
import Connection from "./models/Connection"
import Location from "./models/Location"
const { RRule, RRuleSet, rrulestr } = require('rrule')
const axios = require('axios')

enum ItemTypes {
    HAVE, NEED
}

const allConnections: Connection[] = []
const allLocations: Location[] = []

const getAllLocations = (): Promise<Location[]> => {
    return axios.get('/api/locations')
}

const getAllConnection = (): Promise<Connection[]> => {
    return axios.get('/api/events')
}

const Service = { getAllLocations, getAllConnection }

export default Service