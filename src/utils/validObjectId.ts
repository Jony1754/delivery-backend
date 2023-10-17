import mongoose from "mongoose";
export function validObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}