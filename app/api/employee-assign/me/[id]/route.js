import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { EmployeeAssignCounter } from "@/lib/model/employeeAssignCounter";
import { Counter } from "@/lib/model/counter";
import { User } from "@/lib/model/users";

export async function GET(request,content) {
    let result = [];

    try {
        const userId=content.params.id;
        await mongoose.connect(connectionStr);
        result = await EmployeeAssignCounter.find({employee:userId,status:1}).countDocuments();
        if(result>0)
        {
            result = await EmployeeAssignCounter.find({employee:userId,status:1}).populate([{
                path:'counter',
                model:'counters'
            },
            {
                path:'employee',
                model:'users'
            }  
            ])
                .sort({ created_at: -1 })
        }
        else
        {
            return NextResponse.json({msg:"Not Assigned",success:false});
        }
        
    } catch (error) {
        result = error.message;
    }
    return NextResponse.json({data:result,success:true});
}