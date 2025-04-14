"use client";

import axios from "axios";
import { useRef, useState } from "react";
import InputPage from "@/app/Components/Input/page";

export default function ReviewPage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post("http://localhost:3000/api/review", {
        title: titleRef.current?.value || "",
        description: descriptionRef.current?.value || "",
        content: contentRef.current?.value || "",
        ReviewEmail: emailRef.current?.value || "",
      });

      setData(response.data);

      // Clear form fields
      [titleRef, descriptionRef, contentRef, emailRef].forEach((ref) => {
        if (ref.current) ref.current.value = "";
      });
    } catch (err) {
      setError("Failed to submit review. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center p-6 min-h-screen bg-[#0f172a] text-white">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Submit Your Review</h1>

        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="text-sm font-medium text-gray-300">
              Title
            </label>
            <InputPage type="text" placeholder="Review title" ref={titleRef} />
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium text-gray-300">
              Short Description
            </label>
            <InputPage type="text" placeholder="Brief description" ref={descriptionRef} />
          </div>

          <div>
            <label htmlFor="content" className="text-sm font-medium text-gray-300">
              Review Content
            </label>
            <textarea
              id="content"
              placeholder="Write your detailed review here..."
              className="w-full p-4 rounded-md bg-[#1e293b] border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={5}
              ref={contentRef as any}
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Your Email
            </label>
            <InputPage type="email" placeholder="email@example.com" ref={emailRef} />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full mt-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition duration-200"
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-600/20 text-red-300 border border-red-500 rounded-md">
            {error}
          </div>
        )}

        {data && (
          <div className="mt-6 p-4 bg-green-600/10 text-green-300 border border-green-500 rounded-md">
            <h3 className="font-semibold mb-2">Review Submitted Successfully!</h3>
            <pre className="text-sm whitespace-pre-wrap break-words">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
