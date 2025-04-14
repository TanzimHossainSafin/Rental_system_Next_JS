"use client";
import React from "react";
import Link from "next/link";
import Button from "../Button/page";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const userName = session.data?.user?.name;

  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-[#0f172a] text-white shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img
          src="/logo.webp"
          alt="Logo"
          className="h-12 w-12 rounded-full object-cover"
        />
        <span className="text-2xl font-semibold">Vara hobe</span>
      </div>

      {/* Navigation links */}
      <div className="flex space-x-6 text-lg">
        <Link href="/" className="hover:text-blue-400 transition">Home</Link>
        <Link href="/market" className="hover:text-blue-400 transition">Market</Link>
        <Link href="/rent" className="hover:text-blue-400 transition">Rent</Link>
        <Link href="/review" className="hover:text-blue-400 transition">Review</Link>
      </div>

      {/* User Info & Auth */}
      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <div className="flex items-center gap-2 text-sm bg-gray-800 px-3 py-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <span>{userName}</span>
          </div>
        )}

        <div>
          {!isAuthenticated ? (
            <button
              onClick={() => signIn()}
              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded text-white text-sm font-medium"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded text-white text-sm font-medium"
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
