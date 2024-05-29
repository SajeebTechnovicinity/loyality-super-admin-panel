import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {Counter} from "@/lib/model/counter";
import { Branch } from "@/lib/model/branch";

export async function GET(request,content) {
    let result = [];
    try {
        await mongoose.connect(connectionStr);
        let branchId=content.params.branch_id;
        result = await Counter.find({status:1,'branch':branchId}).populate({
            path:'branch',
            model:'Branch'
        }).sort({ created_at: -1 });
    } catch (error) {
        result = error.message;
    }
    return NextResponse.json(result);
}
