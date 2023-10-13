import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, fullName } = body;

    console.log(email);
    console.log(password);
    console.log(fullName);

    // Check if email is already exist
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    console.log(existingUserByEmail);

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashPassword = await hash(password, 10);
    // console.log(hashPassword);
    const newUser = await db.user.create({
      data: {
        email,
        fullName,
        password: hashPassword,
      },
    });

    const {password: newUserPassword, ...rest} = newUser;

    
    // const token =  jwt.sign({email: email, iat:1},'mysecretkey')
    // console.log('token',token);

    return NextResponse.json(
      { user: rest, message: "User added successfully"},
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { user: null, message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}