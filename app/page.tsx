"use client";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const name = session.data?.user?.name;
  const email = session.data?.user?.email;
  const emailVerified = session.status;
  //this check if the satus change of the currect 
  useEffect(() => {
    if (session.status !== "loading") {
      setIsLoading(false);
    }
  }, [session.status]);

  useEffect(() => {
    const sendData = async () => {
      if (session.status === "authenticated" && name && email) {
        try {
          await axios.post("http://localhost:3000/api/user", {
            name,
            email,
            emailVerified,
          });
          console.log("Data sent successfully");
        } catch (error) {
          console.error("Error sending data:", error);
        }
      }
    };
    
    if (!isLoading) {
      sendData();
    }
  }, [isLoading, session.status, name, email, emailVerified]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-2">Loading session data...</p>
      </div>
    );
  }

  return (
    <div className="flex m-4 p-4 justify-center items-center gap-5">
      {JSON.stringify(session)}
    </div>
  );
}