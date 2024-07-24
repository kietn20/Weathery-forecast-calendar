import { Schema } from "mongoose";

const TagSchema = new Schema({
  id: {
    type: Number,
    required: false,
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