import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Enregistrement des composants nécessaires
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface UserMoneyChartProps {
  soldeData: number[];
  entreeData: number[];
  sortieData: number[];
  labels: string[];
}

const UserMoneyChart: React.FC<UserMoneyChartProps> = ({ soldeData, entreeData, sortieData, labels }) => {
  // Données pour le graphique mixte (barres et ligne)
  const data: ChartData<'bar' | 'line'> = {
    labels: labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Solde',
        data: soldeData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: false,
        yAxisID: 'y',
      },
      {
        type: 'bar' as const,
        label: 'Entrée',
        data: entreeData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        yAxisID: 'y1',
      },
      {
        type: 'bar' as const,
        label: 'Sortie',
        data: sortieData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        yAxisID: 'y1',
      },
    ],
  };

  // Options du graphique
  const options: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        title: { display: true, text: 'Solde (€)' },
      },
      y1: {
        type: 'linear',
        position: 'right',
        title: { display: true, text: 'Entrées & Sorties (€)' },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return <Chart type="bar" data={data} options={options} />;
};

export default UserMoneyChart;
