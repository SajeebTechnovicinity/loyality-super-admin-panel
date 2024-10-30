import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Branch } from "@/lib/model/branch";
import { Counter } from "@/lib/model/counter";
import { User } from "@/lib/model/users";
import { Order } from "@/lib/model/order";
import { AuthUser } from "@/app/helper";
import { ObjectId } from "mongodb";

export async function GET(req) {
    let result = {};
    try {
        // Connect to MongoDB
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(connectionStr);
        }

        // Fetch basic counts
        const branch = await Branch.countDocuments();
        const counter = await Counter.countDocuments();
        const staff = await User.countDocuments({ user_type: "employee" });
        const user = await User.countDocuments({ user_type: "user" });
        const order = await Order.countDocuments();

        // Get user info and filter by branch if needed
        const userInfo = await AuthUser();
        const branchFilter = userInfo.type === "branch-admin" 
            ? { branch: new ObjectId(userInfo.branch) }
            : {};

        // Aggregations with optional filtering
        const totalPayment = await Order.aggregate([
            { $match: branchFilter },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$total_amount" },
                },
            },
        ]);

        const brandPayment = await Order.aggregate([
            { $match: branchFilter },
            {
                $group: {
                    _id: null,
                    brandAmount: { $sum: "$branch_receive" },
                },
            },
        ]);

        const superAdminPayment = await Order.aggregate([
            { $match: branchFilter },
            {
                $group: {
                    _id: null,
                    adminAmount: { $sum: "$technovicinity_receive" },
                },
            },
        ]);

        // Prepare the result
        result = {
            order,
            branch,
            counter,
            staff,
            user,
            totalPayment: totalPayment[0]?.totalAmount || 0,
            brandPayment: brandPayment[0]?.brandAmount || 0,
            superAdminPayment: superAdminPayment[0]?.adminAmount || 0,
        };
    } catch (error) {
        console.error("Error:", error);
        result = { error: error.message };
    }

    // Return the response
    return NextResponse.json({ data: result, success: true });
}
