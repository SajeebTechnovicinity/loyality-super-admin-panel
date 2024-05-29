import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Branch } from "@/lib/model/branch";
import { Counter } from "@/lib/model/counter";
import { User } from "@/lib/model/users";
import { Order } from "@/lib/model/order";

function date() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export async function GET(req) {
    let result = {};
    try {
        await mongoose.connect(connectionStr);
        const today = date();
        const order = await Order.countDocuments({payment_data: today});
        const totalPayment = await Order.aggregate([
            {
                $match: {
                    "payment_data": today // Match documents where the "name" field equals the desired name
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$total_amount" }, // Assuming 'amount' is the field you want to sum
                },
            },
        ]);

        const brandPayment = await Order.aggregate([
            {
                $match: {
                    "payment_data": today // Match documents where the "name" field equals the desired name
                }
            },
            {
                $group: {
                    _id: null,
                    brandAmount: { $sum: "$branch_receive" }, // Assuming 'amount' is the field you want to sum
                },
            },
        ]);

        const superAdminPayment = await Order.aggregate([
            {
                $match: {
                    "payment_data": today // Match documents where the "name" field equals the desired name
                }
            },
            {
                $group: {
                    _id: null,
                    adminAmount: { $sum: "$technovicinity_receive" }, // Assuming 'amount' is the field you want to sum
                },
            },
        ]);

        result = {
            order: order,
            totalPayment:totalPayment.length>0?totalPayment[0].totalAmount:0,
            brandPayment:brandPayment.length>0?brandPayment[0].brandAmount:0,
            superAdminPayment: superAdminPayment.length>0?superAdminPayment[0].adminAmount:0,
            date:today,
        };
    } catch (error) {
        result = error.message;
    }
    return NextResponse.json({ data: result, success: true });
}
