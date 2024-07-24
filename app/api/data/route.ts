import { connect } from "@/lib/db";
import User from "@/lib/models/user.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId) {
        return NextResponse.json({ message: "Not Authenticated"}, { status: 401 });
    }

    try {
        await connect();
        const userData = await User.find({_id: user?.publicMetadata.userId})

        if (!userData) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(userData[0], { status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 400})
    }
}