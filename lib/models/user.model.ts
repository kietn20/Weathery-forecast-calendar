import { Document, Schema, model, models } from "mongoose";
import {eventObjectSchema, IEventObject } from "./eventObject.model"
import { tagSchema } from "./tag.model";

interface IUser extends Document {
    clerkId: string,
    username: string,
    email: string,
    firstName?: string,
    lastName?: string,
    events: IEventObject[],
    tags: {
        name: string,
        color: string
    }[]
}

const UserSchema = new Schema({
    clerkId: {
        type: String, 
        required: true, 
        unique: true,
    },
    username: {
        type: String, 
        required: true, 
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    events: [eventObjectSchema],
    tags: [tagSchema]
})

const User = models?.User || model("User", UserSchema);

export default User;