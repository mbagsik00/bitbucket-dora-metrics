import { ReactElement } from 'react';

interface IProps {
  id: string;
  title: string;
  state: ReactElement;
  leadTime: ReactElement;
}

export default function PullRequestCard({ id, title, state, leadTime }: IProps) {
  return (
    <div className='p-4 w-full bg-white rounded-sm border border-gray-200'>
      <div className='flex'>
        <div className='grid grid-rows-2 grid-flow-col'>
          <div className='row-span-3 mt-1'>{state}</div>
          <div className='col-span-2 text-gray-800 mr-2 px-2.5 py-0.5 ml-2 font-bold text-l'>
            {title}
          </div>
          <div className='row-span-2 col-span-2 text-gray-500 px-2.5 ml-2 text-xs'>ID: {id}</div>
        </div>
      </div>

      <div className='mt-3 bg-gray-100 p-4'>{leadTime}</div>
    </div>
  );
}
