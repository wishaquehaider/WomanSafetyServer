import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST (req){
    try {
        const body = await req.json();
        const {message} = body;
        console.log(message);
      

  const user = await db.msg.create({
    data: {
        message: message
    }
  })

        console.log('reslut', user);
        return NextResponse.json({message: 'ok'}, {status: 201})
    } catch (error) {
        console.log('error======>>>', error);
        return NextResponse.json({message: 'something went wrond'}, {status: 500})
    }
}


// export async function GET() {
//     try {
//         const messages = await db.msg.findMany();
//         console.log('messages====>>>>', messages);

//         // Return the messages as a JSON response
//         return NextResponse.json({ messages }, { status: 201 });
//     } catch (error) {
//         console.error('Error getting messages:', error);
//         // Handle errors here
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }