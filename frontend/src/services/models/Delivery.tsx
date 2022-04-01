import mongoose from "mongoose";

type FoodDelivery = {
    id: mongoose.Types.ObjectId,
    needId: mongoose.Types.ObjectId,
    fulfiller: String,
    haveId: mongoose.Types.ObjectId,
    name: String,
    quantity: Number,
    allergenInformation: String,
    expirationDate: Date,
    fulfillmentDate: Date,
    status: String,
}

export default FoodDelivery