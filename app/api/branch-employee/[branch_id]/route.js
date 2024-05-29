import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import {Counter} from "@/lib/model/counter";
import {Admin} from "@/lib/model/admin";

export async function GET(request,content ){
    let result=[];
    try{
        let branchId=content.params.branch_id;
        await mongoose.connect(connectionStr);
        result = await Admin.find({'branch_id':branchId}).populate({path: 'branch_id',
            model: 'branches'}).sort({ created_at: -1});
    }
    catch(error)
    {
        result=error;
    }
    return NextResponse.json(result);
}