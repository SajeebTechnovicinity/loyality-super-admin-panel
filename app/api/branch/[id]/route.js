import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db"
import { Branch } from "@/lib/model/branch";


export async function PUT(request, content) {
    let result = [];
    try {
        const id = content.params.id;
        const filter = {_id: id};
        const payload = await request.json();
        // return NextResponse.json(payload.password);
        await mongoose.connect(connectionStr);
        let data=await Branch.findById(filter);

        const oldData=data._doc;

        const updatedata={...oldData,...payload}
        data=await Branch.findById(filter);
        result = await Branch.findOneAndUpdate(filter, updatedata);
    } catch (error) {
        return NextResponse.json({error:error.message, success: 'error found'});
    }
    return NextResponse.json({result, success: true});
}

export async function GET(request, content) {
    let result = [];
    try {
        const id = content.params.id;
        const record = {_id: id};
        await mongoose.connect(connectionStr);
        const result = await Branch.findById(record);
        return NextResponse.json({result, success: true});
    } catch (error) {
        result = error;
    }
    return NextResponse.json(result);
}