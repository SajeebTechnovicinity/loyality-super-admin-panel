import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import {Counter} from "@/lib/model/counter";
import { Branch } from "@/lib/model/branch";
import { PaymentSetting } from "@/lib/model/payementSetting";

export async function GET(request, content) {
    let result = {};
    let splitPaymentInfo = {};
    let technovicinityPaymentInfo = {};
    try {
        let counter_id = content.params.counter_id;
        await mongoose.connect(connectionStr);
        let counterExist = await Counter.countDocuments({_id:counter_id});
        if(counterExist<=0)
        {
            return NextResponse.json({ msg:"Invalid Counter", status:false});
        }
        result = await Counter.findById(counter_id).populate(
            {
                path:'branch',
                model:'Branch'
            }
        );
        splitPaymentInfo = await PaymentSetting.findOne();
        technovicinityPaymentInfo.public_key = 'FLWPUBK_TEST-871fc73aca10a3927751990add849f51-X';
        technovicinityPaymentInfo.secret_key = 'FLWSECK_TEST-9c9de9a334a635cd6fbbf7c933df78ed-X';
        technovicinityPaymentInfo.encryption_key = 'FLWSECK_TESTac6fe507dafe';
        technovicinityPaymentInfo.testing_mode = true;
    } catch (error) {
        result = error;
    }
    return NextResponse.json({ result, splitPaymentInfo, technovicinityPaymentInfo,status:true });
}

export async function PUT(request,content ){
    let result=[];
    try{
        const counterId=content.params.counter_id;
        const filter={"_id":counterId};
        const payload= await request.json();
        await mongoose.connect(connectionStr);
        const result=await Counter.findOneAndUpdate(filter,payload);
        return  NextResponse.json({result,success:true});
    }
    catch(error)
    {
        result=error;
    }
    return NextResponse.json(result);
}