import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req) {
    try{
   
    const body = await req.json();
    const {email, password} = body;

    console.log('password',password);

    

    const token =  jwt.sign({email: email, iat:1},'mysecretkey')
    console.log('token',token);

    if(!email || !password){
        return NextResponse.json({message: 'user is already exist'}, {status: 400})
    }

    const isUserPresent = await db.user.findUnique({
        where: {email: email}
    });

    console.log(isUserPresent);

    if(!isUserPresent) {
        return NextResponse.json({message: 'Invalid email'}, {status: 409})
    }

    const isPasswordMatch = await bcrypt.compare(password, isUserPresent.password);
    console.log(isPasswordMatch);
    if(!isPasswordMatch){
        return NextResponse.json({message: "Password dos't match"}, {status: 409})
    }

    console.log(isUserPresent.email);

    
    return NextResponse.json({data: {isUserPresent}, message: 'Login Successfull', token: token}, {status: 201})
    }catch(err){
        console.log(err);
        return NextResponse.json({message: 'something went wrong'}, {status: 500})
    }
}