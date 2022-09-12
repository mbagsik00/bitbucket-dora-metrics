import { useEffect, useState } from 'react';
import { useDeployments } from '../apis/deployments';
import { useEnvironments } from '../apis/environments';
import DeploymentFrequencyChart from '../components/DeploymentFrequencyChart';
import ErrorToastr from '../components/ErrorToastr';
import FailureRateChart from '../components/FailureRateChart';
import LoadingSpinner from '../components/LoadingSpinner';
import { deploymentMapper } from '../utils/deploymentsMapper';

interface IProps {
  workspaceSlug: string;
  repositorySlug: string;
  environment: {
    name: string;
    uuid: string;
  };
}

// TODO: Environment based
export default function DeploymentMetric({ workspaceSlug, repositorySlug, environment }: IProps) {
  const [successfulDeployments, setSuccessfulDeployments] = useState({});
  const [failedDeployments, setFailedDeployments] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // TODO: Pass the environment on useDeployments
  const { status, data, error } = useDeployments({
    workspaceSlug,
    repositorySlug
  });

  const { data: envData } = useEnvironments({
    workspaceSlug,
    repositorySlug
  });

  useEffect(() => {
    const environments = envData?.values || [];
    const { startDate, endDate, successfulDeployments, failedDeployments } = deploymentMapper({
      deployments: data,
      environments
    });

    setStartDate(startDate);
    setEndDate(endDate);
    setSuccessfulDeployments(successfulDeployments);
    setFailedDeployments(failedDeployments);
  }, [data, envData]);

  if (status === 'error') {
    return <ErrorToastr message={error instanceof Error ? error.message : ''} />;
  }

  return (
    <>
      {status === 'loading' ? (
        <LoadingSpinner />
      ) : (
        <div className='flex flex-wrap -mx-2 overflow-hidden'>
          <div className='h-full my-2 px-2 w-1/2 overflow-hidden lg:w-1/2 xl:w-1/2'>
            <DeploymentFrequencyChart
              environment={environment}
              deployments={successfulDeployments}
              startDate={startDate}
              endDate={endDate}
            />
          </div>

          <div className='my-2 px-2 w-1/2 overflow-hidden lg:w-1/2 xl:w-1/2'>
            <FailureRateChart
              environment={environment}
              deployments={failedDeployments}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
      )}
    </>
  );
}
