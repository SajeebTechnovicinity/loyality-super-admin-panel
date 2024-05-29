import {NextResponse} from "next/server";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import {Admin} from "@/lib/model/admin";
import {connectionStr} from "@/lib/db";
import jwt from "jsonwebtoken"

export async function POST(request) {
    try {
        const {name, email, password, user_type} = await (request.json());
        if (!email || !password || !user_type) {
            return NextResponse.json({msg: 'invalid fields'}, {status: 400});
        }
        await mongoose.connect(connectionStr);
        const srcky=process.env.JWT_SECRET
        const record = {email: email};
        const user = await Admin.findOne(record);
        if (user) {
            let id = user.id;
            let is_admin = 1;
            let type = user.user_type;
            let is_user = await bcrypt.compare(password, user.password);
            if (is_user) {
                let token = jwt.sign({name,email,type,is_admin,id}, srcky,{ expiresIn: '1h' });
                return NextResponse.json({user, 'token': token}, {status: 200});
            }
        }
    } catch (error) {
        return NextResponse.json(error);
    }
    return NextResponse.json({'msg': 'Email or Password is incorrect'}, {status: 401});
}