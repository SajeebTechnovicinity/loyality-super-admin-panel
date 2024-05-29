import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {Branch} from "@/lib/model/branch";
import {Counter} from "@/lib/model/counter";
import {User} from "@/lib/model/users";
import {Order} from "@/lib/model/order";
import {AuthUser} from "@/app/helper";
import {ObjectId} from "mongodb";

export async function GET(req) {
    let result = {};
    try {
        await mongoose.connect(connectionStr);
        const branch = await Branch.countDocuments();
        const counter = await Counter.countDocuments();
        const staff = await User.countDocuments({user_type: "employee"});
        const user = await User.countDocuments({user_type: "user"});
        const order = await Order.countDocuments();
        const {ObjectId} = require('mongodb');
        var userInfo = await AuthUser();
        var srcData = {
            $match: {
                branch: new ObjectId(userInfo.branch), // Filtering by branch ID = 20
            }
        };

        var src = userInfo.type == "branch-admin" ? srcData : "";


        const totalPayment = await Order.aggregate([
            src,
            {
                $group: {
                    _id: null,
                    totalAmount: {$sum: "$total_amount"}, // Assuming 'amount' is the field you want to sum
                },
            },
        ]);

        const brandPayment = await Order.aggregate([
            src,
            {
                $group: {
                    _id: null,
                    brandAmount: {$sum: "$branch_receive"}, // Assuming 'amount' is the field you want to sum
                },
            },
        ]);

        const superAdminPayment = await Order.aggregate([
            src,
            {
                $group: {
                    _id: null,
                    adminAmount: {$sum: "$technovicinity_receive"}, // Assuming 'amount' is the field you want to sum
                },
            },
        ]);

        result = {
            order: order,
            branch: branch,
            counter: counter,
            staff: staff,
            user: user,
            totalPayment: totalPayment[0] ? totalPayment[0].totalAmount : 0,
            brandPayment: brandPayment[0] ? brandPayment[0].brandAmount : 0,
            superAdminPayment: superAdminPayment[0] ? superAdminPayment[0].adminAmount : 0,
        };
    } catch (error) {
        result = error.message;
    }
    return NextResponse.json({data: result, success: true});
}
