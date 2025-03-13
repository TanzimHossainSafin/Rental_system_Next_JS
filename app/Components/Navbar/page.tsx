"use Client";
import Link from "next/link";
import Button from "../Button/page";
import { signIn } from "next-auth/react";

export default function Navbar() {
  return (
    <div className="flex m-4 p-6 text-2xl justify-between">
      <div>
        
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
          
          <Button title={"Login"} size={"text-lg"} color={"bg-gray-500"} paddin={"pr-6 pl-6 pt-2 pb-2"}/>

        </div>
        <div>
          <Button title={"Join now"} size={"text-lg"} color={"bg-blue-500"} paddin={"pr-7 pl-7 pt-2 pb-2"}/>
        </div>
      </div>
    </div>
  );
}
