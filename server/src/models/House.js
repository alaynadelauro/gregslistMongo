import { Schema } from "mongoose";

export const houseSchema = new Schema(
    {
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        description: { type: String, required: true, minlength: 2, maxlength: 50 },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
    }
)