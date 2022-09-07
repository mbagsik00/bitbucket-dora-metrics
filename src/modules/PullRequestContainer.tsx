import { useEffect, useState } from 'react';
import { usePullRequests } from '../apis/pullrequests';
import ErrorToastr from '../components/ErrorToastr';
import LoadingSpinner from '../components/LoadingSpinner';
import PaginationButton from '../components/PaginationButton';
import { IPullRequestWithActivity } from '../types';
import { PullRequestState } from '../types/pullrequest';
import PullRequestMetric from './PullRequestMetric';
import PullRequestTable from './PullRequestTable';

interface IProps {
  workspaceSlug: string;
  repositorySlug: string;
}

export default function PullRequestContainer({
  workspaceSlug,
  repositorySlug,
}: IProps) {
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

  if (status === 'error') {
    return (
      <ErrorToastr message={error instanceof Error ? error.message : ''} />
    );
  }

  return status === 'loading' ? (
    <LoadingSpinner />
  ) : (
    <>
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
  );
}
