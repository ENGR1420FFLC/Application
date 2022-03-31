import mongoose from "mongoose"
import Have from "./models/Have"
import Need from "./models/Need"
const axios = require('axios')

const allHaves = new Array<Have>()
const allNeeds = new Array<Need>()

const addHave = (
    name: string, 
    amount: number, 
    expiration=new Date(), 
    location = new mongoose.Types.ObjectId(),
    recurring=false,
    status="UNMET",
    description="No description provided..."
    ): Promise<Have> => {
    return new Promise((resolve, reject) => {

        const res: Have = {
            id: new mongoose.Types.ObjectId(),
            location: location,
            name: name,
            description: description,
            amount: amount,
            status: status,
            expiration: expiration,
            recurring: recurring
        }

        allHaves.push(res)
        resolve(res)
    })
}

const getAllHaves = (): Promise<Array<Have>> => {

    return new Promise((resolve, reject) => {
        resolve(allHaves)
    })
}

const addNeed = (
    name: string,
    amount: number,
    deadline = new Date(),
    location = new mongoose.Types.ObjectId(),
    recurring = false,
    status = "UNMET",
    description = "No description provided..."
): Promise<Need> => {
    return new Promise((resolve, reject) => {

        const res: Need = {
            id: new mongoose.Types.ObjectId(),
            location: location,
            name: name,
            description: description,
            amount: amount,
            status: status,
            recurring: recurring,
            deadline: deadline
        }

        allNeeds.push(res)
        resolve(res)
    })
}

const getAllNeeds = (): Promise<Array<Need>> => {

    return new Promise((resolve, reject) => {
        resolve(allNeeds)
    })
}

const Service = { getAllHaves, addHave, getAllNeeds, addNeed }

export default Service