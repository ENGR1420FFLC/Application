import mongoose from "mongoose"

type Item = {
    id: mongoose.Types.ObjectId,
    location: mongoose.Types.ObjectId,
    name: string,
    description: string,
    amount: number,
    status: number,
    expiry: Date, // NOTE: THIS IS NOT ON BACKEND YET!!!
    recurring: boolean
}

export default Item