"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Review {
  id: string;
  title: string;
  description: string;
  content: string;
  ReviewEmail: string;
  createdAt: string;
}

export default function Home() {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  
  const name = session.data?.user?.name;
  const email = session.data?.user?.email;
  const emailVerified = session.status;
  
  //this check if the status change of the current session
  useEffect(() => {
    if (session.status !== "loading") {
      setIsLoading(false);
    }
  }, [session.status]);

  useEffect(() => {
    const sendData = async () => {
      if (session.status === "authenticated" && name && email) {
        try {
          await axios.post("/api/user", {
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

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await axios.get("/api/homepage");
        setReviews(response.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-2">Loading session data...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Original session data display */}
      <div className="flex m-4 p-4 justify-center items-center gap-5">
        {JSON.stringify(session)}
      </div>

      {/* Reviews section */}
      <div className="mt-10 max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Latest Reviews</h1>
        
        {reviewsLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-gray-500 text-center py-6">
            <p>No reviews available yet.</p>
            <Link href="/review" className="text-blue-500 hover:underline mt-2 block">
              Be the first to submit a review!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div 
                key={review.id}
                className="border border-gray-200 rounded p-4 hover:shadow transition-shadow"
              >
                <h2 className="text-lg font-semibold">{review.title}</h2>
                {review.description && (
                  <p className="text-gray-600 mt-1">{review.description}</p>
                )}
                <p className="mt-2 line-clamp-3">{review.content}</p>
                <p className="text-sm text-gray-500 mt-2">By: {review.ReviewEmail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}