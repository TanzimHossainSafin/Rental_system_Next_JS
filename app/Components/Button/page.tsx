"use client"
import { signIn } from "next-auth/react";

interface ButtonProps {
    title: string;
    size: string;
    color: string;
    paddin:string;
}

export default function Button({ title, size, color,paddin }: ButtonProps) {
   
    return (
        <button onClick={() => signIn()}type="submit" className={`cursor-pointer ${size} ${color} ${paddin} rounded `}>
            {title}
        </button>
    );
}