import {Schema } from 'mongoose';

const tagSchema: Schema = new Schema({
    title: { type: String, required: true},
    color: { type: String, required: true}
});

export { tagSchema };