import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { User } from "@/lib/model/users";



export async function POST(request) {

    let msg="";
    try{
        const payload= await(request.json());
        await mongoose.connect(connectionStr);


        let userInfo=await User.findById(payload.user);
        userInfo.is_notification_on=payload.notification_status;
        let userDetails=await userInfo.save();

        if(payload.notification_status==0)
        {
            msg="Notification Off Successfully";
        }
        else
        {
            msg="Notification On Successfully";
        }
       

        return NextResponse.json({userDetails,msg,success:true});

        
    }
    catch(error)
    {
        msg=error.message;
        return NextResponse.json({msg,success:false});
    }
    
}