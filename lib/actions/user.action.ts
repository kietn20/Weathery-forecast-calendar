"use server";

import User from "../models/user.model";
import { connect } from "../db";

export async function createUser(user: any) {
    try {
        await connect();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.log(error);
    }
}

export async function getUserData(userObjectId: any) {
    try {
        await connect();
        const userData = await User.find({_id: userObjectId})
        return JSON.parse(JSON.stringify(userData));
    } catch (error) {
        console.log(error)
    }
}