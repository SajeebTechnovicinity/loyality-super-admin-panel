import { AuthUser, uploadBase64Img } from "@/app/helper";
import { connectionStr } from "@/lib/db";
import { Brand, brand } from "@/lib/model/brand";
import { Counter } from "@/lib/model/counter";
import { User } from "@/lib/model/users";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(req) {
    let result = [];

    try {
        await mongoose.connect(connectionStr);
        result = await Brand.findOne()
            .sort({ created_at: -1 })
    } catch (error) {
        result = error.message;
    }
    return NextResponse.json({data:result,success:true});
}


export async function POST(request) {
    let result = [];
    try {
        const payload = await (request.json());
        await mongoose.connect(connectionStr);
        if(payload.logo!=null && payload.logo!='')
        {
            payload.logo = await uploadBase64Img(payload.logo);
            result = await Brand.findOneAndUpdate(
                { /* criteria to find the document, e.g., { _id: payload._id } */ },
                {name:payload.name,logo:payload.logo},
                { new: true, upsert: true }
            );
        }
        else
        {
            result = await Brand.findOneAndUpdate(
                { /* criteria to find the document, e.g., { _id: payload._id } */ },
                {name:payload.name},
                { new: true, upsert: true }
            );
        }

      
    } catch (error) {
        result = error;
    }
    return NextResponse.json({result, success: true});
}