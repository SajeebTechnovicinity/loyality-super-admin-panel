import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { EmployeeAssignCounter } from "@/lib/model/employeeAssignCounter";
import { Counter } from "@/lib/model/counter";
import { User } from "@/lib/model/users";
import { Order } from "@/lib/model/order";
import { PaymentSetting } from "@/lib/model/payementSetting";
import { EarnPoint } from "@/lib/model/earnPoint";


export async function GET(request,content) {

    let msg="";
    let earnPointInfo=[];
    try{
        await mongoose.connect(connectionStr);
        const userId=content.params.id;
        
        earnPointInfo =await EarnPoint.find({user: userId}).populate({
            path:'order',
            model:'Order',
            populate: {
                path: 'counter',  
                model: 'counters',
            }
        }).sort({created_at:-1});   

        return NextResponse.json({earnPointInfo,msg,success:true});

        
    }
    catch(error)
    {
        msg=error.message;
        return NextResponse.json({msg,success:false});
    }
    
}