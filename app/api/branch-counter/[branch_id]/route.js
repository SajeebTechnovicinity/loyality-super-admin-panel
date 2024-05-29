import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import {Counter} from "@/lib/model/counter";
import { Branch } from "@/lib/model/branch";

export async function GET(request,content ){
    let result=[];
    try{
        let branchId=content.params.branch_id;
        await mongoose.connect(connectionStr);
        result = await Counter.find({'branch':branchId})
            .populate({path: 'branch',
            model: 'Branch'}).sort({ created_at: -1});
    }
    catch(error)
    {
        result=error.message;
    }
    return NextResponse.json(result);
}