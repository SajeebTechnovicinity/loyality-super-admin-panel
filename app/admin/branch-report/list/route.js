import { connectionStr } from "@/lib/db";
import { Branch } from "@/lib/model/branch";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  await mongoose.connect(connectionStr);
  
  // var result = await Counter.find().populate("counter");

  var result = await Branch.aggregate([
    {
      $lookup: {
        from: "orders", // The name of the counter collection
        localField: "_id", // The field in the order collection
        foreignField: "branch", // The field in the counter collection
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
