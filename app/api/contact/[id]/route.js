import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import {Counter} from "@/lib/model/counter";
import { Branch } from "@/lib/model/branch";
import { Contact } from "@/lib/model/contact";

export async function GET(request,content ){
    let result=[];
    try{
        let id=content.params.id;
        await mongoose.connect(connectionStr);
        result = await Contact.findById(id);
    }
    catch(error)
    {
        result=error.message;
    }
    return NextResponse.json(result);
}