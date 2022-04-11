import mongoose from "mongoose";

type Connection = {
    id: mongoose.Types.ObjectId,
    fulfiller: mongoose.Types.ObjectId,
    name: String,
    quantity: Number,
    date: Date,
}

export default Connection