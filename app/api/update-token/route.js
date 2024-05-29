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
        userInfo.device_token=payload.device_token;
        let userDetails=await userInfo.save();

        msg="Token Updated Successfully";

        return NextResponse.json({userDetails,msg,success:true});

        
    }
    catch(error)
    {
        msg=error.message;
        return NextResponse.json({msg,success:false});
    }
    
}