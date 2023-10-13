import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
export async function POST (req){
    try {
        const body = await req.json();
        const {password, verifyToken} = body;
        const hashPassword = await hash(password, 10);

        const user = await db.user.update({
            where: {verifyToken: verifyToken},
            data: {
                password: hashPassword
            }
        })

        console.log('user final==>' ,user);
    
        return NextResponse.json({message: 'ok'})
    } catch (error) {
        
    }
}