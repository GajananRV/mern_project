// src/components/PieChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  // Define chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to be responsive
    plugins: {
      legend: {
        position: 'top', // Position the legend at the top
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px' }}> {/* Control the chart size */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
