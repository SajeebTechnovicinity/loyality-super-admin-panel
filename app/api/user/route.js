import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Branch } from "@/lib/model/branch";
import { User } from "@/lib/model/users";

export async function GET(request, content) {
  let result = [];
  try {
    const info = await new URL(request.url)
    const searchParams = info.searchParams;
    let page = Number(searchParams.get('page')) || 1;
    let limit = Number(searchParams.get('limit')) || 12;
    let skip = (page - 1) * limit;

    await mongoose.connect(connectionStr);
    const result = await User.find().skip(skip).limit(limit).sort({created_at:-1});
    return NextResponse.json({ result, success: true });
  } catch (error) {
    result = error;
  }
  return NextResponse.json(result);
}
