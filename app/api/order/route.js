import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { EmployeeAssignCounter } from "@/lib/model/employeeAssignCounter";
import { Counter } from "@/lib/model/counter";
import { User } from "@/lib/model/users";
import { Order } from "@/lib/model/order";
import { PaymentSetting } from "@/lib/model/payementSetting";
import { EarnPoint } from "@/lib/model/earnPoint";
import { Notification } from "@/lib/model/notification";
import sendNotification from "@/app/helper";


export async function POST(request) {

    let orderInfo=[];
    let earnPointInfo=[];
    let msg=[];
    try{
        const payload= await(request.json());
        await mongoose.connect(connectionStr);
        const currentDate = new Date();

        // Format the date
        payload.payment_date= currentDate.toLocaleDateString();
        
        let order =new Order(payload);   
        orderInfo=await order.save();

        let paymentSetting=await PaymentSetting.findOne();
        payload.amount=paymentSetting.money_to_points*payload.total_amount;
        payload.order=order._id;
        let earnPoint =new EarnPoint(payload);   
        earnPointInfo=await earnPoint.save();

        let userInfo=await User.findById(payload.user);
        userInfo.balance=userInfo.balance-payload.total_amount;
        userInfo.points = parseFloat(userInfo.points) + parseFloat(earnPointInfo.amount);
        let userDetails=await userInfo.save();

        payload.message="Payment Successfully recived";

        let notification =new Notification(payload);
        await notification.save();

        msg="Payment Successfully recived";

        if(userInfo.device_token)
        {
            const title = 'Order Notification';
            const body = 'Payment Successfully recived';
            const tokenList = [userInfo.device_token];
    
    
            const notificationSent = await sendNotification(title, body, tokenList);
    
            if (notificationSent) {
                console.log('Notification sent successfully');
            } else {
                console.error('Failed to send notification');
            }
        }


        return NextResponse.json({orderInfo,userDetails,earnPointInfo,msg,success:true});

        
    }
    catch(error)
    {
        msg=error.message;
        return NextResponse.json({msg,success:false});
    }
    
}

export async function GET(request) {
    try {
        await mongoose.connect(connectionStr);
        var orderList=await Order.find().populate('counter').populate('branch').populate('user').sort({ created_at: -1 });

        return NextResponse.json({orderList:orderList,success:true});


    }catch (e) {
        return NextResponse.json({message:e,success:false});

    }


}