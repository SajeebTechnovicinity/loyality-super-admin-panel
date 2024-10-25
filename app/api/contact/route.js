import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Contact } from "@/lib/model/contact";

export async function GET(){
    let result=[];
    try{
        await mongoose.connect(connectionStr);
        result = await Contact.find();
    }
    catch(error)
    {
        result=error;
    }
    return NextResponse.json({data:result});
}
export async function POST(request) {

    let result=[];
    try{
        const payload= await(request.json());
        await mongoose.connect(connectionStr);
        let contact =new Contact(payload)
        result=await contact.save();
    }
    catch(error)
    {
        result=error.message;
        return NextResponse.json({msg:result,success:false});
    }
    return NextResponse.json({data:result,success:true});
}