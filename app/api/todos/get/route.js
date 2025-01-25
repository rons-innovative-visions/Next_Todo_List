import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export const GET = async (req) => {
    try{
        const id = await getTokenData(req);
        const user = await User.findById(id).select('-password') || null;
        
        if(!user) {
            const res = NextResponse.json({message: 'User not found'}, {status: 404});
            res.cookies.set("token", "", {httpOnly: true, expires: new Date(0), maxAge: 0});
            return res;
        }
        
        return NextResponse.json({user}, {status: 200})
    } catch(err){
        console.log(err);
        return NextResponse.error();
    }
}