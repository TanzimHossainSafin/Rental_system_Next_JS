import { getServerSession } from "next-auth"

getServerSession
export default async function Blogs(){
    const session=await getServerSession();
    return(
        <div> 
            {session ? "authenticated" : "Not authenticated"}
            {JSON.stringify(session)}
        </div>
    )
}