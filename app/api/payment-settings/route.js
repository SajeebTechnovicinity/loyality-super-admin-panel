import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { PaymentSetting } from "@/lib/model/payementSetting";

export async function GET(req) {
    let result = [];

    try {
        await mongoose.connect(connectionStr);
        result = await PaymentSetting.findOne()
            .sort({ created_at: -1 })
    } catch (error) {
        result = error.message;
    }
    return NextResponse.json({data:result,success:true});
}

export async function PUT(request) {
    try {
        // Connect to MongoDB
        await mongoose.connect(connectionStr);
    
        // Extract the data to update from the request payload
        let payload = await request.json();
    
        // Find the first payment setting in the database
        let paymentSetting = await PaymentSetting.findOne();
    
        // Check if a privacy policy document exists
        if (!paymentSetting) {
            return NextResponse.json({ error: "No payment settings in the database", success: false });
        }
    
        // Update the fields of the found with the new data
        paymentSetting.set(payload);
    
        // Save the updated 
        await paymentSetting.save();
        
        // Return a success response with the updated privacy policy
        return NextResponse.json({ data:paymentSetting, success: true });
    } catch (error) {
        // Return an error response if an error occurs
        return NextResponse.json({ error: error.message, success: false });
    }
}