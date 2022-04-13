import mongoose from "mongoose";

type Location = {
    id: mongoose.Types.ObjectId | null,
    longitude: number,
    latitude: number,
    numPeople: number,
    expiration: Date | null | string | number,
    identity: string
    name: string
}

export default Location