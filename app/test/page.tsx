'use client';

import { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import "chart.js/auto";
import { cn } from "@/lib/utils";
import Image from 'next/image';

const WorkoutsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dataPoints, setDataPoints] = useState([]);
  const [enlargedMedia, setEnlargedMedia] = useState(null);
  const scrollContainerRef = useRef(null);
  const clipRefs = useRef([]);

  const userId = 'Bob_8f0c3aae-30ce-4c6d-b6d1-0c3993e1808d';
  const workoutName = 'knee1';

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/users/${userId}/${workoutName}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        // Sort data by timestamp ascending
        data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
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
      const day = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates.push(day);
    }
    return dates;
  };

  const labels = assignFakeDates(dataPoints.length > 14 ? 14 : dataPoints.length);
  const angles = dataPoints.slice(-14).map(dp => dp.value); // Last 14 or fewer

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Degrees',
        data: angles,
        borderColor: angles[angles.length - 1] >= angles[0] ? 'green' : 'red',
        backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent fill
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
        text: 'Workout Progress Over 2 Weeks',
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Degrees',
          font: { size: 16, weight: 'bold' },
          color: '#333',
        },
        ticks: {
          callback: value => `${value}°`,
          color: '#555',
          font: { size: 14 },
        },
        grid: { color: '#e0e0e0' },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: { size: 16, weight: 'bold' },
          color: '#333',
        },
        ticks: {
          color: '#555',
          font: { size: 14 },
        },
        grid: { color: '#e0e0e0' },
      },
    },
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        clipRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
  };

  // Scroll handlers
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-blue-200 to-purple-200 min-h-screen">
      <header className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          ← Back
        </button>
      </header>

      {/* Single Workout Display */}
      {workoutName.toLowerCase().includes(searchTerm.toLowerCase()) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          {/* Workout Name with Dynamic Font Color */}
          <h2 className={`text-4xl font-semibold mb-4 ${angles[angles.length - 1] >= angles[0] ? 'text-green-600' : 'text-red-600'}`}>
            {workoutName}
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
              <button onClick={handleScrollLeft} className="mr-6 text-2xl text-black bg-white rounded-full p-3 shadow-md">
                ←
              </button>
              <div
                ref={scrollContainerRef}
                className="flex space-x-8 overflow-x-auto w-4/5 scroll-smooth p-4"
                style={{ scrollBehavior: 'smooth' }}
              >
                {dataPoints.slice(-14).map((clip, index) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (dataPoints.length - index - 1));
                  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  return (
                    <div 
                      key={index} 
                      className="flex-shrink-0 relative transition-transform duration-300 hover:scale-105"
                      ref={el => clipRefs.current[index] = el}
                    >
                      <div className="border-2 border-gray-300 rounded-lg p-3">
                        <div className="relative cursor-pointer" onClick={() => setEnlargedMedia(clip)}>
                          <Image
                            src={clip.imageUrl}
                            alt={`Clip with angle ${clip.value}° on ${formattedDate}`}
                            width={200}
                            height={150}
                            className="object-cover rounded-lg"
                          />
                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-12 h-12 text-white opacity-75" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                        {/* Caption */}
                        <p className="text-sm font-semibold text-center mt-2 bg-white bg-opacity-75 rounded py-1 px-2 shadow-sm">
                          {formattedDate} - {clip.value}°
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button onClick={handleScrollRight} className="ml-6 text-2xl text-black bg-white rounded-full p-3 shadow-md">
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If no workouts match the search term */}
      {!workoutName.toLowerCase().includes(searchTerm.toLowerCase()) && (
        <p className="text-center text-gray-700">No workouts found.</p>
      )}

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

export default WorkoutsPage;
