import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserMoneyChart: React.FC<{ data: number[], labels: string[] }> = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Solde de l\'utilisateur',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Historique du Solde de l\'Utilisateur',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default UserMoneyChart;