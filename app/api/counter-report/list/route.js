import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Counter } from "@/lib/model/counter";
import { Branch } from "@/lib/model/branch";
import { PaymentSetting } from "@/lib/model/payementSetting";

export async function GET(request, content) {
  await mongoose.connect(connectionStr);
  // var result = await Counter.find().populate("counter");

  var result = await Counter.aggregate([
    {
      $lookup: {
        from: "orders", // The name of the counter collection
        localField: "_id", // The field in the order collection
        foreignField: "counter", // The field in the counter collection
        as: "orderDetails", // The name of the field to store the
      },
    },
    {
      $unwind: "$orderDetails",
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        totalWalletAmount: { $sum: "$orderDetails.wallet_amount" },
        totalGatewayAmount: { $sum: "$orderDetails.gateway_amount" },
        totalAmount: { $sum: "$orderDetails.total_amount" },
      },
    },
  ]);

  return NextResponse.json(result);
}
