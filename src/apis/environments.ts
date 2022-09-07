import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getUser } from './user';
import { queryStringBuilder, IBaseQueryWithAuthorization } from './utils/query';
import { getEnvironmentsUrl } from './routes';

interface IGetEnvironmentsByRepositoryQuery
  extends IBaseQueryWithAuthorization {
  workspaceSlug: string;
  repositorySlug: string;
}

const getEnvironmentsByRepository = ({
  workspaceSlug,
  repositorySlug,
  limit,
  authorization,
}: IGetEnvironmentsByRepositoryQuery) => {
  let url = getEnvironmentsUrl(workspaceSlug, repositorySlug);

  url = queryStringBuilder(url, { limit });

  return axios.get(url, {
    headers: {
      authorization,
    },
  });
};

interface IEnvironmentsData {
  workspaceSlug: string;
  repositorySlug: string;
}

export const useEnvironments = ({
  workspaceSlug,
  repositorySlug,
}: IEnvironmentsData) => {
  return useQuery(
    ['environments', workspaceSlug, repositorySlug],
    async () => {
      const user = getUser();

      if (!user) {
        return [];
      }

      const { data } = await getEnvironmentsByRepository({
        workspaceSlug,
        repositorySlug,
        limit: 20,
        authorization: user.auth,
      });

      return data;
    },
    { staleTime: 300_000, retry: 3 }
  );
};
