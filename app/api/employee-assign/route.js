import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { EmployeeAssignCounter } from "@/lib/model/employeeAssignCounter";
import { Counter } from "@/lib/model/counter";
import { User } from "@/lib/model/users";

export async function GET(req) {
    let result = [];

    try {
        await mongoose.connect(connectionStr);
        result = await EmployeeAssignCounter.find().populate([{
            path:'counter',
            model:'counters'
        },
        {
            path:'employee',
            model:'users'
        }  
        ])
            .sort({ created_at: -1 })
    } catch (error) {
        result = error.message;
    }
    return NextResponse.json({data:result,success:true});
}
export async function POST(request) {

    let result=[];
    try{
        const payload= await(request.json());
        await mongoose.connect(connectionStr);
        //already counter available check
        const filter2={"_id":payload.counter,status:0};
        let result2=await Counter.countDocuments(filter2);

        if(result2>0)
        {
            return NextResponse.json({msg:"This Counter is not available now",success:false});
        }
        payload.assign_date_time = Date.now;
        const currentDate = new Date();

        // Format the date
        payload.assign_date_time = currentDate.toLocaleDateString();
        //payload.assign_date_time = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
        payload.assign_out_date_time = null;

        let employeeAssign =new EmployeeAssignCounter(payload);
        const filter={"_id":payload.counter};
        payload.status=0;
        await mongoose.connect(connectionStr);
        result=await Counter.findOneAndUpdate(filter,payload);
        result=await employeeAssign.save();

        const user = await User.findById(payload.employee);

        // If the user is found, update the access_counter
        if (user) {
            user.access_counter = payload.counter;
            await user.save();
        }

    }
    catch(error)
    {
        result=error.message;
    }
    return NextResponse.json({result,success:true});
}