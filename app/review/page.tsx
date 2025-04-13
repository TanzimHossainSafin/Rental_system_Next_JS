"use client";

import axios from 'axios';
import { useRef, useState } from 'react';
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
            
            // Clear form fields after successful submission
            if (titleRef.current) titleRef.current.value = "";
            if (descriptionRef.current) descriptionRef.current.value = "";
            if (contentRef.current) contentRef.current.value = "";
            if (emailRef.current) emailRef.current.value = "";
            
        } catch (err) {
            setError("Failed to submit review. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center p-6 max-w-2xl mx-auto'>
            <h1 className="text-3xl font-bold mb-6">Submit Your Review</h1>
            
            <div className="w-full space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <InputPage type="text" placeholder="Review title"  ref={titleRef} />
                </div>
                
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                    <InputPage type="text" placeholder="Brief description"  ref={descriptionRef} />
                </div>
                
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Review Content</label>
                    <textarea 
                        id="content"
                        placeholder="Write your detailed review here..."
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows={5}
                        ref={contentRef as any}
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <InputPage type="email" placeholder="email@example.com" ref={emailRef} />
                </div>
            </div>
            
            <button 
                className='px-4 py-2 mt-6 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 disabled:bg-blue-300'
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? "Submitting..." : "Submit Review"}
            </button>
            
            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            {data && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md w-full">
                    <h3 className="text-green-600 font-medium mb-2">Review Submitted Successfully!</h3>
                    <pre className="bg-white p-3 rounded overflow-auto text-sm">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}