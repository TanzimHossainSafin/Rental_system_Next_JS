"use client";
import axios from 'axios';
import InputPage from "@/app/Components/Input/page";
import {  useRef, useState } from 'react';
export default async function Rent(){
    const locationRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const ownerRef = useRef<HTMLInputElement>(null);
    const [Data,setData]=useState(null);
    function submit() {
        const fetchData = async () => {
          const response = await axios.post("http://localhost:3000/api/rent", {
            location: locationRef.current?.value || "",
            price: priceRef.current?.value || "",
            ownername: ownerRef.current?.value || "",
          });
          setData(response.data);
        };
        fetchData();
      }
   
    // const res = await axios.post("http://localhost:3000/api/rent", {
    //         location: "Las vegas",
    //         price: 1000,
    //         ownername: "Tanzim"
    //     });
    return (
        <div>
            Rent Area: 
            <InputPage type={"text"} placeholder={"location"}ref={locationRef}/>
            <InputPage type={"text"} placeholder={"price"} ref={priceRef}/>
            <InputPage type={"text"} placeholder={"owner"} ref={ownerRef}/>
            <button onClick={submit}>submit</button>
            {Data && JSON.stringify(Data)}
            {/* {res?.data.location} */}
        </div>
    );

}