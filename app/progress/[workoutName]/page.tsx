"use client";

import { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Image from "next/image";
import NavBar from "../../navBar";
import LiveVideoFrame from "@/components/ui/LiveVideoFrame";
import exercisesData from "@/public/rom_exercises.json"

const WorkoutProgressPage = ({
  params,
}: {
  params: { workoutName: string };
}) => {
  const { workoutName } = params;

  const [processingType, setProcessingType] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [dataPoints, setDataPoints] = useState([]);
  const [enlargedMedia, setEnlargedMedia] = useState(null);
  const scrollContainerRef = useRef(null);
  const clipRefs = useRef([]);
  const [userId, setUserId] = useState("");

  // Fetch exercise data
  useEffect(() => {
    const exercise = exercisesData.find((ex) => ex.name === workoutName);
    if (exercise) {
      setProcessingType(exercise.processingType);
      setDescription(exercise.description);
      setTitle(exercise.title);
    } else {
      console.warn(`Exercise with name ${workoutName} not found.`);
    }
  }, [workoutName]);

  useEffect(() => {
    // Check if the userId is stored in localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fetch data from the API
  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/users/${userId}/${workoutName}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        // Sort data by timestamp ascending
        data.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        setDataPoints(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [userId, workoutName]);

  // Assign fake dates based on today's date minus 14 days
  const assignFakeDates = (num) => {
    const dates = [];
    const today = new Date();
    for (let i = num - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const day = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      dates.push(day);
    }
    return dates;
  };

  const labels = assignFakeDates(
    dataPoints.length > 14 ? 14 : dataPoints.length
  );
  const angles = dataPoints.slice(-14).map((dp) => dp.value); // Last 14 or fewer

  const chartData = {
    labels,
    datasets: [
      {
        label: "Degrees",
        data: angles,
        borderColor: angles[angles.length - 1] >= angles[0] ? "green" : "red",
        backgroundColor: "rgba(0, 0, 0, 0)", // Transparent fill
        fill: false,
        tension: 0.4, // Smooth curves
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Workout Progress Over 2 Weeks",
        font: { size: 18 },
      },
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
        ticks: {
          color: "#555",
          font: { size: 14 },
        },
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

  // Scroll handlers
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -220,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 220,
        behavior: "smooth",
      });
    }
  };

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
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 pb-8">
      {/* Workout Title */}
      <h1 className="text-4xl font-bold text-center mt-8 mb-4">
        {title || workoutName}
      </h1>
      {/* Workout Description */}
      <p className="text-xl text-center text-gray-600 mb-8 mx-4">
        {description}
      </p>
      {/* Live Video Frame */}
      <div className="flex justify-center mb-8">
        <div className="w-4/5 md:w-3/5">
          <LiveVideoFrame
            width={1024} // Reduced size to 80%
            height={576}
            processingType={processingType}
            streaming={true}
            includeButton={true}
          />
        </div>
      </div>

      {/* Single Workout Display */}
      <div className="rounded-lg shadow-md p-6 mb-6 text-center">
        {/* Workout Progress Chart */}
        <h2
          className={`text-3xl font-semibold mb-4 ${
            angles[angles.length - 1] >= angles[0]
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          Progress Chart
        </h2>
        <div className="flex justify-center">
          <div className="w-3/4">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Clips Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-black mb-6">Recent Clips</h3>
          <div className="flex items-center justify-center">
            <button
              onClick={handleScrollLeft}
              className="mr-6 text-2xl text-black bg-white rounded-full p-3 shadow-md"
            >
              ←
            </button>
            <div
              ref={scrollContainerRef}
              className="flex space-x-8 overflow-x-auto w-4/5 scroll-smooth p-4"
              style={{ scrollBehavior: "smooth" }}
            >
              {dataPoints.slice(-14).map((clip, index) => {
                const date = new Date(clip.timestamp);
                const formattedDate = date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 relative transition-transform duration-300 hover:scale-105"
                    ref={(el) => (clipRefs.current[index] = el)}
                  >
                    <div className="border-2 border-gray-300 rounded-lg p-3">
                      <div
                        className="relative cursor-pointer"
                        onClick={() => setEnlargedMedia(clip)}
                      >
                        <Image
                          src={clip.imageUrl}
                          alt={`Clip with angle ${clip.value}° on ${formattedDate}`}
                          width={200}
                          height={150}
                          className="object-cover rounded-lg"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-12 h-12 text-white opacity-75"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                      {/* Caption */}
                      <p className="text-sm font-semibold text-center mt-2 bg-white bg-opacity-75 rounded py-1 px-2 shadow-sm text-black">
                        {formattedDate} - {clip.value}°
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={handleScrollRight}
              className="ml-6 text-2xl text-black bg-white rounded-full p-3 shadow-md"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Enlarged Media Overlay */}
      {enlargedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setEnlargedMedia(null)}
        >
          <div
            className="relative bg-white p-2 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={enlargedMedia.videoUrl}
              controls
              autoPlay
              className="max-w-full max-h-[80vh] rounded-lg"
            />
            <button
              onClick={() => setEnlargedMedia(null)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutProgressPage;
