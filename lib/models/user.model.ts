import { Document, Model, Schema, model, models } from "mongoose";
import {eventObjectSchema, IEventObject } from "./eventObject.model"
import { tagSchema } from "./tag.model";

interface IUser extends Document {
    clerkId: string,
    username: string,
    email: string,
    firstName?: string,
    lastName?: string,
    events: [],
    tags: []
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
    events: [],
    tags: []
})

const User: Model<IUser> = models?.User || model<IUser>("User", UserSchema);

export default User;