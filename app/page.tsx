"use client"
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session=useSession()
  return (
    <SessionProvider>
      <div className="flex m-4 p-4 justify-center items-center gap-5">
    {session.status === "authenticated" && <button onClick={() => signOut()}>Sign out</button>}
    {session.status === "unauthenticated" && <button onClick={() => signIn()}>Sign in</button>}
    <div>Welcome There</div>
    {JSON.stringify(session)}
    </div>
    </SessionProvider>
    
  );
}
