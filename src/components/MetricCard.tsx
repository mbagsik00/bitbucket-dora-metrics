import { ReactElement } from 'react';

interface IProps {
  color: string;
  icon: ReactElement;
  name: string;
  value: string | number | ReactElement;
}

export default function MetricCard({ color, icon, name, value }: IProps) {
  return (
    <div className='bg-gray-800 rounded-sm shadow p-2'>
      <div className='flex flex-row items-center'>
        <div className='flex-shrink pl-4'>
          <div
            className={`flex z-10 justify-center items-center w-10 h-10 rounded-full ring-0 ring-white shrink-0 ${color}`}
          >
            {icon}
          </div>
        </div>
        <div className='flex-1 text-right md:text-center'>
          <h5 className='font-bold uppercase text-white'>{name}</h5>
          <h3 className='font-bold text-3xl text-gray-300'>{value}</h3>
        </div>
      </div>
    </div>
  );
}
