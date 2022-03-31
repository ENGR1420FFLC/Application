import mongoose from "mongoose";

type Need = {
    id: mongoose.Types.ObjectId,
    location: mongoose.Types.ObjectId,
    name: String,
    description: String,
    amount: Number,
    status: String,
    deadline: Date,
    recurring: boolean
}

export default Need