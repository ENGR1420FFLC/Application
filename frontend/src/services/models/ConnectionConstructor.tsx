import mongoose from "mongoose"

type ConnectionConstructor = {
    id: mongoose.Types.ObjectId,
    fromId: mongoose.Types.ObjectId,
    toId: mongoose.Types.ObjectId,
    name: string,
    description: string,
    rrule: string
}

export default ConnectionConstructor