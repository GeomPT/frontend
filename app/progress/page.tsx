"use client";

import { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { cn } from "@/lib/utils";
import Image from "next/image";
import NavBar from "../navBar";

const WorkoutsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const clipRefs = useRef([]);
    const [enlargedImage, setEnlargedImage] = useState(null);

    // Single workout with 14 days of progress data
    const workout = {
        name: "1st Exercise",
        progressMade: true,
        progressData: {
            "Sep 1": {
                angle: 80,
                imageUrl:
                    "https://orthoinfo.aaos.org/contentassets/9634f02f92b44e709ff03d69e7abf112/fig-6_calf-raises-compressor.jpg",
            },
            "Sep 2": {
                angle: 82,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
            "Sep 3": {
                angle: 85,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
            "Sep 4": {
                angle: 88,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
            "Sep 5": {
                angle: 90,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
            "Sep 6": {
                angle: 92,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
            "Sep 7": {
                angle: 95,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
            "Sep 8": {
                angle: 93,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
            "Sep 9": {
                angle: 96,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
            "Sep 10": {
                angle: 98,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
            "Sep 11": {
                angle: 100,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
            "Sep 12": {
                angle: 102,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
            "Sep 13": {
                angle: 105,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
            "Sep 14": {
                angle: 107,
                imageUrl:
                    "https://orthoinfo.aaos.org/globalassets/figures/a00067f09.jpg",
            },
        },
    };

    // Generate labels and data
    const labels = Object.keys(workout.progressData);
    const data = Object.values(workout.progressData).map((d) => d.angle);

    const getChartData = () => ({
        labels,
        datasets: [
            {
                data,
                borderColor: workout.progressMade ? "green" : "red",
                backgroundColor: "rgba(0, 0, 0, 0)",
                fill: false,
                tension: 0.4,
            },
        ],
    });

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            // title: { display: true, text: 'Workout Progress Over 2 Weeks', font: { size: 18 } },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Degrees",
                    font: { size: 16, weight: "bold" },
                    color: "#333",
                },
                ticks: {
                    callback: (value) => `${value}°`,
                    color: "#555",
                    font: { size: 14 },
                },
                grid: { color: "#e0e0e0" },
            },
            x: {
                title: {
                    display: true,
                    text: "Date",
                    font: { size: 16, weight: "bold" },
                    color: "#333",
                },
                ticks: { color: "#555", font: { size: 14 } },
                grid: { color: "#e0e0e0" },
            },
        },
        onClick: (evt, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                clipRefs.current[index]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        },
    };

    const scrollContainerRef = useRef(null);

    // Scroll to end on mount
    useEffect(() => {
        // Initialize refs array
        clipRefs.current = clipRefs.current.slice(0, labels.length);
        // Scroll to the end after a short delay to ensure content is rendered
        setTimeout(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft =
                    scrollContainerRef.current.scrollWidth;
            }
        }, 100);
    }, [labels.length]);

    return (
        <div className="p-4 bg-gradient-to-r from-blue-200 to-purple-200 min-h-screen">
            <NavBar />

            {/* Single Workout Display */}
            {workout.name.toLowerCase().includes(searchTerm.toLowerCase()) && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    {/* Workout Name with Dynamic Font Color */}
                    <h2
                        className={`text-3xl font-semibold mb-4 ${
                            workout.progressMade
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {workout.name}
                    </h2>
                    <div className="flex justify-center">
                        <div className="w-3/4">
                            <Line
                                data={getChartData()}
                                options={chartOptions}
                            />
                        </div>
                    </div>

                    {/* Recent Clips Section */}
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-black mb-6">
                            Recent Clips
                        </h3>
                        <div className="flex items-center justify-center">
                            <button
                                onClick={() =>
                                    scrollContainerRef.current.scrollBy({
                                        left: -220,
                                        behavior: "smooth",
                                    })
                                }
                                className="mr-6 text-2xl text-black bg-white rounded-full p-3 shadow-md"
                            >
                                ←
                            </button>
                            <div
                                ref={scrollContainerRef}
                                className="flex space-x-8 overflow-x-auto w-4/5 scroll-smooth p-4"
                                style={{ scrollBehavior: "smooth" }}
                            >
                                {labels.map((date, index) => {
                                    const clip = workout.progressData[date];
                                    return (
                                        <div
                                            key={index}
                                            className="flex-shrink-0 relative transition-transform duration-300 hover:scale-105"
                                            ref={(el) =>
                                                (clipRefs.current[index] = el)
                                            }
                                        >
                                            <div className="border-2 border-gray-300 rounded-lg p-3">
                                                <div
                                                    className="relative cursor-pointer"
                                                    onClick={() =>
                                                        setEnlargedImage(
                                                            clip.imageUrl
                                                        )
                                                    }
                                                >
                                                    <Image
                                                        src={clip.imageUrl}
                                                        alt={`Clip with angle ${clip.angle}° on ${date}`}
                                                        width={200}
                                                        height={150}
                                                        className="object-cover rounded-lg"
                                                    />
                                                </div>
                                                {/* Caption */}
                                                <p className="text-sm font-semibold text-center mt-2 bg-white text-black rounded py-1 px-2 shadow-sm">
                                                    {date} - {clip.angle}°
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <button
                                onClick={() =>
                                    scrollContainerRef.current.scrollBy({
                                        left: 220,
                                        behavior: "smooth",
                                    })
                                }
                                className="ml-6 text-2xl text-black bg-white rounded-full p-3 shadow-md"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* If no workouts match the search term */}
            {!workout.name.toLowerCase().includes(searchTerm.toLowerCase()) && (
                <p className="text-center text-gray-700">No workouts found.</p>
            )}

            {/* Enlarged Image Overlay */}
            {enlargedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setEnlargedImage(null)}
                >
                    <div
                        className="relative bg-white p-2 rounded-lg shadow-lg cursor-pointer"
                        onClick={() => setEnlargedImage(null)}
                    >
                        <Image
                            src={enlargedImage}
                            alt="Enlarged clip"
                            width={450}
                            height={350}
                            className="object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutsPage;
