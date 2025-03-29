"use client";
import { SessionProvider, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    
      <SessionProvider>
        <div className="flex m-4 p-4 justify-center items-center gap-5">
          {JSON.stringify(session)}
        </div>
      </SessionProvider>

  );
}
