import { Schema } from "mongoose";

const TagSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

export { TagSchema };