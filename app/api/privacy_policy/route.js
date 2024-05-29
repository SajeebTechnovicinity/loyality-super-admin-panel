import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {PrivacyPolicy} from "@/lib/model/privacyPolicy";

export async function PUT(request) {
    try {
        // Connect to MongoDB
        await mongoose.connect(connectionStr);
    
        // Extract the data to update from the request payload
        let payload = await request.json();
    
        // Find the first privacy policy document in the database
        let privacyPolicy = await PrivacyPolicy.findOne();
    
        // Check if a privacy policy document exists
        if (!privacyPolicy) {
            return NextResponse.json({ error: "No privacy policy found in the database", success: false });
        }
    
        // Update the fields of the found privacy policy with the new data
        privacyPolicy.set(payload);
    
        // Save the updated privacy policy
        await privacyPolicy.save();
        
        // Return a success response with the updated privacy policy
        return NextResponse.json({ data:privacyPolicy, success: true });
    } catch (error) {
        // Return an error response if an error occurs
        return NextResponse.json({ error: error.message, success: false });
    }
}
export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let privacyPolicy = await PrivacyPolicy.findOne();
        return NextResponse.json({data:privacyPolicy, success: true});
    } catch (error) {
        return NextResponse.json({error, success: true});
    }

}