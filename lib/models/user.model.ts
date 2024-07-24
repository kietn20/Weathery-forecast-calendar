import { Document, Model, Schema, model, models } from "mongoose";
import { TagSchema } from "./tag.model";
// import {eventObjectSchema, IEventObject } from "./eventObject.model"
// import { tagSchema } from "./tag.model";

interface ITag {
    id: number;
    title: string;
    color: string;
  }

interface IUser extends Document {
    clerkId: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    events: any[];
    tags: ITag[];
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
    tags: {
        type: [TagSchema],
        default: [],
      },
})


// Middleware to auto-increment tag ID
UserSchema.pre("save", function (next) {
    const user = this as IUser;
    
    user.tags.forEach((tag, index) => {
      if (tag.id === undefined) {
        tag.id = index + 1;
      }
    });
  
    next();
  });
  

const User: Model<IUser> = models?.User || model<IUser>("User", UserSchema);

export default User;
