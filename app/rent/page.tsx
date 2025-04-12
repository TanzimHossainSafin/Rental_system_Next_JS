"use client";
import axios from 'axios';
import InputPage from "@/app/Components/Input/page";
import {  useRef, useState } from 'react';
export default function Rent(){
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
        <div className='flex flex-col justify-center items-center'>
          <h1>Give Rent Here </h1>
            <div className="flex flex-col justify-center items-center space-y-3">
            <InputPage type={"text"} placeholder={"location"}ref={locationRef}/>
            <InputPage type={"text"} placeholder={"price"} ref={priceRef}/>
            <InputPage type={"text"} placeholder={"ownername"} ref={ownerRef}/>
            </div>
            <button className='p-2 m-4 bg-blue-400 rounded cursor-pointer hover:bg-blue-600'  onClick={submit}>submit</button>
            {Data?"successfully submit data":"sorry data still now loaded please wait"}
            {Data && JSON.stringify(Data)}
            {/* {res?.data.location} */}
        </div>
    );

}