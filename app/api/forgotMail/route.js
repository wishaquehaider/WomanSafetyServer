import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, verifyToken } = body;

    const existingUserByEmail = await db.user.update({
      where: { email: email },
      data: {
        verifyToken: verifyToken,
      },
    });


    if(existingUserByEmail){
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "rehanmian200@gmail.com", // Your email address
          pass: "rwnahklmerqamllf", // Your email password or app-specific password
        },
      });
  
      // Prepare the email message
      const mailOptions = {
        from: "rehanmian200@gmail.com",
        to: email,
        subject: "Email Verification",
        text: `Your email verification code is ${verifyToken}.`,
      };
          await transporter.sendMail(mailOptions);
          return NextResponse.json({ message: "Successful " }, {status: 201});
    }else{
      return  NextResponse.json({message: 'Please enter correct mail address.'}, {status: 409})
    }


  } catch (error) {
    return NextResponse.json({message: 'something went wrong'}, {status: 500})
  }
}
