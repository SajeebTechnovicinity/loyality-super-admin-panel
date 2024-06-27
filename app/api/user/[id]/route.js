import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Branch } from "@/lib/model/branch";
import { User } from "@/lib/model/users";

export async function POST(request, content) {
  let result = [];
  const payload = await request.json();

  result = await User.findOneAndUpdate(
    { _id: payload.id },
    {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      branch: payload.branch,
      user_type: payload.user_type,
    }
  );

  return NextResponse.json({ result, success: true });
}

export async function GET(request, content) {
  let result = [];
  try {
    const id = content.params.id;
    const record = { _id: id };
    await mongoose.connect(connectionStr);
    const result = await User.findById(record);
    return NextResponse.json({ result, success: true });
  } catch (error) {
    result = error;
  }
  return NextResponse.json(result);
}
