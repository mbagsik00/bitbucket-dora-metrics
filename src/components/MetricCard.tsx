import { ReactElement } from 'react';

interface IProps {
  color: string;
  icon: ReactElement;
  name: string;
  value: string | number | ReactElement;
}

export default function MetricCard({ color, icon, name, value }: IProps) {
  return (
    <div className='bg-gray-50 rounded-xl shadow p-2'>
      <div className='flex flex-row items-center'>
        <div className='flex-shrink pr-4'>
          <div className={`rounded-full p-3 ${color}`}>{icon}</div>
        </div>
        <div className='flex-1 text-right md:text-center'>
          <h5 className='font-bold uppercase text-black'>{name}</h5>
          <h3 className='font-bold text-3xl text-gray-600'>{value}</h3>
        </div>
      </div>
    </div>
  );
}
