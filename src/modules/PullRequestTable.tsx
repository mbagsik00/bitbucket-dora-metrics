// import Table from '../components/Table';
import { IPullRequestWithActivity } from '../types';
import { PullRequestState } from '../types/pullrequest';
import { GoGitPullRequest, GoGitMerge } from 'react-icons/go';
import Timeline from '../components/timeline';
import PullRequestCard from '../components/PullRequestCard';

interface IProps {
  pullRequests: IPullRequestWithActivity[];
  loading: boolean;
}

export default function PullRequestTable({ pullRequests, loading }: IProps) {
  // const tableHeader = ['id', 'title', 'state', 'leadTime'];

  return (
    <>
      {pullRequests.map((pr) => (
        <PullRequestCard
          key={pr.id}
          loading={loading}
          id={pr.id}
          title={pr.title}
          author={pr.author}
          leadTime={<Timeline pullRequest={pr} />}
          state={
            <>
              {pr.state === PullRequestState.OPEN ? (
                <div
                  className='flex z-10 justify-center items-center w-10 h-10 rounded-full ring-0 ring-white shrink-0 bg-blue-500'
                  title='Open'
                >
                  <GoGitPullRequest className='h-4' color='white' />
                </div>
              ) : pr.state === PullRequestState.MERGED ? (
                <div
                  className='flex z-10 justify-center items-center w-10 h-10 rounded-full ring-0 ring-white shrink-0 bg-green-500'
                  title='Merged'
                >
                  <GoGitMerge className='h-4' color='white' />
                </div>
              ) : (
                ''
              )}
            </>
          }
        />
      ))}
      {/* <Table
        loading={loading}
        header={tableHeader}
        data={pullRequests.map((pr) => ({
          id: pr.id,
          title: pr.title.length > 40 ? `${pr.title.substring(0, 40).trim()}...` : pr.title,
          state: (
            <div className='flex pr-4'>
              {pr.state === PullRequestState.OPEN ? (
                <div
                  className='flex z-10 justify-center items-center w-10 h-10 rounded-full ring-0 ring-white shrink-0 bg-blue-500'
                  title='Open'
                >
                  <GoGitPullRequest className='h-4' color='white' />
                </div>
              ) : pr.state === PullRequestState.MERGED ? (
                <div
                  className='flex z-10 justify-center items-center w-10 h-10 rounded-full ring-0 ring-white shrink-0 bg-green-500'
                  title='Merged'
                >
                  <GoGitMerge className='h-4' color='white' />
                </div>
              ) : (
                ''
              )}
            </div>
          ),
          leadTime: <Timeline pullRequest={pr} /> // <PullRequestLeadTimeCard pullRequest={pr} />
        }))}
      /> */}
    </>
  );
}
