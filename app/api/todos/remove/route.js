import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export const POST = async (req) => {
    try{
        const id = await getTokenData(req);
        const user = await User.findById(id).select('-password') || null;
        
        if(!user) return NextResponse.json({message: 'User not found'}, {status: 404})

        const { todos } = await req.json();
        user.todos = todos;
        await user.save();

        return NextResponse.json({message: 'Todos removed successfully'}, {status: 200})
    }catch(err){
        console.log(err);
        return NextResponse.error();
    }
}