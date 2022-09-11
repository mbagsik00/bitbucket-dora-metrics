import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getDatesInRange } from '../utils/dateFormat';

export default function FailureRateChart({ deployments, startDate, endDate, environment }: any) {
  const [chartData, setChartData] = useState([]);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Deployment Failure Rate'
      }
    },
    scale: {
      ticks: {
        precision: 0
      }
    }
  };

  // Dates Ranges
  const labels = getDatesInRange(startDate, endDate);
  const data: { labels: any; datasets: any } = {
    labels,
    datasets: chartData
  };

  useEffect(() => {
    const datasets: any = [];

    Object.entries(deployments).forEach(([key, value]: any) => {
      const deploymentsDict: any = {};

      value.forEach((d: any) => {
        let deploymentCount = deploymentsDict[d.startedOn];

        if (deploymentCount) {
          deploymentsDict[d.startedOn] = deploymentCount + 1;
        } else {
          deploymentsDict[d.startedOn] = 1;
        }
      });

      datasets.push({
        label: key,
        backgroundColor: '#EF4444',
        data: labels.map((label) => deploymentsDict[label] || 0)
      });
    });

    if (environment) {
      setChartData(datasets.filter((d: any) => d.label === environment.name));
    }
  }, [deployments, environment]);

  return (
    <div className='w-full overflow-hidden'>
      <Bar options={options} data={data} height={80} />
    </div>
  );
}
