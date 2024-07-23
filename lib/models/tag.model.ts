import {Schema } from 'mongoose';

const tagSchema: Schema = new Schema({
    name: { type: String, required: true},
    color: { type: String, required: true}
});

export { tagSchema };