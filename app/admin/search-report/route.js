import { connectionStr } from "@/lib/db";
import { Order } from "@/lib/model/order";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { counter } from "@/lib/model/counter";
import { user } from "@/lib/model/users";

// function dateFormate(dateInfo) {
//   const date = new Date(dateInfo);
//   const day = date.getDate();
//   const month = date.getMonth() + 1; // Months are zero-indexed
//   const year = date.getFullYear();
//   return `${month}/${day}/${year}`;
// }

// Define dateFormate function if necessary, otherwise, ensure dates are correctly formatted
function dateFormate(date) {
  // Example formatting if dates are in 'YYYY-MM-DD' format
  return new Date(date); // Adjust if necessary
}

// Function to reformat MM-DD-YYYY to YYYY-MM-DD
function reformatDate(dateStr) {
  const [month, day, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
}

export async function POST(request) {
  const { branchId, countId, startDate, endDate } = await request.json();
  let search = {};

  if (countId) {
    search.counter = countId;
  }
  if (branchId) {
    search.branch = branchId;
  }
  if (startDate && endDate) {
    console.log("Start date is " + startDate);
    console.log("End date is " + endDate);

    // Adjust endDate to include all records on the end date
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

    search.created_at = {
      $gte: new Date(startDate),
      $lt: adjustedEndDate
    };
  }

  try {
    // Connect to MongoDB using mongoose
    await mongoose.connect(connectionStr);

    // Define your Order schema and model
    const orderList = await Order.find(search)
    .populate([
      {
        path: 'counter',
        model: 'counters'
      },
      {
        path: 'user',
        model: 'users'
      },
      {
        path: 'branch',
        model: 'Branch'
      }
    ]);

    return NextResponse.json({ orderList, success: true });
  } catch (e) {
    return NextResponse.json({ message: e.message, success: false });
  }
}



