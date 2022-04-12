import mongoose from "mongoose";

type Location = {
    id: mongoose.Types.ObjectId,
    longitude: number,
    latitude: number,
    num_people: number,
    expiration: Date,
    identity: string
    name: string
}

export default Location