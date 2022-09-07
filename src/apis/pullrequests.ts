import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { PullRequestState } from '../types/pullrequest';
import { pullRequestWithActivityMapper } from '../utils/pullrequestActivityMapper';
import { getUserAuthorizationHeader } from './user';
import { BASE_URL } from './routes';

interface IPullRequestsData {
  workspaceSlug?: string;
  repositorySlug?: string;
  state?: PullRequestState[];
  page: number;
}

const getPullRequests = async ({
  workspaceSlug,
  repositorySlug,
  state,
  page,
}: IPullRequestsData) => {
  const headers = getUserAuthorizationHeader();
  let pullRequestURL = `${BASE_URL}/repositories/${workspaceSlug}/${repositorySlug}/pullrequests?sort=-created_on&page=${page}`;

  if (state) {
    let stateQuery = '';
    state.forEach((value) => (stateQuery += `&state=${value}`));

    pullRequestURL = `${pullRequestURL}&${stateQuery}`;
  }

  const { data } = await axios.get(pullRequestURL, {
    headers,
  });

  return data.values;
};

interface IPullRequestActivityData {
  params: {
    workspaceSlug?: string;
    repositorySlug?: string;
    pullrequestId: string;
  };
  values: Record<string, any>[];
  nextUrl?: string;
}

const getPullRequestActivity = async ({
  params,
  values,
  nextUrl,
}: IPullRequestActivityData): Promise<any> => {
  const headers = getUserAuthorizationHeader();
  const { workspaceSlug, repositorySlug, pullrequestId } = params;

  const { data } = await axios.get(
    nextUrl ||
      `${BASE_URL}/repositories/${workspaceSlug}/${repositorySlug}/pullrequests/${pullrequestId}/activity?pagelen=20`,
    {
      headers,
    }
  );

  values.push(...data.values);

  if (data.next) {
    return getPullRequestActivity({
      params,
      values,
      nextUrl: data.next,
    });
  } else {
    return values;
  }
};

// TODO: Refactor to properly use react-query pagination
export const usePullRequests = (params: IPullRequestsData) => {
  return useQuery(
    ['pullRequests', params.workspaceSlug, params.repositorySlug],
    async () => {
      const { workspaceSlug, repositorySlug } = params;

      const pullRequests = await getPullRequests(params);

      // Get each pull request full activities
      const activities = await Promise.all(
        pullRequests.map(async (pr: any) => {
          const activityList: any[] = [];

          await getPullRequestActivity({
            params: {
              workspaceSlug,
              repositorySlug,
              pullrequestId: pr.id,
            },
            values: activityList,
          });

          return {
            id: pr.id,
            title: pr.title,
            created_on: pr.created_on,
            state: pr.state,
            activities: activityList,
          };
        })
      );

      // Get activity metrics
      const mappedPullRequestsWithMetrics = activities.map(
        pullRequestWithActivityMapper
      );

      return mappedPullRequestsWithMetrics;
    },
    { staleTime: 300_000, retry: 3 }
  );
};
