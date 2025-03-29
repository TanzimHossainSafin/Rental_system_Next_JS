import axios from 'axios';
export default async function Rent(){
    const res = await axios.post("http://localhost:3000/api/rent", {
            location: "Las vegas",
            price: 1000,
            ownername: "Tanzim"
        });
    return (
        <div>
            This is rent page
            {res?.data.location}
        </div>
    );

}