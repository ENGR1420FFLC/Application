import mongoose from "mongoose";

type Location = {
    id: mongoose.Types.ObjectId,
    longitude: Number,
    latitude: Number,
    num_people: Number,
    expiration: Date,
}

export default Location