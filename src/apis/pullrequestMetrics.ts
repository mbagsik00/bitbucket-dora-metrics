import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { PullRequestState } from '../types/pullrequest';
import { getUserAuthorizationHeader } from './user';
import { BASE_URL } from './routes';

interface IPullRequestsMetricsData {
  workspaceSlug?: string;
  repositorySlug?: string;
}

export const usePullRequestMetrics = ({
  workspaceSlug,
  repositorySlug,
}: IPullRequestsMetricsData) => {
  return useQuery(
    ['pullRequestMetrics', workspaceSlug, repositorySlug],
    async () => {
      const headers = getUserAuthorizationHeader();

      const getPullRequestURI = (state: PullRequestState) =>
        `${BASE_URL}/repositories/${workspaceSlug}/${repositorySlug}/pullrequests?state=${state}`;

      // Get all PRs
      const [openPRs, mergedPRs, declinedPRs] = await Promise.all([
        axios.get(getPullRequestURI(PullRequestState.OPEN), {
          headers,
        }),
        axios.get(getPullRequestURI(PullRequestState.MERGED), {
          headers,
        }),
        axios.get(getPullRequestURI(PullRequestState.DECLINED), {
          headers,
        }),
      ]);

      return {
        open: openPRs.data.size,
        merged: mergedPRs.data.size,
        declined: declinedPRs.data.size,
      };
    },
    { staleTime: 300_000, retry: 3 }
  );
};
