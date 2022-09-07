import Table from '../components/Table';
import { IPullRequestWithActivity } from '../types';
import { PullRequestState } from '../types/pullrequest';
import { GoGitPullRequest, GoGitMerge } from 'react-icons/go';
import { convertToHour12 } from '../utils/dateFormat';
import PullRequestLeadTimeCard from '../components/PullRequestLeadTimeCard';

interface IProps {
  pullRequests: IPullRequestWithActivity[];
  loading: boolean;
}

export default function PullRequestTable({ pullRequests, loading }: IProps) {
  const tableHeader = [
    'id',
    'title',
    'state',
    'leadTime',
    'created',
    'comment',
    'approval',
    'merged',
  ];

  return (
    <Table
      loading={loading}
      header={tableHeader}
      data={pullRequests.map((pr) => ({
        id: pr.id,
        created: convertToHour12(pr.created),
        comment: convertToHour12(pr.comment),
        approval: convertToHour12(pr.approval),
        merged: convertToHour12(pr.merged),
        title:
          pr.title.length > 40
            ? `${pr.title.substring(0, 40).trim()}...`
            : pr.title,
        state: (
          <div className='flex pr-4'>
            {pr.state === PullRequestState.OPEN ? (
              <div className='rounded-full p-2 bg-blue-500' title='Open'>
                <GoGitPullRequest className='h-4' color='white' />
              </div>
            ) : pr.state === PullRequestState.MERGED ? (
              <div className='rounded-full p-2 bg-green-500' title='Merged'>
                <GoGitMerge className='h-4' color='white' />
              </div>
            ) : (
              ''
            )}
          </div>
        ),
        leadTime: <PullRequestLeadTimeCard pullRequest={pr} />,
      }))}
    />
  );
}
