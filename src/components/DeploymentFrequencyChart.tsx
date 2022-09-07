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
import EnvironmentsDropdown from './EnvironmentsDropdown';

export default function DeploymentFrequencyChart({ deployments, startDate, endDate }: any) {
  const [chartData, setChartData] = useState([]);
  const [environment, setEnvironment] = useState('');

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Deployment Frequency'
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
    setEnvironment(
      Object.keys(deployments).filter((i) => ['production', 'prod'].includes(i.toLowerCase()))[0] ||
        Object.keys(deployments)[0]
    );
  }, [deployments]);

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
        backgroundColor: '#0052cc',
        data: labels.map((label) => deploymentsDict[label] || 0)
      });
    });

    if (environment) {
      setChartData(datasets.filter((d: any) => d.label === environment));
    }
  }, [deployments, environment]);

  return (
    <>
      <div className='float-right'>
        <EnvironmentsDropdown
          environmentList={Object.keys(deployments)}
          environment={environment}
          setEnvironment={setEnvironment}
        />
      </div>
      <div className='w-full overflow-hidden'>
        <Bar options={options} data={data} />
      </div>
    </>
  );
}
