import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest){
   const body=await req.json();
   const location=body.location;
   const price=parseInt(body.price);
   const ownername=body.ownername;
   const email=body.email;
   const rent=await prisma.rent.create({
    data:{
        location,
        price,
        ownername
    }
   });
   
   return NextResponse.json ({message:"data received successfully",location,price,ownername}); 
}