import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Branch } from "@/lib/model/branch";

export async function GET(req) {
    let result = [];

    try {
        await mongoose.connect(connectionStr);
        result = await Branch.find()
            .sort({ created_at: -1 })
    } catch (error) {
        result = error.message;
    }
    return NextResponse.json({data:result,success:true});
}
export async function POST(request) {

    let result=[];
    try{
        const payload= await(request.json());
        await mongoose.connect(connectionStr);
        let branch =new Branch(payload)
        result=await branch.save();
    }
    catch(error)
    {
        result=error;
    }
    return NextResponse.json({result,success:true});
}