import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { EmployeeAssignCounter } from "@/lib/model/employeeAssignCounter";
import { Counter } from "@/lib/model/counter";
import { User } from "@/lib/model/users";


export async function PUT(request,content) {

    let result=[];
    try{
        const employeeId=content.params.id;
        const payload= await(request.json());
        await mongoose.connect(connectionStr);
        const filter2={'employee':employeeId,'status':1};
        //payload.status=payload.assign_status;
        payload.status=0;
        // payload.assign_out_date_time = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
       
        //payload.assign_out_date_time = Date.now;
        const currentDate = new Date();

        // Format the date
        payload.assign_out_date_time = currentDate.toLocaleDateString();
        await mongoose.connect(connectionStr);
        result=await EmployeeAssignCounter.findOneAndUpdate(filter2,payload);
        const filter={"_id":result.counter};
        payload.status=1;
        await mongoose.connect(connectionStr);
        result=await Counter.findOneAndUpdate(filter,payload);
        result="Assign out successfully";

        const user = await User.findById(employeeId);

        // If the user is found, update the access_counter
        if (user) {
            user.access_counter = "";
            await user.save();
        }
    }
    catch(error)
    {
        result=error.message;
    }
    return NextResponse.json({result:result,success:true});
}