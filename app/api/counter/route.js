import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {Counter} from "@/lib/model/counter";
import { Branch } from "@/lib/model/branch";

export async function GET() {
    let result = [];
    try {
        await mongoose.connect(connectionStr);
        result = await Counter.find().populate({
            path:'branch',
            model:'Branch'
        }).sort({ created_at: -1 });
    } catch (error) {
        result = error.message;
    }
    return NextResponse.json(result);
}
export async function POST(request) {
    let result = [];
    try {
        const payload = await (request.json());
        await mongoose.connect(connectionStr);
        let data = await Counter.find();
        let counter_no = data.length + 1;
        let counter = new Counter({...payload, counter_no})
        result = await counter.save();
    } catch (error) {
        result = error;
    }
    return NextResponse.json({result, success: true});
}