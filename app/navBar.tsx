"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Check if the userId is stored in localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserData(storedUserId);
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSignIn = () => {
    const userId = prompt(
      "Please enter your user ID:\n(e.g. Bob_8f0c3aae-30ce-4c6d-b6d1-0c3993e1808d)"
    );
    if (userId) {
      localStorage.setItem("userId", userId);
      setUserId(userId);
      fetchUserData(userId);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    setUserId("");
    setUserData(null);
  };

  return (
    <>
      <header className="p-4 flex justify-between items-center bg-white bg-opacity-50">
        <Link href="/" passHref>
          <h1 className="text-3xl font-bold text-blue-800 cursor-pointer">
            GeomPT
          </h1>
        </Link>
        <div className="flex-grow flex justify-end">
          <Link href="/exercises" passHref>
            <h1 className="bg-sky-500 text-white text-lg font-bold py-2 px-4 w-28 text-center rounded-lg cursor-pointer hover:bg-sky-700 transition duration-300">
              Exercises
            </h1>
          </Link>
          <Link href="/progress" passHref>
            <h1 className="bg-sky-500 text-white text-lg font-bold py-2 px-4 w-28 text-center rounded-lg ml-4 cursor-pointer hover:bg-sky-700 transition duration-300">
              Assess
            </h1>
          </Link>
          {userData ? (
            <button
              onClick={handleSignOut}
              className="bg-sky-500 text-white text-lg font-bold py-2 px-4 w-28 text-center rounded-lg ml-4 cursor-pointer hover:bg-sky-700 transition duration-300"
            >
              Sign Out
            </button>
          ) : (
            // example user_id for sign in "Bob_8f0c3aae-30ce-4c6d-b6d1-0c3993e1808d"
            <button
              onClick={handleSignIn}
              className="bg-sky-500 text-white text-lg font-bold py-2 px-4 w-28 text-center rounded-lg ml-4 cursor-pointer hover:bg-sky-700 transition duration-300"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Gradient div below navbar */}
      <div className="h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 mb-8" />
    </>
  );
}
