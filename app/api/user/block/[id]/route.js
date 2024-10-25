import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Branch } from "@/lib/model/branch";
import { User } from "@/lib/model/users";



export async function GET(request, content) {
  let result = [];
  try {
    const id = content.params.id;
    const record = { _id: id };
    await mongoose.connect(connectionStr);
    const item = await User.findById(record);
    const result = await User.findOneAndUpdate({ _id: id }, { status: !item.status });
    return NextResponse.json({ result, success: true });
  } catch (error) {
    result = error.meesage;
    return NextResponse.json({result:error.meesage, success: false});
  }
}
