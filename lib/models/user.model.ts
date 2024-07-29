import { Document, Model, ObjectId, Schema, model, models } from "mongoose";
import { TagSchema } from "./tag.model";
// import {eventObjectSchema, IEventObject } from "./eventObject.model"
// import { tagSchema } from "./tag.model";

interface ITag {
    _id: ObjectId;
    title: string;
    color: string;
  }

interface IUser extends Document {
    clerkId: string;
    username?: string;
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
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
      },
});

// Custom validator function to limit array size
function arrayLimit(val: ITag[]) {
    return val.length <= 5;
}

// Middleware to auto-increment tag ID
// UserSchema.pre("save", function (next) {
//     const user = this as IUser;
    
//     user.tags.forEach((tag, index) => {
//       if (tag.id === undefined) {
//         tag.id = index + 1;
//       }
//     });
  
//     next();
//   });
  
const User: Model<IUser> = models?.User || model<IUser>("User", UserSchema);

export default User;
