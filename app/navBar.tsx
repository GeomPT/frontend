'use client';

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
    }, [userId]);

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
        const userId = prompt("Please enter your user ID:");
        if (userId) {
            localStorage.setItem("userId", userId);
            setUserId(userId);
            fetchUserData(userId);
        }
    };

      {/* Gradient div below navbar */}
      <div className="h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 mb-8" />
    </>
  );
}
