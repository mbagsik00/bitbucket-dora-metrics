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

// TODO: update to only accept specific environment data
export default function DeploymentFrequencyChart({
  deployments,
  startDate,
  endDate,
  environment
}: any) {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);
  const [filteredDatasets, setFilteredDatasets] = useState<any[]>([]);

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
  useEffect(() => {
    const dateRanges = getDatesInRange(startDate, endDate);

    setLabels(dateRanges);
  }, [startDate, endDate]);

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

      setDatasets((datasets) => [
        ...datasets,
        {
          label: key,
          backgroundColor: '#0052cc',
          data: labels.map((label) => deploymentsDict[label] || 0)
        }
      ]);
    });
  }, [deployments]);

  useEffect(() => {
    const envData = datasets
      .filter((d: any) => d.label === environment.uuid)
      .map((d: any) => ({ ...d, label: environment.name }));

    setFilteredDatasets(
      envData.length > 0
        ? envData
        : [{ label: environment.name, backgroundColor: '#0052cc', data: [] }]
    );
  }, [environment, datasets]);

  return (
    <div className='w-full overflow-hidden'>
      <Bar
        options={options}
        data={{
          labels,
          datasets: filteredDatasets
        }}
      />
    </div>
  );
}
