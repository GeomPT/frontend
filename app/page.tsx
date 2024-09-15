"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Demo from "@/components/ui/demo";
import NavBar from "./navBar";

const images = [
    "/images/placeholder2.png",
    "/images/placeholder3.png",
    "/images/placeholder4.png",
];

export default function LandingPage() {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
            <NavBar />
            <main className="container mx-auto px-4 py-16 text-center relative z-10">
                <h2 className="text-5xl md:text-5xl font-extrabold text-blue-900 mb-8 leading-tight">
                    Enhancing Your Physical Therapy with AI
                </h2>
                <p
                    className="text-xl md:text-1xl text-white-800 mb-6 max-w-3xl mx-auto"
                    style={{ color: "#000" }}
                >
                    Experience the future of rehabilitation with our AI-powered
                    physical therapy solutions. Personalized, precise, and
                    always by your side.
                </p>
                <Link href="/plan">
                    <button className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300">
                        Get Started
                    </button>
                </Link>

                <div className="mt-8 flex justify-center">
                    <div className="relative w-[200px] h-[200px]">
                        {/* Fixed size for image container */}
                        <AnimatePresence>
                            {images.map((src, index) => (
                                <motion.div
                                    key={index}
                                    className={`absolute inset-0 ${
                                        index === activeImageIndex
                                            ? "block"
                                            : "hidden"
                                    }`}
                                >
                                    <Image
                                        src={src}
                                        alt={`Image ${index + 1}`}
                                        width={200}
                                        height={200}
                                        className="rounded-lg pb-10"
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <Demo />

            {/* Footer section for copyright */}
            <footer className="bg-gray-800 text-white text-center py-4 shadow-md">
                <p className="text-sm">
                    <span>&copy;</span> {new Date().getFullYear()} GeoPT. All
                    rights reserved.
                </p>
            </footer>
        </div>
    );
}
