import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getUser } from './user';
import { queryStringBuilder, IBaseQueryWithAuthorization } from './utils/query';
import { getRepositoriesUrl } from './routes';

interface IGetWorkspaceRepositoryQuery extends IBaseQueryWithAuthorization {
  workspaceSlug: string;
}

const getWorkspaceRepository = ({
  workspaceSlug,
  authorization,
  limit,
  sort,
}: IGetWorkspaceRepositoryQuery) => {
  let url = getRepositoriesUrl(workspaceSlug);

  url = queryStringBuilder(url, { limit, sort });

  return axios.get(url, {
    headers: {
      authorization,
    },
  });
};

export const useRepositories = (workspaceSlug: string) => {
  return useQuery(
    ['respositories', workspaceSlug],
    async () => {
      const user = getUser();

      if (!user) {
        return [];
      }

      // FIXME: Currently hardedcoded to only fetch 100 repositories in a workspace
      // TODO: Add infinite scroll functionality
      const { data } = await getWorkspaceRepository({
        limit: 100,
        sort: '-updated_on',
        authorization: user.auth,
        workspaceSlug,
      });

      return data.values;
    },
    { staleTime: 300_000, retry: 3 }
  );
};
