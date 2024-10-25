import { AuthUser, uploadBase64Img } from "@/app/helper";
import { connectionStr } from "@/lib/db";
import { Brand, brand } from "@/lib/model/brand";
import { Counter } from "@/lib/model/counter";
import { PaymentSetting } from "@/lib/model/payementSetting";
import { User } from "@/lib/model/users";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(req) {
    let result = [];

    try {
        await mongoose.connect(connectionStr);
        result = await PaymentSetting.findOne()
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
 
        result = await PaymentSetting.findOneAndUpdate(
            { /* criteria to find the document, e.g., { _id: payload._id } */ },
            {branch_receive:payload.branch_receive,
            money_to_points:payload.money_to_points,
            points_to_money:payload.points_to_money
            },
            { new: true, upsert: true }
        );
      
    } catch (error) {
        result = error;
    }
    return NextResponse.json({result, success: true});
}