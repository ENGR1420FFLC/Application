import mongoose from "mongoose";

type Have = {
    id: mongoose.Types.ObjectId,
    location: mongoose.Types.ObjectId,
    name: String,
    description: String,
    amount: Number,
    status: String,
    expiration: Date, // NOTE: THIS IS NOT ON BACKEND YET!!!
    recurring: boolean
}

export default Have