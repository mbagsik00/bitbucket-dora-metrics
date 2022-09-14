import { useEffect, useState } from 'react';
import { GoArchive, GoGitMerge, GoGitPullRequest } from 'react-icons/go';
import { usePullRequestMetrics } from '../apis/pullrequestMetrics';
import ErrorToastr from '../components/ErrorToastr';
import LoadingSpinner from '../components/LoadingSpinner';
import MetricCard from '../components/MetricCard';
import { IPullRequestMetrics } from '../types';
import MetricContainer from './MetricContainer';

interface IProps {
  workspaceSlug: string;
  repositorySlug: string;
}

export default function PullRequestMetric({ workspaceSlug, repositorySlug }: IProps) {
  const [metrics, setMetrics] = useState<IPullRequestMetrics>();

  const { status, data, error } = usePullRequestMetrics({
    workspaceSlug,
    repositorySlug
  });

  useEffect(() => {
    setMetrics(data);
  }, [data]);

  if (status === 'error') {
    return <ErrorToastr message={error instanceof Error ? error.message : ''} />;
  }

  return (
    <>
      {status === 'loading' ? (
        <LoadingSpinner />
      ) : (
        <>
          <MetricContainer
            metricCards={[
              <MetricCard
                color='bg-blue-500'
                icon={<GoGitPullRequest className='h-5' color='white' />}
                name='Opened Pull Requests'
                value={metrics ? metrics.open : '-'}
              />,
              <MetricCard
                color='bg-green-500'
                icon={<GoGitMerge className='h-5' color='white' />}
                name='Merged Pull Requests'
                value={metrics ? metrics.merged : '-'}
              />,
              <MetricCard
                color='bg-red-500'
                icon={<GoArchive className='h-5' color='white' />}
                name='Abandoned Pull Requests'
                value={metrics ? metrics.declined : '-'}
              />
            ]}
          />
        </>
      )}
    </>
  );
}
