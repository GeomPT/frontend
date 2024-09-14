'use client'

import { useState } from 'react';
import { Line } from 'react-chartjs-2'; 
import "chart.js/auto";
import {CategoryScale} from 'chart.js'; 
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

const WorkoutsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const workouts = [
    { name: 'Workout 1', progress: [80, 85, 90, 95], progressMade: true },
    { name: 'Workout 2', progress: [60, 65, 70, 75], progressMade: false },
    // Add more workouts as needed
  ];

  const getChartData = (workout) => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr'], // Example labels
    datasets: [
      {
        label: 'Scores',
        data: workout.progress,
        borderColor: workout.progressMade ? 'green' : 'red',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fill: false,
      },
    ],
  });

  /*
  NOTE TO OTHERS
  ALL WORKOUTS NEED TO BE REPLACED HERE
  WITH REAL DATA QUERIED FROM THE API
  */

  return (
    <div className="p-4 bg-gradient-to-r from-blue-200 to-purple-200 min-h-screen">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-800">Workouts</h1>
        <input
          type="text"
          placeholder="Search workouts..."
          className="border rounded-lg p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>
      <div>
        {workouts
          .filter(workout => workout.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((workout, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-xl font-bold">{workout.name}</h2>
              <Line data={getChartData(workout)} />
              <div className={`w-16 h-4 rounded-lg ${workout.progressMade ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default WorkoutsPage;
