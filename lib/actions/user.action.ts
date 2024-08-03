"use server";

import User from "../models/user.model";
import { connect } from "../db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongoose";
import { auth } from "@clerk/nextjs/server";

export async function createUser(user: any) {
    try {
        await connect();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.log(error);
    }
}

export async function addNewTag(clerkId: string, newTag: { title: string, color: string}) {
    try {
        await connect();
        const user = await User.findOne({ clerkId })

        if (!user){
            return NextResponse.json({ message : "User not found"}, { status: 404});
        }

        // Checking if the tag array already have 5 elements
        if (user.tags.length >= 5) {
            return NextResponse.json({ message: "Tag limit reached"}, { status: 400 })
        }

        const nextId = user.tags.length + 1
        const tagWithId = { id: nextId, ...newTag};

        // Use $push to add new tag into tags array
        const updatedUser = await User.findOneAndUpdate(
            { clerkId },
            { $push: { tags: tagWithId }},
            { new: true, runValidators: false }
        );

        return JSON.parse(JSON.stringify(updatedUser));
        return NextResponse.json(updatedUser, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error adding tag", error }, { status: 500 })
    }
}

export async function updateTag(objectId: ObjectId, newTitle?: string, newColor?: string) {
    const { userId } = auth();

    if (!userId){
        return NextResponse.json({ message : "Not Authenticated"}, { status: 401});
    }

    try {
        await connect();

        const user = await User.findOne({ clerkId: userId })

        if (!user){
            return NextResponse.json({ message : "User not found"}, { status: 404});
        }

        // Find the tag by id and update its attributes
        const tag = user.tags.find(tag => tag?._id == objectId);
        if (!tag) {
            return NextResponse.json({ message: "Tag not found" }, { status: 404 })
        }

        if (newTitle) tag.title = newTitle;
        if (newColor) tag.color = newColor;

        // Save the updated user
        await user.save();

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error adding tag", error }, { status: 500 })
    }
}

export async function deleteTag(objectId: ObjectId) {
    const { userId } = auth();

    if (!userId){
        return NextResponse.json({ message : "Not Authenticated"}, { status: 401});
    }

    try {
        await connect();

        const user = await User.findOne({ clerkId: userId })

        if (!user){
            return NextResponse.json({ message : "User not found"}, { status: 404});
        }

        // Find the tag by id and delete it
        user.tags = user.tags.filter(tag => tag?._id != objectId);

        // Save the updated user
        await user.save();

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error adding tag", error }, { status: 500 })
    }
}

export async function addEventToDB(newEventData: any) {
    const { userId } = auth();

    if (!userId){
        return NextResponse.json({ message : "Not Authenticated"}, { status: 401});
    }

    try {
        await connect();

        const user = await User.findOne({ clerkId: userId })

        if (!user){
            return NextResponse.json({ message : "User not found"}, { status: 404});
        }

        console.log(newEventData);

        const newEvent = { title: newEventData.title, start: newEventData.start, end: newEventData.end, allDay: newEventData.allDay, repeat: newEventData.repeat, backgroundColor: newEventData.backgroundColor, tag_id: newEventData.tag_id, description: newEventData.description };
        
        console.log(JSON.stringify(newEvent));

        // Use $push to add new tag into tags array
        const updatedUser = await User.findOneAndUpdate(
            { clerkId: userId },
            { $push: { events: newEvent }},
            { new: true, runValidators: false }
        );
        console.log('updatedUser from user.actions:', JSON.stringify(updatedUser))
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error adding event", error }, { status: 500 })
    }
}

export async function updateCity(newCity : string) {
    const { userId } = auth();

    if (!userId){
        return NextResponse.json({ message : "Not Authenticated"}, { status: 401});
    }

    try {
        await connect();

        const user = await User.findOne({ clerkId: userId })

        if (!user){
            return NextResponse.json({ message : "User not found"}, { status: 404});
        }

        if (newCity) user.city = newCity;

        // Save the updated user
        await user.save();

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error adding tag", error }, { status: 500 })
    }
}