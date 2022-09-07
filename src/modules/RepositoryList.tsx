import { FaAngleRight } from 'react-icons/fa';
import { GoCode } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { IRepository } from '../types';

interface IProps {
  repositories: IRepository[];
}

export default function RepositoryList({ repositories }: IProps) {
  if (repositories.length === 0) {
    return (
      <div className='text-center'>
        <h2 className='text-lg text-blue-500 font-semibold'>
          No records found.
        </h2>
      </div>
    );
  }

  return (
    <div className='pt-2'>
      <div className='container flex flex-col mx-auto w-full items-center justify-center bg-gray-50 rounded-lg shadow'>
        <ul className='flex flex-col w-full divide-y'>
          {repositories.map((repository) => {
            return (
              <li key={repository.id} className='flex flex-row'>
                <div className='select-none flex flex-1 items-center p-4'>
                  <div className='flex flex-col w-10 h-10 justify-center items-center mr-4'>
                    <GoCode
                      className='mx-auto object-cover h-10 w-10'
                      color='#0052cc'
                    />
                  </div>
                  <div className='flex-1 pl-1 mr-16'>
                    <div className='font-medium'>{repository.name}</div>
                    <div className='text-gray-600 text-sm'>
                      {repository.description}
                    </div>
                  </div>
                  <div className='text-gray-600 text-xs'>
                    Last Updated:{' '}
                    {new Date(repository.updatedOn).toLocaleString()}
                  </div>
                  <Link
                    to={`/${repository.workspaceSlug}/repositories/${repository.slug}/pullrequests`}
                  >
                    <button
                      title='button'
                      className='w-24 text-right flex justify-end'
                    >
                      <FaAngleRight className='hover:text-blue-700 text-blue-500 h-7' />
                    </button>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
