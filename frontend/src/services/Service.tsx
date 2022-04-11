import axios from "axios"
import Connection from "./models/Connection"
import ConnectionConstructor from "./models/ConnectionConstructor"
import Location from "./models/Location"

const getAllLocations = (): Promise<Location[]> => {
    return axios.get('/api/locations')
        .then((data: { data: any }) => data.data)
}

const getConnections = (month: number): Promise<Connection[]> => {

    const config = {
        params: { month: month }
    }

    return axios.get('/api/connections', config)
        .then((data: { data: any }) => data.data)
}

const getAllConnectionConstructors = (): Promise<ConnectionConstructor[]> => {
    return axios.get('/api/connections')
        .then((data: { data: any }) => data.data)
}

const Service = { getAllLocations, getConnections, getAllConnectionConstructors }

export default Service