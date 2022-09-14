import { ReactElement } from 'react';

interface IProps {
  id: string;
  title: string;
  author: string;
  loading: boolean;
  state: ReactElement;
  leadTime: ReactElement;
}

function PullRequestSkeletonCard() {
  return (
    <div role='status' className='max-w-full animate-pulse'>
      <div className='flex flex-wrap overflow-hidden'>
        <div className='my-1 px-1 w-1/3 overflow-hidden sm:w-full md:w-full lg:w-1/3 xl:w-1/3'>
          <div className='grid grid-cols-12'>
            <div className='h-2.5 bg-gray-50 rounded-full dark:bg-gray-500 w-15 mb-4'></div>

            <div className='col-span-10'>
              <div className='mr-2 px-2.5 py-0.5 ml-2'>
                <div className='h-2.5 bg-gray-50 rounded-full dark:bg-gray-500 w-15 mb-4'></div>
                <div>
                  <div className='h-2.5 bg-gray-50 rounded-full dark:bg-gray-500 w-15 mb-4'></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='my-1 px-1 w-3/5 overflow-hidden sm:w-full md:w-full lg:w-3/5 xl:w-3/5'>
          <div className='h-2.5 bg-gray-50 rounded-full dark:bg-gray-500 w-15 mb-4'></div>
          <div className='h-2.5 bg-gray-50 rounded-full dark:bg-gray-500 w-15 mb-4'></div>
          <div className='h-2.5 bg-gray-50 rounded-full dark:bg-gray-500 w-15 mb-4'></div>
        </div>
      </div>
    </div>
  );
}

export default function PullRequestCard({ id, title, author, state, leadTime, loading }: IProps) {
  return (
    <div className='p-4 w-full bg-white rounded-sm border border-gray-200'>
      {loading ? (
        <PullRequestSkeletonCard />
      ) : (
        <>
          <div className='flex flex-wrap overflow-hidden'>
            <div className='my-1 px-1 w-1/3 overflow-hidden sm:w-full md:w-full lg:w-1/3 xl:w-1/3'>
              <div className='grid grid-cols-12'>
                <div>{state}</div>

                <div className='col-span-10'>
                  <div
                    className='text-gray-800 mr-2 px-2.5 py-0.5 ml-2 font-bold text-sm'
                    title={title}
                  >
                    {title.length > 70 ? `${title.substring(0, 70).trim()}...` : title}
                    <div className='text-gray-500 font-normal text-xs'>
                      Author: {author} | ID: {id}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='my-1 px-1 w-3/5 overflow-hidden sm:w-full md:w-full lg:w-3/5 xl:w-3/5'>
              {leadTime}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
