import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (req) => {
    try{
        const token = req.cookies.get('token')?.value || '';
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return decodedToken.id;
    } catch(err){
        console.log(err);
        return NextResponse.error();
    }
}