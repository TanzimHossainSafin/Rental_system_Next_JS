import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest){
   const body=await req.json();
   const location=body.location;
   const price=body.price;
   const ownername=body.ownername;
   console.log(location, price, ownername);
   const rent=await prisma.rent.create({
    data:{
        location,
        price,
        ownername
    }
   });
   console.log(rent);
   return NextResponse.json ({message:"data received successfully",location,price,ownername}); 
}