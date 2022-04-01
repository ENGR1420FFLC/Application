import mongoose from "mongoose"
import Have from "./models/Have"
import Item from "./models/Item"
import Need from "./models/Need"
const axios = require('axios')

enum ItemTypes {
    HAVE, NEED
}

const allHaves = new Array<Have>()
const allNeeds = new Array<Need>()

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

const Service = { getAllHaves, addHave, getAllNeeds, addNeed }

export default Service