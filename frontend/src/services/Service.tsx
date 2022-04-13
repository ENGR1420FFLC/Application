import axios from "axios"
import Connection from "./models/Connection"
import ConnectionConstructor from "./models/ConnectionConstructor"
import ConnectionForm from "./models/ConnectionForm"
import Location from "./models/Location"

const getAllLocations = (): Promise<Location[]> => {
    return axios.get('/api/locations')
        .then((data: { data: any }) => data.data)
}

const getConnections = (month: number): Promise<Connection[]> => {
    return axios.get(`/api/events/${month}`)
        .then((data: { data: any }) => data.data.events.map((e: any) => ({ ...e, date: new Date(e.date)})))
}

const getAllConnectionConstructors = (): Promise<ConnectionConstructor[]> => {
    return axios.get('/api/events')
        .then((data: { data: any }) => data.data.events)
}

const addLocation = (location: Location): Promise<Location> => {

    const body = {
        identity: location.identity || "Site",
        name: location.name || "Unknown",
        longitude: location.longitude,
        latitude: location.latitude,
        numPeople: location.numPeople,
        expiration: location.expiration === -1 ? null : location.expiration
    }

    return axios.post('/api/locations', body).then(data => data.data)
}

const addConnection = (connection: ConnectionForm): Promise<ConnectionConstructor> => {

    const body = {
        name: connection.name || "Unknown",
        weekly: connection.days,
        fromId: connection.fromId,
        toId: connection.toId,
        description: connection.description,
        allergenInformation: connection.allergenInformation
    }

    return axios.post('/api/events', body)
        .then(data => data.data)
}

const deleteLocation = (location: Location): Promise<any> => {
    const config = {
        data: { id: location.id?.toString() }
    }

    return axios.delete('/api/locations', config)
        .then(data => data)
}

const Service = { 
    getAllLocations,
    getConnections, 
    getAllConnectionConstructors, 
    addLocation, 
    addConnection,
    deleteLocation
}

export default Service