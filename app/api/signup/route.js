import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

connect();

export const POST = async (req) => {
    try{
        const { name, email, password } = await req.json();

        const user = await User.findOne({email});
        if(user) return NextResponse.json({message: "User already exists"}, {status: 400});

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            todos: [
                {todo: "1) Create your first todo", _id: new mongoose.Types.ObjectId()},
                {todo: "2) Press on me to complete", _id: new mongoose.Types.ObjectId()},
                {todo: "3) When completed, I'll be removed when reloaded", _id: new mongoose.Types.ObjectId()},
                {todo: "4) If missclicked, click me again to add back!", _id: new mongoose.Types.ObjectId()},
            ],
        });
        
        await newUser.save();

        const tokenData = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});

        const res = NextResponse.json({message: "User created successfully"}, {status: 200});
        res.cookies.set("token", tokenData, {
            httpOnly: true, 
            maxAge: 60 * 60 * 24, // seconds * minutes * hours
        });

        return res;
    } catch(err){
        console.log(err);
        return NextResponse.error();
    }
}