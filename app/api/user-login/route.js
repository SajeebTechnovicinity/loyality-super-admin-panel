import { connectionStr } from "@/lib/db";
import { User } from "@/lib/model/users";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {name, email, password,device_token} = await (request.json());
        if (!email || !password) {
            return NextResponse.json({msg: 'invalid fields','success':false}, {status: 400});
        }

        await mongoose.connect(connectionStr);
        const srcky=process.env.JWT_SECRET
        const record = {email: email};
        const user = await User.findOne(record);
        if (user) {
            if(user.is_delete==1) {
                return NextResponse.json({'msg': 'Account Already Deleted',success:false}, {status: 200});
            }

            if(user.status==0) {
                return NextResponse.json({'msg': 'Account Already Blocked',success:false}, {status: 200});
            }

            let id = user.id;
            let is_admin = 1;
            let type = user.user_type;
            let branch = user.branch;
            let is_user = await bcrypt.compare(password, user.password);
            if (is_user) {
                let token = jwt.sign({name,email,type,is_admin,id,branch}, srcky,{ expiresIn: '1h' });

                if(device_token)
                {
                    user.device_token=device_token

                    await user.save();
                }
                return NextResponse.json({user, 'token': token,'success':true}, {status: 200});
            }
        }
    } catch (error) {
        return NextResponse.json(error.message);
    }

    return NextResponse.json({'msg': 'Email or Password is incorrect','success':false}, {status: 200});
}