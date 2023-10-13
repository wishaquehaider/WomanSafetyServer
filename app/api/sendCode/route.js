import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST (req){
    try {
        const  body = await req.json();
        const {verifyToken} = body;
        const user = await db.user.findUnique({
            where:{verifyToken: verifyToken}
        });

        if(!user){
          return NextResponse.json({message: 'please enter the correct code.'},{status: 409})
        }else{
          return NextResponse.json({message: 'successfull'})
        }

    } catch (error) {
        return NextResponse.json({message: 'Something went wrong'})
    }

}