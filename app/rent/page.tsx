"use client";

import axios from "axios";
import InputPage from "@/app/Components/Input/page";
import { useRef, useState } from "react";

export default function Rent() {
  const locationRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const ownerRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submit() {
    setIsLoading(true);
    setSubmitted(false);
    try {
      const response = await axios.post("http://localhost:3000/api/rent", {
        location: locationRef.current?.value || "",
        price: priceRef.current?.value || "",
        ownername: ownerRef.current?.value || "",
      });
      setData(response.data);
      setSubmitted(true);

      // Optional: Clear input fields after submission
      locationRef.current!.value = "";
      priceRef.current!.value = "";
      ownerRef.current!.value = "";
    } catch (error) {
      console.error("Error submitting data", error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0f172a] text-white">
      <h1 className="text-3xl font-bold mb-8">Give Rent Here</h1>

      <div className="space-y-4 w-full max-w-md">
        <InputPage type="text" placeholder="Location" ref={locationRef} />
        <InputPage type="text" placeholder="Price" ref={priceRef} />
        <InputPage type="text" placeholder="Owner Name" ref={ownerRef} />
      </div>

      <button
        className="mt-6 px-5 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
        onClick={submit}
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>

      <div className="mt-6">
        {!submitted && !isLoading && <p className="text-gray-300">Sorry, data still not loaded. Please wait.</p>}
        {submitted && (
          <div className="mt-4 p-4 bg-green-50 text-green-800 border border-green-300 rounded-md max-w-md">
            <p className="font-semibold">Successfully submitted data!</p>
            <pre className="mt-2 text-sm text-gray-900 bg-white p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
