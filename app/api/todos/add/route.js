import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";
import mongoose from "mongoose";

connect();

export const POST = async (req) => {
    try {
        const id = await getTokenData(req);
        const user = await User.findById(id).select('-password') || null;
        
        if(!user) return NextResponse.json({message: 'User not found'}, {status: 404})
        
        const { todo, _id } = await req.json();
        const newTodo = _id ? {todo, _id} : {todo, _id: new mongoose.Types.ObjectId()}
        user.todos = [...user.todos, newTodo];
        
        await user.save();

        return NextResponse.json({message: 'Todo added successfully'}, {status: 200})
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}