import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try{
      const body = await req.json()
      const {token} = body;
      console.log('speciall token is here',token);

      return NextResponse({message: 'ok '},{status: 201})

    }catch(err){

    }
}