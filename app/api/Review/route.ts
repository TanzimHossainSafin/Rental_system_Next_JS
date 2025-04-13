import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const body=await req.json();
    const title=body.title;
    const description=body.description;
    const content=body.content;
    const ReviewEmail=body.ReviewEmail
    const data=await prisma.review.create({
        data:{
            title,
            description,
            content,
            ReviewEmail
        }
    });
    return NextResponse.json({
        message: "data received successfully",
        title,
        description,
        content
    });
}
