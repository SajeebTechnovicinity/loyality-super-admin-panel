import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import validator from "validator/es";
import { uploadBase64Img } from "@/app/helper";

export async function GET(request) {
  let result = [];

  try {
    const info = await new URL(request.url);
    const searchParams = info.searchParams;
    let page = Number(searchParams.get("page")) || 1;
    let limit = Number(searchParams.get("limit")) || 12;
    let skip = (page - 1) * limit;

    await mongoose.connect(connectionStr);
    result = await User.find().populate("branch");

    const filteredUsers = [];

    for (const user of result) {
      if (user.user_type !== "user") {
        filteredUsers.push(user);
      }
    }

    // Apply skip and limit to the filtered users
    const skippedUsers = filteredUsers.slice(skip, skip + limit);

    return NextResponse.json({ data: skippedUsers, success: true });
  } catch (error) {
    result = error.message;
  }
  return NextResponse.json(result);
}
