import Layout from '../modules/Layout';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useEffect, useState } from 'react';
import { IPullRequestWithActivity } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorToastr from '../components/ErrorToastr';
import { PullRequestState } from '../types/pullrequest';
import PullRequestTable from '../modules/PullRequestTable';
import PaginationButton from '../components/PaginationButton';
import LoggedInUserContainer from '../modules/LoggedInUserContainer';
import PullRequestMetric from '../modules/PullRequestMetric';
import DeploymentMetric from '../modules/DeploymentMetric';
import { usePullRequests } from '../apis/pullrequests';

export default function PullRequests() {
  const { workspaceSlug, repositorySlug } = useParams();
  const [pullRequests, setPullRequests] = useState<IPullRequestWithActivity[]>(
    []
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const { status, data, error, refetch } = usePullRequests({
    workspaceSlug,
    repositorySlug,
    state: [PullRequestState.OPEN, PullRequestState.MERGED],
    page: pageNumber,
  });

  useEffect(() => {
    const mappedPullRequests = data
      ? data.map((pr: any) => ({
          id: pr.id,
          title: pr.title,
          created: pr.created,
          state: pr.state,
          comment: pr.comment,
          approval: pr.approval,
          merged: pr.merged,
        }))
      : [];

    setPullRequests(mappedPullRequests);
    setLoading(false);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [pageNumber, refetch]);

  const nextPageOnClickHandler = () => {
    setPageNumber((pageNum) => ++pageNum);
    setLoading(true);
  };

  const prevPageOnClickHandler = () => {
    setPageNumber((pageNum) => --pageNum);
    setLoading(true);
  };

  const header = (
    <>
      <h1 className='text-xl tracking-tight text-gray-900'>
        <span className='font-bold'>Workspace: </span>
        <span>{workspaceSlug}</span>
      </h1>
      <h2 className='text-xl tracking-tight text-gray-900'>
        <span className='font-bold'>Repository: </span>
        <span>{repositorySlug}</span>
      </h2>
    </>
  );

  if (status === 'error') {
    return (
      <ErrorToastr message={error instanceof Error ? error.message : ''} />
    );
  }

  return (
    <LoggedInUserContainer>
      <Layout headerText={header}>
        <>
          <Breadcrumbs
            history={[
              { name: 'Workspaces', href: '/' },
              {
                name: 'Repositories',
                href: `/${workspaceSlug}/repositories`,
              },
              { name: repositorySlug! },
            ]}
          />

          {status === 'loading' ? (
            <LoadingSpinner />
          ) : (
            <>
              <DeploymentMetric
                workspaceSlug={workspaceSlug!}
                repositorySlug={repositorySlug!}
              />

              <PullRequestMetric
                workspaceSlug={workspaceSlug!}
                repositorySlug={repositorySlug!}
              />

              <PullRequestTable pullRequests={pullRequests} loading={loading} />

              <PaginationButton
                onNext={nextPageOnClickHandler}
                onPrev={prevPageOnClickHandler}
                pageNum={pageNumber}
                dataCount={pullRequests.length}
              />
            </>
          )}
        </>
      </Layout>
    </LoggedInUserContainer>
  );
}
