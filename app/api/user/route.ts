import prisma from "@/lib/prisma";
import { NextRequest,NextResponse} from "next/server";

export async function POST(req:NextRequest) {
  const body=await req.json();
  const name=body.name;
  const email=body.email;
  const emailVerified=body.emailVerified;

  const response=await prisma.user_Provider.findFirst({
    where:{
        email
    }
   });
 
   if(response==null){
    const data=await prisma.user_Provider.create({
        data:{
            name,
            email,
            emailVerified
        }
      })
    return NextResponse.json({message:"successfully Submit the data",data})
   }else{
    return NextResponse.json({message:"Sorry Data already existed"})
   }
  
}
