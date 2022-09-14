import { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { IoLogoBitbucket } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { getUser, storeAuthenticatedUser, useLoginUser } from '../apis/user';

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { data, error, refetch } = useLoginUser({ username, password });

  const user = getUser();

  const signInHandlerClick = async () => {
    try {
      if (username && password) {
        refetch();
      } else {
        setErrorMessage('Username and Password is required!');
      }
    } catch (err) {
      setErrorMessage('Invalid Username or Password!');
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (data) {
      storeAuthenticatedUser(data);
      navigate('/');
    }
  }, [data, navigate]);

  useEffect(() => {
    if (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Error encountered while logging in.'
      );
    }
  }, [error, navigate]);

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <IoLogoBitbucket className='mx-auto h-auto w-auto text-blue-500' size={80} />

          <h2 className='mt-6 text-center text-7xl tracking-tight font-bold text-blue-500'>
            Sign in
          </h2>
          <h2 className='mt-6 text-center text-md tracking-tight font-bold text-blue-500'>
            Sign in using your Bitbucket App Password credentials
          </h2>
        </div>

        <div className='rounded-md shadow-sm -space-y-px'>
          <div>
            <label htmlFor='username' className='sr-only'>
              Username
            </label>
            <input
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <input
              type='password'
              autoComplete='current-password'
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className='!mt-4'>
          <span className='text-sm text-red-500 font-bold'>{errorMessage}</span>
        </div>

        <div className='!mt-4'>
          <button
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            onClick={signInHandlerClick}
          >
            <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
              <FaLock
                className='h-5 w-5 text-indigo-500 group-hover:text-blue-400'
                aria-hidden='true'
                color='#5a80e7'
              />
            </span>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
