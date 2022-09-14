import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface IProps {
  onNext: () => void;
  onPrev: () => void;
  pageNum: number;
  dataCount: number;
}

export default function PaginationButton({ onNext, onPrev, pageNum, dataCount }: IProps) {
  return (
    <div className='flex flex-col items-center'>
      <div className='inline-flex mt-2 xs:mt-0'>
        {pageNum > 1 && (
          <button
            onClick={onPrev}
            className='inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
          >
            <FaArrowLeft className='mr-2 w-3 h-3' />
            Previous
          </button>
        )}

        {pageNum >= 1 && dataCount === 10 && (
          <button
            onClick={onNext}
            className='inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
          >
            Next
            <FaArrowRight className='ml-2 w-3 h-3' />
          </button>
        )}
      </div>
    </div>
  );
}
