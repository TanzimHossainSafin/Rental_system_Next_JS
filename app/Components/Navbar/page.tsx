"use client";
import React from "react";
import Link from "next/link";
import Button from "../Button/page";
import { signIn, useSession } from "next-auth/react";

export default function Navbar() {
  const session = useSession();
  return (
    <div className="flex ml-8 mr-8 py-12 text-2xl justify-between ">
      <div className="flex ml-5">
        <img
          src="/logo.webp"
          alt="Logo"
          className="h-15 w-auto rounded-full  object-contain"
        />
      </div>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/market">Market</Link>
      </div>
      <div>
        <Link href="/rent">Rent</Link>
      </div>
      <div>
        <Link href="/blogs">Review</Link>
      </div>
      <div className="flex gap-5 ">
        <div>
          {session.status != "authenticated" ? (
            <Button
              title={"Login"}
              size={"text-lg"}
              color={"bg-gray-500"}
              paddin={"pr-6 pl-6 pt-2 pb-2"}
            />
          ) : (
            <div>
              <Button
                title={"signout"}
                size={"text-lg"}
                color={"bg-red-600"}
                paddin={"pr-7 pl-7 pt-2 pb-2"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
