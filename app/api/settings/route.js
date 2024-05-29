import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {PrivacyPolicy} from "@/lib/model/privacyPolicy";
import { TermsCondition } from "@/lib/model/termsCondition";
import { Setting } from "@/lib/model/setting";

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let settings = await Setting.findOne();
        return NextResponse.json({data:settings, success: true});
    } catch (error) {
        return NextResponse.json({error, success: true});
    }

}