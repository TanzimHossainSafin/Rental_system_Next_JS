import prisma from "@/lib/prisma";
import SignUp from "../Components/signup/page";

export default async function Market(){
    const user=await prisma.user.findFirst({
      where:{
        username:"tanzim"
      }
    })
    return(
        <div>
          <h1 className="bg-red-500 flex justify-center ">{user?.username}</h1>
            This is rent page
        </div>
    )

}