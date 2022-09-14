import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import base64 from 'base-64';
import { getUserUrl } from './routes';
import { IBaseQueryWithAuthorization } from './utils/query';

const loginUser = ({ authorization }: IBaseQueryWithAuthorization) =>
  axios.get(getUserUrl(), {
    headers: {
      authorization
    }
  });

interface IUserLogin {
  username: string;
  password: string;
}

export const useLoginUser = ({ username, password }: IUserLogin) => {
  return useQuery(
    ['user', username],
    async () => {
      try {
        const creds = `${username}:${password}`;
        const encodedCreds = `Basic ${base64.encode(creds)}`;

        const { data } = await loginUser({ authorization: encodedCreds });

        return {
          username: data.username,
          auth: encodedCreds
        };
      } catch (err) {
        throw err;
      }
    },
    { enabled: false, retry: false }
  );
};

export interface User {
  username: string;
  auth: string;
}

export const storeAuthenticatedUser = (data: User) => {
  window.localStorage.setItem(
    'user_details',
    JSON.stringify({
      username: data.username,
      auth: data.auth
    })
  );
};

export const getUser = (): User | null => {
  const user = window.localStorage.getItem('user_details');

  if (!user) {
    return null;
  }

  return JSON.parse(user);
};

export const getUserAuthorizationHeader = () => {
  const user = getUser();

  return {
    Authorization: user ? user.auth : ''
  };
};
