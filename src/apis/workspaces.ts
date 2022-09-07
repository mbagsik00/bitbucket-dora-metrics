import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IBaseQueryWithAuthorization } from './utils/query';
import { getWorkspaceUrl } from './routes';
import { getUser } from './user';

const getWorkspaces = ({ authorization }: IBaseQueryWithAuthorization) =>
  axios.get(getWorkspaceUrl(), {
    headers: {
      authorization,
    },
  });

export const useWorkspaces = () => {
  return useQuery(
    ['workspaces'],
    async () => {
      const user = getUser();

      if (!user) {
        return [];
      }

      const { data } = await getWorkspaces({
        authorization: user.auth,
      });

      return data.values;
    },
    { staleTime: Infinity, retry: false }
  );
};
