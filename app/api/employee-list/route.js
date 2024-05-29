import {NextResponse} from "next/server";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import {User} from "@/lib/model/users";
import {connectionStr} from "@/lib/db";
import validator from "validator/es";
import {uploadBase64Img} from "@/app/helper";

export async function GET() {

    let result = [];

    try {
        await mongoose.connect(connectionStr);
        result = await User.find({ user_type: { $ne: "user" } }).populate('branch').sort({ created_at: -1 });
    } catch (error) {
        result = error;
    }
    return NextResponse.json(result);

}