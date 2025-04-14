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
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    const sendUserData = async () => {
      const name = session?.user?.name;
      const email = session?.user?.email;

      if (status === "authenticated" && name && email) {
        try {
          await axios.post("/api/user", {
            name,
            email,
            emailVerified: status,
          });
          console.log("User data sent");
        } catch (error) {
          console.error("Error sending user data:", error);
        }
      }
    };

    if (!isLoading) sendUserData();
  }, [isLoading, status, session]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await axios.get("/api/homepage");
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f172a] text-white">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
          <p className="text-lg">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Latest Reviews</h1>

        {reviewsLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-400" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>No reviews available yet.</p>
            <Link href="/review" className="text-blue-400 hover:underline mt-2 block">
              Be the first to submit a review!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white text-gray-900 p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold">{review.title}</h2>
                {review.description && (
                  <p className="text-gray-600 mt-1">{review.description}</p>
                )}
                <p className="mt-2 line-clamp-3">{review.content}</p>
                <p className="text-sm text-gray-500 mt-3">
                  By: {review.ReviewEmail}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
