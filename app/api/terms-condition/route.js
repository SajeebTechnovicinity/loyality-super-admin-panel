import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {PrivacyPolicy} from "@/lib/model/privacyPolicy";
import { TermsCondition } from "@/lib/model/termsCondition";

export async function PUT(request) {
    try {
        // Connect to MongoDB
        await mongoose.connect(connectionStr);
    
        // Extract the data to update from the request payload
        let payload = await request.json();
    
        // Find the first privacy policy document in the database
        let termsCondition = await TermsCondition.findOne();
    
        // Check if a privacy policy document exists
        if (!termsCondition) {
            return NextResponse.json({ error: "No terms condition found in the database", success: false });
        }
    
        // Update the fields of the found privacy policy with the new data
        termsCondition.set(payload);
    
        // Save the updated privacy policy
        await termsCondition.save();
        
        // Return a success response with the updated privacy policy
        return NextResponse.json({ data:termsCondition, success: true });
    } catch (error) {
        // Return an error response if an error occurs
        return NextResponse.json({ error: error.message, success: false });
    }
}
export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let termsCondition = await TermsCondition.findOne();
        return NextResponse.json({data:termsCondition, success: true});
    } catch (error) {
        return NextResponse.json({error, success: true});
    }

}