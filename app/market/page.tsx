import axios from "axios"

export default async function Market(){
    const user=await axios.get("http://localhost:3000/api/market");
    return(
        <div>
          <h1 className="flex justify-center items center ">{JSON.stringify(user.data)}</h1>
            This is Market Place page
        </div>
    )
}