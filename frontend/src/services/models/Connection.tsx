import mongoose from "mongoose";

type Connection = {
    id: mongoose.Types.ObjectId,
    fromId: mongoose.Types.ObjectId,
    toId: mongoose.Types.ObjectId,
    name: string,
    description: string,
    date: Date
<<<<<<< HEAD
    allergenInformation: string,
=======
>>>>>>> 7b9a56746d2f10c9f42df7b96ef2d74a08cc1dbf
}

export default Connection