import mongoose from "mongoose";

type Location = {
    id: mongoose.Types.ObjectId | null,
    longitude: number,
    latitude: number,
    numPeople: number,
    expiration: Date | null | string | number,
    identity: string
    radius: number | null,
    weeklyNeeds: number[],
    isFFLCPartner: boolean | null,
    name: string
}

export default Location