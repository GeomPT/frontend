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

    return (
        <>
            <header className="p-4 flex justify-between items-center">
                <Link href="/" passHref>
                    <h1 className="text-3xl font-bold text-blue-800 cursor-pointer">
                        GeomPT
                    </h1>
                </Link>
                <div className="flex-grow flex justify-end">
                    <Link href="/exercises" passHref>
                        <h1 className="bg-sky-500 text-white text-lg font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-sky-700 transition duration-300">
                            Exercises
                        </h1>
                    </Link>
                    <Link href="/progress" passHref>
                        <h1 className="bg-sky-500 text-white text-lg font-bold py-2 px-4 rounded-lg ml-4 cursor-pointer hover:bg-sky-700 transition duration-300">
                            Progress
                        </h1>
                    </Link>
                    <button
                        onClick={handleSignIn}
                        className="bg-sky-500 text-white text-lg font-bold py-2 px-4 rounded-lg ml-4 cursor-pointer hover:bg-sky-700 transition duration-300"
                    >
                        {userData ? `Welcome ${userData.name}` : "Sign In"}
                    </button>
                </div>
            </header>

            {/* Gradient div below navbar */}
            <div className="h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 mb-4" />
        </>
    );
}
