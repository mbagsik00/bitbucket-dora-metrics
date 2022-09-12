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
  const [datasets, setDatasets] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);

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

  useEffect(() => {
    const dateRanges = getDatesInRange(startDate, endDate);

    setLabels(dateRanges);
  }, [startDate, endDate])


  const data: { labels: any; datasets: any } = {
    labels,
    datasets: datasets.filter((d: any) => d.label === environment.name)
  };

  useEffect(() => {
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

      setDatasets((datasets) => [...datasets, {
        label: key,
        backgroundColor: '#EF4444',
        data: labels.map((label) => deploymentsDict[label] || 0)
      }])

    });
  }, [deployments]);

  return (
    <div className='w-full overflow-hidden'>
      <Bar options={options} data={data} />
    </div>
  );
}
