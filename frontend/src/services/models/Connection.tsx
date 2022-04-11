import mongoose from "mongoose";

type Connection = {
    id: mongoose.Types.ObjectId,
    name: string,
    fromId: mongoose.Types.ObjectId,
    toId: mongoose.Types.ObjectId,
    description: string,
    date: Date
    allergenInformation: string,
}

export default Connection