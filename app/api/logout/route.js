import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // const {token} = await (request.json());
    // if (!token) {
    //   return NextResponse.json({ msg: "Unauthorized - Token not provided",success:false }, { status: 401 });
    // }

    return NextResponse.json({ result: "Logout successful",success:true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}