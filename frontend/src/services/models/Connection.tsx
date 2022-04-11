import mongoose from "mongoose";

type Connection = {
    id: mongoose.Types.ObjectId,
    fromId: mongoose.Types.ObjectId,
    toId: mongoose.Types.ObjectId,
    name: string,
    description: string,
    date: Date
}

export default Connection