import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { EmployeeAssignCounter } from "@/lib/model/employeeAssignCounter";
import { Counter } from "@/lib/model/counter";
import { User } from "@/lib/model/users";
import { Order } from "@/lib/model/order";
import { PaymentSetting } from "@/lib/model/payementSetting";
import { EarnPoint } from "@/lib/model/earnPoint";


export async function POST(request) {

    let orderInfo=[];
    let earnPointInfo=[];
    let msg="";
    try{
        const payload= await(request.json());
        await mongoose.connect(connectionStr);

        let userInfo=await User.findById(payload.user);
        if(payload.points > userInfo.points)
        {
            msg="Insufficient Points";
            return NextResponse.json({msg,success:false}); 
        }
        let paymentInfo=await PaymentSetting.findOne();
        userInfo.balance=parseFloat(userInfo.balance)+parseFloat(payload.points)*parseFloat(paymentInfo.points_to_money);
        userInfo.points = parseFloat(userInfo.points) - parseFloat(payload.points);
        //return NextResponse.json({balance:userInfo.balance,success:true});

        let userDetails=await userInfo.save();

        msg="Successfully point convert to money";
        return NextResponse.json({msg,success:true});

        
    }
    catch(error)
    {
        msg=error.message;
        return NextResponse.json({msg,success:false});
    }
    
}