import { FaWrench } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ComingSoon() {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-200'>
      <section className='bg-white bg-gray-800'>
        <div className='py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12'>
          <FaWrench className='mx-auto mb-4 w-20 h-20 text-gray-200' />
          <h1 className='mb-4 text-4xl font-bold tracking-tight leading-none text-white lg:mb-6 md:text-5xl xl:text-6xl'>
            WORK IN PROGRESS
          </h1>
          <p className='font-light text-gray-200 md:text-lg xl:text-xl'>
            We're still working on this feature. Click{' '}
            <Link to='/' className='hover:text-blue-700 text-blue-500'>
              here
            </Link>{' '}
            to go back.
          </p>
        </div>
      </section>
    </div>
  );
}
