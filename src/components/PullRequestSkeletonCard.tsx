export default function PullRequestSkeletonCard() {
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
