import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getUser } from './user';
import { queryStringBuilder, IBaseQueryWithAuthorization } from './utils/query';
import { getDeploymentsUrl } from './routes';

interface IGetDeploymentByRepositoryQuery extends IBaseQueryWithAuthorization {
  workspaceSlug: string;
  repositorySlug: string;
}

const getDeploymentByRepository = ({
  authorization,
  workspaceSlug,
  repositorySlug,
  limit,
  sort,
  query,
}: IGetDeploymentByRepositoryQuery) => {
  let url = getDeploymentsUrl(workspaceSlug, repositorySlug);

  url = queryStringBuilder(url, { limit, sort, query });

  return axios.get(url, {
    headers: {
      authorization,
    },
  });
};

interface IDeploymentsData {
  workspaceSlug: string;
  repositorySlug: string;
}

// FIXME: We only get the last 100 completed deployments in each environment
// Date filtering are not supported atm for deployments endpoint
export const useDeployments = ({
  workspaceSlug,
  repositorySlug,
}: IDeploymentsData) => {
  return useQuery(
    ['deployments', workspaceSlug, repositorySlug],
    async () => {
      const user = getUser();

      if (!user) {
        return [];
      }

      const { data } = await getDeploymentByRepository({
        workspaceSlug,
        repositorySlug,
        limit: 100,
        sort: '-state.started_on',
        query: 'state.name=COMPLETED',
        authorization: user.auth,
      });

      return data.values;
    },
    { staleTime: 300_000, retry: 3 }
  );
};
